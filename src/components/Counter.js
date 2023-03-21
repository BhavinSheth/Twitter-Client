import { useAppContext } from '../context/appContext'

const Counter = () => {
  const { count } = useAppContext()

  return (
    <>
      <h3>Count : {count}</h3>
    </>
  )
}

export default Counter
