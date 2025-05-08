type ExpertiseProps = {
}

const Expertise: React.FC<ExpertiseProps> = ({}) => {

  const imagePaths: string[] = [
    "/images/React.png",
    "/images/TS.png",
    "/images/JS.png",
    "/images/express.png",
    "/images/nodeJS.png",
    "/images/mongoDB.png",
    "/images/GraphQL.png",
    "/images/REST_API.png",
    "/images/tailwindcss.png",
    "/images/AWS.png",
    "/images/HTML.png",
    "/images/CSS.png",
    "/images/iHealth.png",
    "/images/java.png",
  ]

  return (
    <div className="mx-[30px] mb-[60px]">
      <h3 className="text-[24px] font-medium text-left mb-[22px]">Expertise</h3>
      <div className="grid grid-cols-2 gap-[20px]">
        { imagePaths.map((src, index) => {
          const fileName = src.split('/').pop();
          const altText = fileName?.split('.')[0].replace(/[-_]/g, '');

          return (
            <img 
              key={index}
              src={src}
              alt={altText}
              className="w-full h-auto ovject-cover"
            />
          )
          })}
      </div>
    </div>
  )
}


export default Expertise
