type CtaBtnProps = {
  type?: "submit" | "reset" | "button" | undefined
  btnMsg: string,
  borderColor?: string,
  bgColor?: string,
  txtColor?: string,
  hoverBgColor?: string,
  hovertxtColor?: string,
  passedFunc?: () => void
  marginTop?: string,
  width?: string,
  className?: string
}

const CtaBtn: React.FC<CtaBtnProps> = ({ type = "submit", btnMsg, borderColor = "border-black", bgColor = "bg-white", txtColor = "text-black", passedFunc, marginTop = "mt-[24px]", width = "w-full", hoverBgColor, hovertxtColor, className }) => {
  return (
    <button
      type={type}
      onClick={passedFunc}
      className={`!rounded-full border h-[64px]  cursor-pointer ${marginTop} ${bgColor} ${borderColor} ${txtColor} ${hoverBgColor} ${hovertxtColor} ${className} ${width} duration-200 ease-in`}
    >
      {btnMsg}
    </button>
  )
}


export default CtaBtn
