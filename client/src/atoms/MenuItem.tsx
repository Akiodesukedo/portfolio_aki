import { useNavigate } from "react-router-dom"

type MenuItemProps = {
  itemName: string,
  pagePath: string,
  closeMenu: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ itemName, pagePath, closeMenu }) => {

  const navigate = useNavigate()
    
  const moveToPage = () => {
    navigate(pagePath)
    closeMenu()
  }

  return (
    <button 
      className="border-b-1 border-b-white m-x-30"
      onClick={moveToPage}
    >
      <p className="text-white">{ itemName }</p>
    </button>
  )
}


export default MenuItem
