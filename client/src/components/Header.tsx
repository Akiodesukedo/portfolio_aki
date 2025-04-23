import { useNavigate } from "react-router-dom";

type HeaderProps = {
  WebsiteName: string
  txtColor?: string
}

const Header: React.FC<HeaderProps> = ({ WebsiteName, txtColor }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-neutral-300 flex flex-nowrap justify-between p-[20px]">
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
      >
        Menu
      </p>
    </div>
  )
}

export default Header
