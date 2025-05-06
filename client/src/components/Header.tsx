import { useNavigate } from "react-router-dom";

type HeaderProps = {
  WebsiteName: string
  txtColor?: string
  absolute?: boolean
  openMenu: () => void
}

const Header: React.FC<HeaderProps> = ({ WebsiteName, txtColor, absolute = false, openMenu }) => {
  const navigate = useNavigate();

  return (
    <div 
      className={`w-full flex flex-nowrap justify-between p-[20px] z-30 ${absolute ? 'absolute top-0 left-0' : 'relative'}`}
    >
      <h1
        style={{color: txtColor ? txtColor: 'black'}}
        className="text-[20px]"
        onClick={() => navigate('/')}
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
