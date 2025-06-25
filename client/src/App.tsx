import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Test from './pages/Test'
import About from './pages/About'
import Works from './pages/Works'
import ScrollToTop from './components/ScrollToTop'
import Individual from './pages/Individual'
import FlashScreen from './components/FlashScreen'

const App = () => {
  return (
    <Router>
      <FlashScreen />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/about" element={<About />} />
        <Route path="/works" element={<Works />} />
        <Route path='/work/:id' element={<Individual />} />
      </Routes>
    </Router>
  )
}

export default App
