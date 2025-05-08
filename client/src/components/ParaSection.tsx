type ParaSecProps = {
  title: string,
  paragraph1?: string,
  paragraph2?: string,
  paragraph3?: string,
  imageUrl?: string,

}

const ParaSection: React.FC<ParaSecProps> = ({ title, paragraph1, paragraph2, paragraph3, imageUrl }) => {
  return (
    <div className="mx-[30px] mb-[60px]">
      <h3 className="text-[24px] font-medium text-left mb-[22px]">
        { title }
      </h3>
      { paragraph1 &&
        <p className="text-[14px] text-left mb-[22px] whitespace-pre-line">
          {paragraph1}
        </p>
      }
      { imageUrl &&
        <div className="max-w-[400px] w-full h-[200px] bg-neutral-500 mt-[30px] mb-[30px]"></div>
      }
      { paragraph2 &&
        <p className="text-[14px] text-left mb-[22px]">
          {paragraph2}
        </p>
      }
      { paragraph3 &&
        <p className="text-[14px] text-left mb-[22px]">
          {paragraph3}
        </p>
      }
    </div>
  )
}


export default ParaSection
