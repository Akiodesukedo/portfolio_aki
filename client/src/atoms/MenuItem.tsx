import { usePageTransition } from "../context/PageTransitionContext";

type MenuItemProps = {
  itemName: string,
  pagePath: string,
  closeMenu: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({ itemName, pagePath, closeMenu }) => {

  const { triggerTransition } = usePageTransition();
    
  const moveToPage = () => {
    triggerTransition(pagePath)
    closeMenu()
    
  }

  return (
    <button 
      className="border-b-1 border-b-white m-x-30 h-[100px] cursor-pointer hover:bg-white duration-200 ease-in text-white text-[26px] hover:text-black"
      onClick={moveToPage}
    >
      { itemName }
    </button>
  )
}


export default MenuItem
