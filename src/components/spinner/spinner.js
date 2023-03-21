import { useAppContext } from '../../context/appContext'
import './spinner.css'

const Spinner = () => {
  const { isLoading } = useAppContext()
  return isLoading && <span class="loader"></span>
}

export default Spinner
