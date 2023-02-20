import './styles.css'

type ContainerProps = {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <main className="calculator-container">
      {children}
    </main>
  )
}

export default Container;