import { Table,Card,Flex, Space, Button,Modal} from "antd";
import React, { useState } from 'react';
import Header from "../components/header/Header";
import PrintInvoice from "../components/invoice/PrintInvoice";

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


const InvoicePage = () => {  
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
                <h1 className="text-4xl font-bold text-center">Invoices</h1>
                <Table dataSource={dataSource} columns={columns} pagination={false}/>
                <Flex justify="flex-end" className="mt-4">
                    <Card className="w-72">
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>              
                         <Button size="large" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded w-full"  onClick={showModal}>Print</Button> 
                     </Space>
                    </Card> 
                </Flex>
             </div>
             <PrintInvoice isModalOpen={isModalOpen} handleCancel={handleCancel} />
        </div>
    );
}
  export default InvoicePage;  