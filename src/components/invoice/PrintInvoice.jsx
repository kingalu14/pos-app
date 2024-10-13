import { Modal,Form,Input,Button,Select,Flex,Space,Card} from "antd";
import React, { useState } from 'react';

const PrintInvoice = ({isModalOpen,handleCancel}) => { 
  
    return (
        <Modal title="Print Invoice"
         open={isModalOpen} 
         onCancel={handleCancel} 
         footer={false}
         width={800}    
         >
            <section className="py-20 bg-black">  
                <div className="bg-white max-w-5xl mx-auto px-6">
                  <article className="overflow-hidden">            
                      <div className="my-6">
                          <h2 className="text-4xl font-bold text-sl">Logo</h2>
                          <div className="flex horizontal invoice-details mt-3">
                            <Space direction="horizontal" size="large" style={{ display: 'flex', alignItems:'start' }} className="gap-12">
                                <div className="">
                                    <p className="font-bold">Invoice Details</p>    
                                    <p>King Info Tech</p>
                                    <p>Yenişehir Mahallesi</p>    
                                    <p>Menekşe Sokak</p>    
                                    <p>SU 89 sitesi B block</p>        
                                </div>   
                                <div className="">
                                <p className="font-bold">Invoice</p>    
                                    <p>King Info Tech</p>
                                    <p>Yenişehir Mahallesi</p>    
                                    <p>Menekşe Sokak</p>    
                                    <p>SU 89 sitesi B block</p>        
                                </div>  
                                
                                <div className="">
                                    <p className="font-bold">Invoice Number</p>    
                                    <p>123456</p>    
                                    <p>Issue Date</p>    
                                    <p>2022-11-21</p>        
                                    <p></p>        
                                </div>

                                <div className=" sm:block hidden">
                                    <p className="font-bold">Terms</p>    
                                    <p>Invoice No: 123456</p>    
                                    <p>Invoice No: 123456</p>    
                                    <p>Invoice No: 123456</p>        
                                </div>  
                             </Space>   
                          </div>
                          <div className="flex horizontal invoice-details mt-3">
                             <table className="min-w-full overflow-hidden">  
                                <thead className="">
                                   <tr className="border-b border-slate-200">
                                       <th  scope="col" className="py-3.5 text-left text-sm font-nomral text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden ">Image</th>  
                                       <th  scope="col" className="w-fullpy-3.5 text-left text-sm font-nomral text-slate-700 sm:pl-6 md:pl-0 sm:table-cell col-span-4">Title</th>  
                                       <th  scope="col" className="py-3.5 text-left text-sm font-nomral text-slate-700 sm:pl-6 md:pl-0 sm:table-cell col-span-4">Price</th>  
                                       <th  scope="col" className="w-100 py-3.5 text-left text-sm font-nomral text-slate-700 sm:pl-6 md:pl-0 sm:table-cell col-span-4">Unit</th>  
                                       <th  scope="col" className="py-3.5 text-left text-sm font-nomral text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden">Total</th>  
                                   </tr>  
                                </thead>   
                                <tbody>    
                                    <tr className="border-b border-slate-200"> 
                                       <td className="py-4 sm:table-cell hidden">
                                          <img src="https://via.placeholder.com/150" alt="product" className="w-20 h-20 object-cover"/>       
                                      </td>                                       
                                      <td className="py-4 pr-3">
                                          <span className="font-medium">Salgam</span>       
                                      </td>
                                      <td className="py-4 pr-3">
                                            <span>5 TL</span>            
                                      </td>
                                      <td className="py-4  ">
                                           <span>1</span>            
                                      </td>
                                      <td className="py-4 sm:table-cell hidden">
                                           <span>5 TL</span>            
                                      </td>                                      
                                    </tr>   
                                    
                                     <tr className="border-b border-slate-200"> 
                                       <td className="py-4 sm:table-cell hidden">
                                          <img src="https://via.placeholder.com/150" alt="product" className="w-20 h-20 object-cover"/>       
                                      </td>                                       
                                      <td className="py-4 pr-3">
                                          <span className="font-medium">Salgam</span>       
                                      </td>
                                      <td className="py-4  pr-3">
                                            <span>5 TL</span>            
                                      </td>
                                      <td className="py-4">
                                           <span>1</span>            
                                      </td>
                                      <td className="py-4 sm:table-cell hidden">
                                           <span>5 TL</span>            
                                      </td>                                      
                                    </tr>    
                                     <tr className="border-b border-slate-200"> 
                                       <td className="py-4 sm:table-cell hidden ">
                                          <img src="https://via.placeholder.com/150" alt="product" className="w-20 h-20 object-cover"/>       
                                      </td>                                       
                                      <td className="py-4 pr-3">
                                          <span className="font-medium">Salgam</span>       
                                      </td>
                                      <td className="py-4  pr-3">
                                            <span>5 TL</span>            
                                      </td>
                                      <td className="py-4  ">
                                           <span>1</span>            
                                      </td>
                                      <td className="py-4 sm:table-cell hidden">
                                           <span>5 TL</span>            
                                      </td>                                      
                                    </tr>                                                                
                                </tbody>     
                                <tfoot className="">
                                    <tr>
                                        <th className="sm:text-left text-left md:text-right  pt-4" colSpan="4" scope="row">
                                           <span className="font-normal text-slate-700">Sub Total</span> 
                                        </th>                                        
                                        <th className="text-right pt-4" colSpan="4" scope="row">
                                           <span className="font-normal text-slate-700">500 TL</span> 
                                        </th>        
                                    </tr>
                                    <tr>
                                        <th className="sm:text-left text-left md:text-right pt-4" colSpan="4" scope="row">
                                           <span className="font-normal text-slate-700">VAT</span> 
                                        </th>                                        
                                        <th className="text-right pt-4" colSpan="4" scope="row">
                                           <span className="font-normal text-red-600">+ 4.40 TL</span> 
                                        </th>        
                                    </tr> 
                                    <tr>
                                        <th className="sm:text-left text-left  md:text-right pt-4" colSpan="4" scope="row">
                                           <span className="font-normal text-slate-700 text-right">Total</span> 
                                        </th>                                        
                                        <th className="text-right pt-4" colSpan="4" scope="row">
                                           <span className="font-normal text-slate-700">500 TL</span> 
                                        </th>        
                                    </tr>
                                </tfoot>                              
                             </table>  
                          </div>   
                      </div>   
                      <div className="flex mt-4">
                                <div className="border-t pt-9 mb-6 border-slate-200">
                                         <p>Her türlü kredi kartınıza online tek ödeme ya da Akbankdan  online taksit imkânlarımızdan yararlanabilirsiniz. Online ödemelerinizde siparişiniz sonunda kredi kartınızdan tutar çekim işlemi gerçekleşecektir. 
                                    Muhtemel sipariş iptali veya stok sorunları nedeniyle sipariş iptallerinde kredi kartınıza para iadesi 3 iş günü içerisinde yapılacaktır.</p>
                                
                                </div> 
                             </div>                                     
                  </article>    
                </div>
            </section>  
            <div className="flex justify-end mt-6"> 
                  <Button type="primary" size="large">Print</Button>
            </div>  
        </Modal>
    )
  }


export default PrintInvoice;   