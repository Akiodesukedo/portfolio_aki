type LineDividerProps = {
  mTop?: string,
  mBottom?: string,
  color?: string
}

const LineDivider: React.FC<LineDividerProps> = ({ mTop = "40px", mBottom = "40px", color = "border-black" }) => {
  return (
    <hr 
      className={`border-1 ${mTop} ${mBottom} ${color}`}
    />
  )
}

export default LineDivider
