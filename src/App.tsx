import Digits from './components/Digits'
import Display from './components/Display'
import Container from './components/Container'
import { useCalculator } from './hooks/useCalculator'
import './App.css'

function App() {
  const { currentOperationValue, handleClickDigit } = useCalculator()

  return (
    <Container>
      <Display displayValue={currentOperationValue} />
      <Digits handleClickDigit={handleClickDigit} />
    </Container>
  )
}

export default App