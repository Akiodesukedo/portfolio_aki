type TopMessageProps = {
  line1: string,
  line2: string
}

const TopMessage: React.FC<TopMessageProps> = ({ line1, line2 }) => {
  return (
    <div className="mx-[30px] my-[130px]">
      <p className="text-[30px] w-full font-medium text-center">
        { line1 }
      </p>
      <p className="text-[30px] w-full font-medium text-center">
        { line2 }
      </p>
    </div>
  )
}


export default TopMessage
