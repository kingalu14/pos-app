import { Table,Card,Flex, Space, Button,Modal} from "antd";
import React, { useState } from 'react';
import Header from "../components/header/Header";
import CreateInvoice from "../components/cart/CreateInvoice";

const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];


const CartPage = () => {  
  const [isModalOpen, setIsModalOpen] = useState(false);
    const data = [];

    const showModal = () => {
      setIsModalOpen(true);
    };
 
    const handleCancel = () => {
      setIsModalOpen(false);
    };


    return (
        <div>           
             <Header />
             <div className="px-6">
                <Table dataSource={dataSource} columns={columns} pagination={false}/>
                <Flex justify="flex-end" className="mt-4">
                    <Card className="w-72">
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Flex justify="space-between">
                          <span>Sub Total</span>
                          <span>549.00£</span>
                        </Flex> 
                        
                         <Flex justify="space-between">
                          <span>VAT Total %8</span>
                          <span className="text-red-600"> + 23.0£</span>
                        </Flex> 
                         <Flex justify="space-between">
                          <span><b>Total</b></span>
                          <span><b>549.00£</b></span>
                        </Flex>  

                         <Button size="large" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded w-full"  onClick={showModal}>Create Invoice</Button> 
                        </Space>
                    </Card> 
                </Flex>
             </div>
             <CreateInvoice isModalOpen={isModalOpen} handleCancel={handleCancel} />
        </div>
    );
}

export default CartPage;