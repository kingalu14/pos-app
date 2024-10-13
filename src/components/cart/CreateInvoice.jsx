import { Modal,Form,Input,Button,Select,Flex,Space,Card} from "antd";
import React, { useState } from 'react';

const CreateInvoice = ({isModalOpen,handleCancel}) => { 

    const onFinish = (values) => { 
        alert("Receipt Created Successfully");
        console.log(values);    
     };
     
    return (
        <Modal title="Create Receipt" open={isModalOpen} onCancel={handleCancel} footer={false}>
                <Form  
                    layout="vertical"    
                    onSubmit={onFinish}         
                    >           
                    <Form.Item label="CustomerName"
                       name={"customerName"} 
                       rules={[{ required: true, message: 'Please input your customer name!' }]}>                  
                        <Input placeholder="input customer name" />
                    </Form.Item>      
                    
                    <Form.Item label="PhoneNumber"
                        name={"phoneNumber"}
                        maxLength={11}  
                      >                  
                        <Input placeholder="input phone number" />
                    </Form.Item>

                    <Form.Item label="PaymentMethod" name={"paymentMethod"}
                       rules={[{ required: true, message: 'Please select your PaymentMethod!' }]}>     
                       <Select placeholder="Please Select Payment Methods">
                        <Select.Option value="cash">Cash</Select.Option>   
                        <Select.Option value="creditCard">CreditCard</Select.Option>       
                      </Select>                                  
                    </Form.Item>
                    <Card className="w-100">
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

                                <button type="submit" size="large" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-4 rounded w-full" >Create Invoice</button> 
                            </Space>
                    </Card>  
                </Form>
        </Modal>
    )
  }


export default CreateInvoice;   