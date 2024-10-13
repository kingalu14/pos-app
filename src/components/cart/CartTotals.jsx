import { Button, Flex, Space } from 'antd';
import {PlusCircleOutlined,MinusCircleFilled,ClearOutlined} from '@ant-design/icons'; 
import React from 'react'

 const CartTotals = () => {
  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide">
        Sepetteki Ürünler
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-4 overflow-y-auto">
         <li className="cart-item flex justify-between">
            <div className='flex items-center'>
                <img src="https://th.bing.com/th/id/OIP.W7tAeRdkdNVyULjxRQVsQwHaHa?w=242&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" 
                 className='w-16 h-16 object-cover'
                />
                <div className='flex flex-col ml-2'>
                    <b>Ürün Adı</b>
                    <span>12$ x 2</span>    
                </div> 
            </div>
            <div className='flex items-center gap-x-1'>
                <Button
                    type="primary"
                    size="small"
                    className="w-full  flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}                   
                 >
              
                </Button> 
                <span>2</span>
                <Button
                    type="primary"
                    size="small"
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}                   
                 >
              
                </Button>
            </div>
        </li> <li className="cart-item flex justify-between">
            <div className='flex items-center'>
                <img src="https://th.bing.com/th/id/OIP.W7tAeRdkdNVyULjxRQVsQwHaHa?w=242&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" 
                 className='w-16 h-16 object-cover'
                />
                <div className='flex flex-col ml-2'>
                    <b>Ürün Adı</b>
                    <span>12$ x 2</span>    
                </div> 
            </div>
            <div className='flex items-center gap-x-1'>
                <Button
                    type="primary"
                    size="small"
                    className="w-full  flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}                   
                 >
              
                </Button> 
                <span>2</span>
                <Button
                    type="primary"
                    size="small"
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}                   
                 >
              
                </Button>
            </div>
        </li> <li className="cart-item flex justify-between">
            <div className='flex items-center'>
                <img src="https://th.bing.com/th/id/OIP.W7tAeRdkdNVyULjxRQVsQwHaHa?w=242&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" 
                 className='w-16 h-16 object-cover'
                />
                <div className='flex flex-col ml-2'>
                    <b>Ürün Adı</b>
                    <span>12$ x 2</span>    
                </div> 
            </div>
            <div className='flex items-center gap-x-1'>
                <Button
                    type="primary"
                    size="small"
                    className="w-full  flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}                   
                 >
              
                </Button> 
                <span>2</span>
                <Button
                    type="primary"
                    size="small"
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}                   
                 >
              
                </Button>
            </div>
        </li> <li className="cart-item flex justify-between">
            <div className='flex items-center'>
                <img src="https://th.bing.com/th/id/OIP.W7tAeRdkdNVyULjxRQVsQwHaHa?w=242&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" 
                 className='w-16 h-16 object-cover'
                />
                <div className='flex flex-col ml-2'>
                    <b>Ürün Adı</b>
                    <span>12$ x 2</span>    
                </div> 
            </div>
            <div className='flex items-center gap-x-1'>
                <Button
                    type="primary"
                    size="small"
                    className="w-full  flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}                   
                 >
              
                </Button> 
                <span>2</span>
                <Button
                    type="primary"
                    size="small"
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}                   
                 >
              
                </Button>
            </div>
        </li> <li className="cart-item flex justify-between">
            <div className='flex items-center'>
                <img src="https://th.bing.com/th/id/OIP.W7tAeRdkdNVyULjxRQVsQwHaHa?w=242&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" 
                 className='w-16 h-16 object-cover'
                />
                <div className='flex flex-col ml-2'>
                    <b>Ürün Adı</b>
                    <span>12$ x 2</span>    
                </div> 
            </div>
            <div className='flex items-center gap-x-1'>
                <Button
                    type="primary"
                    size="small"
                    className="w-full  flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}                   
                 >
              
                </Button> 
                <span>2</span>
                <Button
                    type="primary"
                    size="small"
                    className="w-full flex items-center justify-center !rounded-full"
                    icon={<PlusCircleOutlined />}                   
                 >
              
                </Button>
            </div>
        </li>
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>99₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %8</b>
            <span className="text-red-700">+7.92₺</span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Genel Toplam</b>
            <span className="text-xl">99₺</span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button type="primary" size="large" className="w-full">
            Sipariş Oluştur
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-full mt-2 flex items-center justify-center"
            icon={<ClearOutlined />}
            danger
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartTotals;