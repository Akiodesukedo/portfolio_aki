type CtaBtnProps = {
  btnMsg: string,
  borderColor: string,
  bgColor: string,
  txtColor: string,
  passedFunc?: () => void
}

const CtaBtn: React.FC<CtaBtnProps> = ({btnMsg, borderColor, bgColor, txtColor, passedFunc}) => {
  return (
    <button
      onClick={passedFunc}
      className="!rounded-full border h-[64px] w-full mt-[24px]"
      style={{ 
        backgroundColor: bgColor, 
        borderColor: borderColor, 
        color: txtColor,
      }}
    >
      {btnMsg}
    </button>
  )
}


export default CtaBtn
