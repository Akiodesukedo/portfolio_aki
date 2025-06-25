import { usePageTransition } from "../context/PageTransitionContext";

type HeaderProps = {
  WebsiteName: string
  txtColor?: string
  absolute?: boolean
  openMenu: () => void
}

const Header: React.FC<HeaderProps> = ({ WebsiteName, txtColor, absolute = false, openMenu }) => {
  const { triggerTransition } = usePageTransition();

  return (
    <div 
      className={`w-full flex flex-nowrap justify-between p-[20px] z-30 ${absolute ? 'absolute top-0 left-0' : 'relative'}`}
    >
      <h1
        style={{color: txtColor ? txtColor: 'black'}}
        className="text-[20px]"
        onClick={() => triggerTransition('/')}
      >
        { WebsiteName }
      </h1>
      <p
        style={{color: txtColor ? txtColor: 'black'}}
        className="text-[20px] font-bold"
        onClick={openMenu}
      >
        Menu
      </p>
    </div>
  )
}

export default Header
