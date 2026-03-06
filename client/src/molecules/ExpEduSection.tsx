import * as motion from "motion/react-client"

type expEduSectionProps = {
  name: string
  title: string
  startDate: string
  endDate: string
  line1: string
  line2: string
  line3: string
  imgSrc: string
  lastItem?: boolean
}

const ExpEduSection: React.FC<expEduSectionProps> = ({ name, title, startDate, endDate, line1, line2, line3, imgSrc, lastItem = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
     className={`text-left py-[50px] ${
      !lastItem && "border-b-1 border-gray-600" 
    }`}>
      <div className="flex items-center gap-[20px] md:gap-[40px]">
        <img 
          src={imgSrc} 
          alt={`${name} logo image`} 
          className="md:w-[80px] md:h-[80px] w-[50px] h-[50px]"
        />
        <div className="flex-1">
          <p className="font-bold text-[18px]">
            { name }
          </p>
          <p className="italic text-gray-700">
            { title } | { startDate } - { endDate }
          </p>
        </div>
      </div>
      <p className="text-[14px] mt-[20px]">
        ・{line1}<br/>
        ・{line2}<br/>
        ・{line3}
      </p>
    </motion.div>
  )
}

export default ExpEduSection