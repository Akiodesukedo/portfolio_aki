type CtaBtnProps = {
  btnMsg: string,
  borderColor: string,
  bgColor: string,
  txtColor: string,
  passedFunc?: () => void
  marginTop?: string,
}

const CtaBtn: React.FC<CtaBtnProps> = ({btnMsg, borderColor, bgColor, txtColor, passedFunc, marginTop = "24px"}) => {
  return (
    <button
      onClick={passedFunc}
      className="!rounded-full border h-[64px] w-full"
      style={{ 
        backgroundColor: bgColor, 
        borderColor: borderColor, 
        color: txtColor,
        marginTop: marginTop
      }}
    >
      {btnMsg}
    </button>
  )
}


export default CtaBtn
