import MenuItem from "../atoms/MenuItem"

type MenuProps = {
  isOpen: boolean,
  closeMenu: () => void
}

const Menu: React.FC<MenuProps> = ({ isOpen, closeMenu }) => {
  
  return (
    <div
    className={
      `fixed top-0 right-0 h-full w-full bg-black transform transition-transform duration-300 z-50
      ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`
    }
    >
      <MenuItem itemName="Test" pagePath="/test" closeMenu={closeMenu}/>
    </div>
  )
}


export default Menu
