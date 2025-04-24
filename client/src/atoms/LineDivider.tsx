type LineDividerProps = {
  mTop?: string,
  mBottom?: string,
  color?: string
}

const LineDivider: React.FC<LineDividerProps> = ({ mTop, mBottom, color }) => {
  return (
    <hr 
      className="border-"
      style={{
        marginTop: mTop ? mTop : "40px",
        marginBottom: mBottom ? mBottom : "20px",
        borderColor: color ? color: "black"
      }}
    />
  )
}

export default LineDivider
