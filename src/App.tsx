import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'

import CMS from 'decap-cms-app'
import BlogPostPreview from './cms/previews/BlogPostPreview'
import EventPreview from './cms/previews/EventPreview'

// Initialize the CMS object
CMS.init()

// Register preview templates
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('event', EventPreview)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
