import './App.css'
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import About from './Pages/About'
import Blog from './Pages/Blog'
import Contact from './Pages/Contact'
import ProductDetails from './Pages/ProductDetails'
import ProductDetailsFrutas from './Pages/ProductDetailsFrutas'
import ProductDetailsOrg from './Pages/ProductDetailsOrg'
import ProductDetailsVerduras from './Pages/ProductDetailsVerduras'
import ProductDetailsLacteos from './Pages/ProductDetailsLacteos'
import Shop from './Pages/Shop'
import ShopFrutas from './Pages/ShopFrutas'
import ShopLacteos from './Pages/ShopLacteos'
import ShopVerduras from './Pages/ShopVerduras'
import ShopOrg from './Pages/ShopOrg'

function App() {


  return (
    <>
      <Nav />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='/product/:id' element={<ProductDetails />}/>    
        <Route path='/productFrutas/:id' element={<ProductDetailsFrutas />}/>
        <Route path='/productOrganicos/:id' element={<ProductDetailsOrg />}/>
        <Route path='/productVerduras/:id' element={<ProductDetailsVerduras />}/>
        <Route path='/productLacteos/:id' element={<ProductDetailsLacteos />}/>        

        <Route path='/shop' element={<Shop />} />
        <Route path='/shopFrutas' element={<ShopFrutas />} />
        <Route path='/shopOrg' element={<ShopOrg />} />
        <Route path='/shopVerduras' element={<ShopVerduras />} />
        <Route path='/shopLacteos' element={<ShopLacteos />} />
        
      </Routes>
      <Footer />
    </>
  )
}

export default App
