import { useState } from "react"
import { operations, specialKeys } from "../constants"
import { calculate } from "../lib/calculator"

export type Expression = {
  leftOperand: number,
  rightOperand: number,
  currentOperationValue: string,
  operator: null | string
}

let shouldResetAfterCalculate = false

export function useCalculator() {
  const [expression, setExpression] = useState<Expression>({
    operator: null, 
    leftOperand: 0, 
    rightOperand: 0, 
    currentOperationValue: '0' 
  })

  function executeExpression() {
    const result = calculate(expression)
    if (result || result === 0) {
      setExpression({ leftOperand: result, rightOperand: 0, operator: null, currentOperationValue: result.toString() })
      shouldResetAfterCalculate = true
      return result.toString()
    }
    return expression.currentOperationValue.toString()
  }

  function onClear() {
    setExpression(() => ({ operator: null, leftOperand: 0, rightOperand: 0, currentOperationValue: '0' }))
  }

  function updateOperator(input: string) {
    shouldResetAfterCalculate = false
    const isFirstInputNegativeSignal = input === '-' && !expression.leftOperand
    if (isFirstInputNegativeSignal) {
      setExpression((prevState) => ({ ...prevState, currentOperationValue: '-' }))
    }

    const result = calculate(expression)
    if (result) {
      setExpression({ operator: input, leftOperand: result, rightOperand: 0, currentOperationValue: result.toString() })
    } else {
      setExpression((prevState) => ({
        ...prevState,
        operator: input
      }))
    }
  }

  function updateOperands(input: string) {
    const operand = parseFloat(input)
    const shouldUpdateLeftOperand = !expression.operator || expression.currentOperationValue.includes('-') && expression.operator === '-'

    if (shouldUpdateLeftOperand) {
      if (shouldResetAfterCalculate) {
        shouldResetAfterCalculate = false
        onClear()
      }
      
      setExpression((prevState) => {
        const leftOperand = expression.currentOperationValue.includes('-')
          ? parseFloat(`-${Math.abs(prevState.currentOperationValue === "-" ? 0 : Number(prevState.currentOperationValue))}${operand}`)
          : parseFloat(`${prevState.currentOperationValue}${operand}`)

        return ({
          ...prevState,
          leftOperand,
          currentOperationValue: leftOperand.toString(),
        })
      })

    } else {
      setExpression((prevState) => {
        const rightOperand = !expression.rightOperand
          ? operand
          : parseFloat(`${prevState.currentOperationValue}${operand}`)

        return ({
          ...prevState,
          rightOperand,
          currentOperationValue: rightOperand.toString()
        })
      })
    }
  }

  function updatePointNumber(input: string) {
    if (expression.currentOperationValue.includes('.')) {
      return
    } 

    setExpression({ ...expression, currentOperationValue: `${expression.currentOperationValue}${input}` })
  }

  function handleClickDigit(event: React.MouseEvent<HTMLButtonElement>) {
    const input = event.currentTarget.innerHTML

    const isOperator = operations.includes(input)
    const isOperand = !specialKeys.includes(input) && !isOperator
    const shouldCalculate = input === '='
    const shouldClear = input === 'AC'

    const isFloatPoint = input === '.'

    if (isFloatPoint) {
      updatePointNumber(input)
    }

    if (isOperator) {
      updateOperator(input)
    }

    if (isOperand) {
     updateOperands(input)
    }

    if (shouldClear) {
      onClear()
    }

    if (shouldCalculate) {
      executeExpression()
    }
  }

  // const currentOperationValue = isNaN(parseFloat(expression.currentOperationValue))
  //   ? expression.currentOperationValue
  //   : new Intl.NumberFormat('en-us', { maximumFractionDigits: 9 }).format(parseFloat(expression.currentOperationValue))

  return {
    handleClickDigit,
    currentOperationValue: expression.currentOperationValue
  }
}