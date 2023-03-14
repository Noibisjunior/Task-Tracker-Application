import { useLocation } from 'react-router-dom'
import Button from './Button'


const Header = ({title,onAdd,showAdd}) => {
const Location = useLocation()

  return (
    <header className="header">
      <h1> {title} </h1>
      {Location.pathname === '/' && ( <Button color={showAdd ? 'red' : 'green'} 
      text={showAdd ? 'close' : 'Add'}
       onClick={onAdd}/> )}
    </header>
  )
}

export default Header