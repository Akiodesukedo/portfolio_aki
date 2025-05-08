type TopMessageProps = {
  line1: string,
  line2: string
}

const TopMessage: React.FC<TopMessageProps> = ({ line1, line2 }) => {
  return (
    <div className="mx-[30px] my-[130px]">
      <h2 className="text-[30px] w-full font-medium text-center">
        { line1 }
      </h2>
      <h2 className="text-[30px] w-full font-medium text-center">
        { line2 }
      </h2>
    </div>
  )
}


export default TopMessage
