import {BrowserRouter, Routes , Route} from "react-router-dom";
import Home from './Pages/Home';
import Gallery from './Pages/Gallery';
import Admin from './Pages/Admin';
import ClientForm from "./Pages/ClientForm";
import GallerySettings from "./Pages/GallerySettings";


const App = () => {
  return (
  <BrowserRouter>
  <Routes>
    {/* Public Home page  */}
    <Route path="/" element={<Home/>}/>
     <Route path="/gallery/:category" element={<Gallery />} />
     <Route path="/clientform" element={<ClientForm/>} />
     <Route path='/Home' element={<Home/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/gallery-settings" element={<GallerySettings/>} />
  </Routes>
  </BrowserRouter>
  )
}

export default App
