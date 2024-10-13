import {Form,Input,Button,Carousel, Checkbox}  from "antd";
import {Link} from "react-router-dom";  
import AuthCarousel from "../../components/auth/AuthCarousel";

const ForgetPasswordPage = () => {
    return(
        <div className="h-screen">
            <div className="flex justify-between h-full">
               <div className="xl:px-20 px-10  w-full flex flex-col h-full justify-center relative">
                     <h1 className="text-center text-5xl font-bold mb-3">Logo</h1>
                     <Form layout="vertical">
                        <Form.Item
                            label="Email"
                            name={"email"}
                            rules={[{required:true,message:"Please input your email"}]}    
                        >
                            <Input placeholder="Enter your email" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" 
                            className="w-full" size="large">Send Reset Password Link</Button>
                        </Form.Item>    
                     </Form>
               </div>
               <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden min-w-[800px] bg-[#6c63ff]"> 
               <div className="w-full h-full">
                   <Carousel className="h-full px-6" autoplay>
                       <AuthCarousel 
                            img={"images/responsive.svg"}
                            title={"Responsive"}
                            description={"Compatible To All Devices"}
                       />    
                       <AuthCarousel 
                            img={"images/admin.svg"}
                            title={"Admin Panel"}
                            description={"Manage All In One Platform"}
                       />   
                       <AuthCarousel 
                            img={"images/statistic.svg"}
                            title={"Statistic"}
                            description={"Wide Range Of Statistic To Analyze"}  
                       />
                       
                       <AuthCarousel 
                            img={"images/customer.svg"}
                            title={"Responsive"}
                            description={"Satisfied Customer After Test Our Product"}
                       />  
                   </Carousel>
                   </div>
            </div>
            </div>
        </div>  
    )
};

export default ForgetPasswordPage;