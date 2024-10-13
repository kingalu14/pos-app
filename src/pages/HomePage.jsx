import {Button,Flex} from 'antd'
import Header from '../components/header/Header';
import Category from '../components/categories/Categories';    
import Products from '../components/products/Products';    
import CartTotals from '../components/cart/CartTotals';

const HomePage = () => {    
    return (
        <div>
           <Header />
           <div className='home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-64 h-screen'>
                <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
                    <Category />
                </div>
                <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10 min-h-[500px]">
                    <Products />
                </div>
                <div className="cart-wrapper flex flex-row  max-h-100vh overflow-auto  min-w-[300px] md:-mr-[24px] md:-mt-[24px] border">
                    <CartTotals />
                </div>
            </div>
        </div>
    );
}

export default HomePage;