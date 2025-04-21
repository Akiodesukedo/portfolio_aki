type TagProps = {
  tagName: String
}

const Tag: React.FC<TagProps> = ({ tagName }) => {

  return (
    <div className="bg-black w-fit px-4 py-2 rounded-full ">
      <p className="text-white">
        {tagName}
      </p>
    </div>
  )
}

export default Tag
