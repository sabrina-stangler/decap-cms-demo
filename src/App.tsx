import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'

import CMS from 'decap-cms-app'
// Initialize the CMS object
CMS.init()
// Now the registry is available via the CMS object.
// CMS.registerPreviewTemplate('my-template', MyTemplate)

function App() {
  return (
    <BrowserRouter basename='/decap-cms-demo'>
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
