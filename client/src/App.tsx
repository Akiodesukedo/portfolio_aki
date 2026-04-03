import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Test from './pages/Test'
import About from './pages/About'
import Works from './pages/Works'
import ScrollToTop from './components/ScrollToTop'
import Individual from './pages/Individual'
import FlashScreen from './components/FlashScreen'
import NotFound from './pages/NotFound'
import Room from './pages/Room'
import Basic from './pages/Basic'
import Blogs from './pages/Blogs'
import IndivBlog from './pages/IndivBlog'
import PostPage from './pages/PostPage'
import Login from './pages/Login'

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
        <Route path='/blogs' element={<Blogs />} />
        <Route path='blog/:slug' element={<IndivBlog />} />
        <Route path='/r3f-room' element={<Room />} />
        <Route path='/r3f-basic' element={<Basic />} />
        <Route path='admin-login-page' element={<Login />} />
        <Route path='/post-new-content' element={<PostPage />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App
