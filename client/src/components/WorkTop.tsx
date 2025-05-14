type WorkTopProps = {
  title: string,
  paragraph1?: string,
  paragraph2?: string,
  paragraph3?: string,
  imageUrl?: string,

}

const WorkTop: React.FC<WorkTopProps> = ({ title, paragraph1, paragraph2, paragraph3, imageUrl }) => {
  return (
    <div className="mx-[30px] mb-[60px]">
      <h3 className="text-[40px] font-medium text-left mb-[22px]">
        { title }
      </h3>
      { paragraph1 &&
        <p className="text-[14px] text-left mb-[22px] whitespace-pre-line">
          {paragraph1}
        </p>
      }
      { imageUrl &&
        <img 
          src={imageUrl}
          alt={`${title} image`}
          className="w-full h-auto ovject-cover"
        />
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


export default WorkTop
