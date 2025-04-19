import { useState } from 'react'

const Tag = () => {
  const [tagName, setTagName] = useState('tag example')

  return (
    <div>
      <button>{tagName}</button>
    </div>
  )
}

export default Tag
