import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css'
import Tag from '../atoms/Tag'
import BtnExample from '../atoms/BtnExample'
import CtaBtn from '../atoms/CtaBtn'

const Home = () => {
  const [count, setCount] = useState(0)

  const navigate = useNavigate();
  const navigateToTest = () => {
    navigate('/test')
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
      <CtaBtn btnMsg='Move to Test Page' bgColor='white' borderColor='black' txtColor='black' passedFunc={navigateToTest}/>
    </div>
  )
}

export default Home
