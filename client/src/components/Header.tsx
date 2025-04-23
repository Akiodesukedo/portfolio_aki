type HeaderProps = {
  WebsiteName: string
  txtColor?: string
}

const Header: React.FC<HeaderProps> = ({ WebsiteName, txtColor }) => {
  return (
    <div className="w-full bg-neutral-700 flex flex-nowrap justify-between">
      <h1
        style={{color: txtColor ? txtColor: 'black'}}
      >
        { WebsiteName }
      </h1>
      <p
        style={{color: txtColor ? txtColor: 'black'}}
      >
        Menu
      </p>
    </div>
  )
}

export default Header
