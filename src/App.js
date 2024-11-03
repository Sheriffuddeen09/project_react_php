import { Route, Routes } from "react-router-dom";
import CatGallery from "./CatImage";
//import { orderlists } from './order/component/PostOrder'
import Header from "./Header";
import { useEffect, useState } from "react";
import logo from './image/cat.jpg'
import OrderElement from "./order/OrderElement";
import OrderPage from "./order/component/OrderPage";
import Cart from "./order/Page/Cart";
import axios from "axios";

function App() {


    const [orders, setOrders] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);

        const fetchCats = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
                setOrders(response.data);
            } catch (err) {
              setError('Error fetching cat images');
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {

        fetchCats();

    }, []);

    if (loading) {
        return <div className="flex flex-col items-center justify-center my-56">
                  <img src={logo} width={70} height={70} alt="logo" className='rounded-full' />
                  <div className="bg-gray-300 w-40 h-1 rounded-3xl mt-5">
                  <p className="loading"></p>
                  </div>
                </div>
    }

    if (error) return <div className='flex flex-col items-center justify-center my-56'>
            <p className='text-white text-2xl mb-4'>{error}</p>
            <button onClick={fetchCats} className='bg-green-400 text-white rounded-xl p-2 '>Refresh</button>
            </div>;





  return (
    <div className="">
      <Header />
      <Routes>
      <Route path="/" element={ <CatGallery />} />
      <Route path="/favorite" element={ <OrderElement orders={orders} setOrders={setOrders}/>} />
      <Route path="/order/:id" element={ <OrderPage />} />
      <Route path="/cart" element={ <Cart />} />
     </Routes>
    </div>
  );
}

export default App;
