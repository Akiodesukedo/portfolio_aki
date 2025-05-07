import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Test from './pages/Test'
import About from './pages/About'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
