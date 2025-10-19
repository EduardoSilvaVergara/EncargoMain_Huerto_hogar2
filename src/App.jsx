import './App.css'
import { BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Nav from './Components/Nav'
import Index from './Pages/Index'
import Wishlist from './Pages/Wishlist'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import Footer from './Components/Footer'
import About from './Pages/About'
import Stores from './Pages/Stores'
import Blog from './Pages/Blog'
import Contact from './Pages/Contact'
import ShopFrutas from './Pages/ShopFrutas'
import ShopVerduras from './Pages/ShopVerduras'
import ShopLacteos from './Pages/ShopLacteos'
import ShopOrg from './Pages/ShopOrg'

import ProductDetailsFrutas from './Pages/ProductDetailsFrutas'
import ProductDetailsVerduras from './Pages/ProductDetailsVerduras'
import ProductDetailsLacteos from './Pages/ProductDetailsLacteos'
import ProductDetailsOrg from './Pages/ProductDetailsOrg'

function App() {


  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/productFrutas/:id' element={<ProductDetailsFrutas />}/>
        <Route path='/productVerduras/:id' element={<ProductDetailsVerduras />}/>
        <Route path='/productLacteos/:id' element={<ProductDetailsLacteos />}/>
        <Route path='/productOrg/:id' element={<ProductDetailsOrg />}/>

        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/about' element={<About />} />
        <Route path='/shopFrutas' element={<ShopFrutas />} />
        <Route path='/shopVerduras' element={<ShopVerduras/>} />
        <Route path='/shopLacteos' element={<ShopLacteos/>} />
        <Route path='/shopOrg' element={<ShopOrg />} />

        <Route path='/stores' element={<Stores />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
