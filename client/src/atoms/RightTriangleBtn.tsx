import { useState } from "react";

type RightTriangleBtnProps = {
  line1: string,
  line2: string,
  bgColor?: string,
  txtColor?: string,
  hoverBgColor?: string,
  hoverTxtColor?: string,
  passedFunc?: () => void
}

const RightTriangleBtn: React.FC<RightTriangleBtnProps> = ({line1, line2, bgColor = "black", txtColor = "white", hoverBgColor = "white", hoverTxtColor = "black", passedFunc}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <svg
      width="198"
      height="198"
      viewBox="-2 -2 202 202"
      xmlns="http://www.w3.org/2000/svg"
      onClick={passedFunc}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: "pointer", }}
    >
      {/* Triangle path with rounded corners */}
      <path
        d="M146.787 9.21321C165.686 -9.68574 198 3.69924 198 30.4264L198 168C198 184.569 184.569 198 168 198H30.4264C3.69925 198 -9.68575 165.686 9.21319 146.787L146.787 9.21321Z"
        fill={isHovered ? hoverBgColor : bgColor}
        stroke="black"
        strokeWidth={2}
        style={{
          transition: "fill 200ms ease-in",
        }}
      />

      {/* Centered Text */}
      <text
        x="160"
        y="55%"
        dominantBaseline="middle"
        textAnchor="end"
        fontSize="20"
        fill={isHovered ? hoverTxtColor : txtColor}
        style={{
          transition: "fill 200ms ease-in",
        }}
      >
        {line1}
      </text>
      <text
        x="160"
        y="69%"
        dominantBaseline="middle"
        textAnchor="end"
        fontSize="20"
        fill={isHovered ? hoverTxtColor : txtColor}
        style={{
          transition: "fill 200ms ease-in",
        }}
      >
        {line2}
      </text>
    </svg>
  )
}


export default RightTriangleBtn
