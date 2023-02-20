import './styles.css'

type DigitsProps = {
  handleClickDigit: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Digits: React.FC<DigitsProps> = ({ handleClickDigit }) => {
  return (
    <div className="digits-container">
      <button onClick={handleClickDigit} className="add digit digit--operator">+</button>
      <button onClick={handleClickDigit} className="divide digit digit--operator">&divide;</button>
      <button onClick={handleClickDigit} className="multiply digit digit--operator">&times;</button>
      <button onClick={handleClickDigit} className="subtract digit digit--operator">-</button>
      <button onClick={handleClickDigit} className="seven digit">7</button>
      <button onClick={handleClickDigit} className="eight digit">8</button>
      <button onClick={handleClickDigit} className="nine digit">9</button>
      <button onClick={handleClickDigit} className="four digit">4</button>
      <button onClick={handleClickDigit} className="five digit">5</button>
      <button onClick={handleClickDigit} className="six digit">6</button>
      <button onClick={handleClickDigit} className="one digit">1</button>
      <button onClick={handleClickDigit} className="two digit">2</button>
      <button onClick={handleClickDigit} className="three digit">3</button>
      <button onClick={handleClickDigit} className="zero digit">0</button>
      <button onClick={handleClickDigit} className="clear digit">AC</button>
      <button onClick={handleClickDigit} className="equal digit digit--result">=</button>
    </div>
  )
}

export default Digits;