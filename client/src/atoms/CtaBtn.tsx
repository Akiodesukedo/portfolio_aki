type CtaBtnProps = {
  btnMsg: string,
  borderColor: string,
  bgColor: string,
  txtColor: string,
  hoverBgColor?: string,
  hovertxtColor?: string,
  passedFunc?: () => void
  marginTop?: string,
}

const CtaBtn: React.FC<CtaBtnProps> = ({btnMsg, borderColor, bgColor, txtColor, passedFunc, marginTop = "mt-[24px]", hoverBgColor, hovertxtColor }) => {
  return (
    <button
      onClick={passedFunc}
      className={`!rounded-full border h-[64px] w-full cursor-pointer ${marginTop} ${bgColor} ${borderColor} ${txtColor} ${hoverBgColor} ${hovertxtColor} duration-200 ease-in`}
    >
      {btnMsg}
    </button>
  )
}


export default CtaBtn
