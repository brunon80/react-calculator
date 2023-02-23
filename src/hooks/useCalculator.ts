import { useState } from "react"
import { operations, specialKeys } from "../constants"
import { calculate } from "../lib/calculator"

export type Expression = {
  leftOperand: null | number,
  rightOperand: null | number,
  currentOperationValue: string,
  operator: null | string
}

let shouldResetAfterCalculate = false

export function useCalculator() {
  const [expression, setExpression] = useState<Expression>({
    operator: null,
    leftOperand: null,
    rightOperand: null,
    currentOperationValue: '0'
  })

  function executeExpression() {
    const result = calculate(expression)
    if (result || result === 0) {
      setExpression({ leftOperand: result, rightOperand: null, operator: null, currentOperationValue: result.toString() })
      shouldResetAfterCalculate = true
      return result.toString()
    }
    return expression.currentOperationValue.toString()
  }

  function onClear() {
    setExpression({ operator: null, leftOperand: null, rightOperand: null, currentOperationValue: '0' })
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

  function isFloat(n: number) {
    return Number(n) === n && n % 1 !== 0;
  }

  function parseOperand(prevOperand: number | null, newOperand: string, isFloatNumber: boolean) {
    let value = newOperand
    const isNegative = value.includes('-') || Object.is(prevOperand, -0)

    value = prevOperand === 0 || prevOperand === null ? `${newOperand}` : `${prevOperand}${newOperand}`

    if (isFloatNumber) {
      if (prevOperand && isFloat(prevOperand)) {
        value = `${prevOperand}${newOperand}`
      }
      else {
        const floatValue = `${prevOperand === null ? 0 : prevOperand}.${newOperand}`
        value = isNegative ? `-${floatValue}` : floatValue
      }
    }

    return value
  }

  function manageLeftOperand(operand: string, shouldResetAfterCalculate: boolean) {
    const isFloatNumber = (expression.currentOperationValue.match(/\./g) || []).length === 1 && !shouldResetAfterCalculate

    if (expression.currentOperationValue === '-') operand = `-${operand}`

    const leftOperand = parseOperand(shouldResetAfterCalculate ? null : expression.leftOperand, operand, isFloatNumber)

    setExpression({
      ...expression,
      leftOperand: parseFloat(leftOperand as string),
      currentOperationValue: leftOperand,
    })

    if (shouldResetAfterCalculate) {
      shouldResetAfterCalculate = false
    }
  }

  function manageRightOperand(operand: string) {
    let shouldParseAsFloat = false

      if (expression.rightOperand === null) {
        shouldParseAsFloat = false
      } else {
        const isFloatNumber = (expression.currentOperationValue.match(/\./g) || []).length === 1
        if (isFloatNumber && expression.rightOperand !== null) {
          shouldParseAsFloat = true
        }
      }

      const rightOperand = parseOperand(expression.rightOperand, operand, shouldParseAsFloat)
      setExpression({
        ...expression,
        rightOperand: parseFloat(rightOperand as string),
        currentOperationValue: rightOperand.toString()
      })
  }

  async function updateOperands(input: string) {
    const operand = input
    const shouldUpdateLeftOperand = !expression.operator
      || expression.currentOperationValue.includes('-')
      && expression.operator === '-'

    if (shouldUpdateLeftOperand) {
      manageLeftOperand(operand, shouldResetAfterCalculate)
    } else {
      manageRightOperand(operand)
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