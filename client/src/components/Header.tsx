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
      className={`w-full flex flex-nowrap justify-between p-[20px] md:p-[40px] z-30 ${absolute ? 'absolute top-0 left-0' : 'relative'}`}
    >
      <h1
        style={{color: txtColor ? txtColor: 'black'}}
        className="text-[20px] md:text-[26px] md:font-bold cursor-pointer hover:font-bold  duration-200 ease-in"
        onClick={() => triggerTransition('/')}
      >
        { WebsiteName }
      </h1>
      <p
        style={{color: txtColor ? txtColor: 'black'}}
        className="text-[20px] md:hidden cursor-pointer hover:font-bold"
        onClick={openMenu}
      >
        Menu
      </p>
      <div
        style={{color: txtColor ? txtColor: 'black'}}
        className="text-[20px] hidden md:flex md:gap-[12px] items-center"
      >
        <p className="cursor-pointer p-[8px] hover:font-bold duration-200 ease-in"
          onClick={() => triggerTransition('/')}
        >
          Home
        </p>
        <p className="cursor-pointer p-[8px] hover:font-bold duration-200 ease-in"
          onClick={() => triggerTransition('about')}
        >
          About
        </p>
        <p className="cursor-pointer p-[8px] hover:font-bold duration-200 ease-in"
          onClick={() => triggerTransition('works')}
        >
          Works
        </p>
      </div>
    </div>
  )
}

export default Header
