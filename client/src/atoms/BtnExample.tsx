import { useState } from 'react'

const BtnExample = () => {
  const [tagName, setTagName] = useState('Click me!')

  const switchTagName = () => {
    if (tagName == "Click me!") {
      setTagName("Wanna click again?")
    } else if (tagName == "Wanna click again?") {
      setTagName("Hmm, again?")
    } else if (tagName == "Hmm, again?") {
      setTagName("Back to default, yea?")
    } else if (tagName == "Back to default, yea?") {
      setTagName("Click me!")
    } 
  }

  return (
    <div>
      <button onClick={() => switchTagName()}>{tagName}</button>
    </div>
  )
}

export default BtnExample
