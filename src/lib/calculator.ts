import { operations } from "../constants"
import { Expression } from "../hooks/useCalculator"

export function calculate(expression: Expression) {
  if (expression.leftOperand && expression.rightOperand) {
    switch (expression.operator) {
      case operations[0]:
        return expression.leftOperand + expression.rightOperand
      case operations[1]:
        return expression.leftOperand - expression.rightOperand
      case operations[2]:
        return expression.leftOperand * expression.rightOperand
      case operations[3]:
        return expression.leftOperand / expression.rightOperand
      default:
        return null
    }
  }
}