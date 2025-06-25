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
      className="border-b-1 border-b-white m-x-30 h-[100px]"
      onClick={moveToPage}
    >
      <p className="text-white text-[26px]">{ itemName }</p>
    </button>
  )
}


export default MenuItem
