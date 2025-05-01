type TagProps = {
  tagName: string
}

const Tag: React.FC<TagProps> = ({ tagName }) => {

  return (
    <div className="bg-black w-fit px-[20px] py-[6px] rounded-full ">
      <p className="text-white text-[11px]">
        {tagName}
      </p>
    </div>
  )
}

export default Tag
