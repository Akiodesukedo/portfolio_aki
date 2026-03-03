type expEduSectionProps = {
  name: string
  title: string
  startDate: string
  endDate: string
  line1: string
  line2: string
  line3: string
}

const ExpEduSection: React.FC<expEduSectionProps> = ({ name, title, startDate, endDate, line1, line2, line3 }) => {
  return (
    <div className="text-left">
      <p className="font-bold text-[18px]">
        { name }
      </p>
      <p className="italic text-gray-700">
        { title } | { startDate } - { endDate }
      </p>
      <p className="text-[14px] mt-[8px]">
        ・{line1}<br/>
        ・{line2}<br/>
        ・{line3}
      </p>
    </div>
  )
}

export default ExpEduSection