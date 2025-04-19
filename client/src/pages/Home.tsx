import { useState } from 'react'
import '../App.css'
import Tag from '../atoms/Tag'

const Home = () => {
  const [count, setCount] = useState(0)

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
      <Tag></Tag>
    </div>
  )
}

export default Home
