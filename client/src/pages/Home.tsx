import { useState } from 'react'
import '../App.css'
import Tag from '../atoms/Tag'
import BtnExample from '../atoms/BtnExample'
import CtaBtn from '../atoms/ctaBtn'

const Home = () => {
  const [count, setCount] = useState(0)

  const testFunc = () => {
    console.log("test button clicked");
  }

  return (
    <div>
      <h1>Aki's portfolio</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)} className="mr-10">
          count is {count}
        </button>
        <button onClick={() => setCount(0)}>Reset count</button>
        <p className="font-bold">Let's get the ball rolling yea !?!?</p>
      </div>
      <BtnExample />
      <Tag tagName="tag example here"/>
      <CtaBtn btnMsg='Test' bgColor='white' borderColor='black' txtColor='black' passedFunc={testFunc}/>
    </div>
  )
}

export default Home
