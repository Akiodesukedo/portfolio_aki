type ParaSecProps = {
  title: string,
  paragraph1?: string,
  paragraph2?: string,
  paragraph3?: string,
  paragraph4?: string,
  imageUrl?: string,
  colDiv?: boolean
}

const ParaSection: React.FC<ParaSecProps> = ({ title, paragraph1, paragraph2, paragraph3, paragraph4, imageUrl, colDiv }) => {
  return (
    <div className={`mx-[24px] md:mx-[60px] mb-[60px] max-w-[1160px] xl:mx-auto ${colDiv ? "md:grid md:grid-cols-2 gap-[24px]" : ""} `}>
      <h3 className={`text-[24px] font-medium text-left mb-[22px] ${colDiv ? "md:col-span-2 md:col-start-1 md:row-start-1" : ""}`}>
        { title }
      </h3>
      { paragraph1 &&
        <p className={`text-[14px] text-left mb-[22px] whitespace-pre-line ${colDiv ? "md:col-span-1 md:col-start-2 md:row-start-2" : ""}`}>
          {paragraph1}
        </p>
      }
      { imageUrl &&
        <img 
          src={imageUrl}
          alt={`${title} image`}
          className={`w-full h-auto ovject-cover mb-[22px] ${colDiv ? "md:col-span-1 md:col-start-1 md:row-start-2" : ""} `}
        />
      }
      { paragraph2 &&
        <p className={`text-[14px] text-left mb-[22px] ${colDiv ? paragraph1 ? "md:col-span-2" : "md:col-span-1 md:col-start-2 md:row-start-2" : ""}`}>
          {paragraph2}
        </p>
      }
      { paragraph3 &&
        <p className={`text-[14px] text-left mb-[22px] ${colDiv ? paragraph1 || paragraph2 ? "md:col-span-2" : "md:col-span-1 md:col-start-2 md:row-start-2" : ""}`}>
          {paragraph3}
        </p>
      }
      { paragraph4 &&
        <p className={`text-[14px] text-left mb-[22px] ${colDiv ? paragraph1 || paragraph2 || paragraph3 ? "md:col-span-2" : "md:col-span-1 md:col-start-2 md:row-start-2" : ""}`}>
          {paragraph4}
        </p>
      }
    </div>
  )
}


export default ParaSection
