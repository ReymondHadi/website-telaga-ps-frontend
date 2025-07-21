import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import TransactionHistory from './Components/TransactionHistory/TransactionHistory';
import About from './Components/About/About';

function App() {

  useEffect(() => {
    fetch('/api/data') // Gunakan proxy di development
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/birds' element={<ShopCategory category="bird"/>}/>
        <Route path='/cats' element={<ShopCategory category="cat"/>}/>
        <Route path="product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/transaction-history' element={<TransactionHistory/>} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
