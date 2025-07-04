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
        className="text-[20px] md:text-[26px] md:font-bold"
        onClick={() => triggerTransition('/')}
      >
        { WebsiteName }
      </h1>
      <p
        style={{color: txtColor ? txtColor: 'black'}}
        className="text-[20px] font-bold md:hidden"
        onClick={openMenu}
      >
        Menu
      </p>
      <div
        style={{color: txtColor ? txtColor: 'black'}}
        className="text-[20px] hidden md:flex md:gap-[20px] items-center"
      >
        <p
          onClick={() => triggerTransition('/')}
        >
          Home
        </p>
        <p
          onClick={() => triggerTransition('about')}
        >
          About
        </p>
        <p
          onClick={() => triggerTransition('works')}
        >
          Works
        </p>
      </div>
    </div>
  )
}

export default Header
