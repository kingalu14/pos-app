import { Form, Input, Button, Carousel, Checkbox, message } from "antd";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import AuthService from "../../api/AuthService";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { accessToken, roles } = await AuthService.login(values);
      setAuth({ accessToken, roles });
      setLoading(false);
      message.success("login success");
      navigate(from, { replace: true });
    } catch (error) {
      console.log("error", error);
      if (!error.response) {
        message.error("No Server Response");
      } else if (error.response?.status === 400) {
        message.error("Missing Email or Password");
      } else if (error.response?.status === 401) {
        message.error("Unauthorized");
      } else {
        message.error("Login Failed");
      }
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10  w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-3">Logo</h1>
          <Form
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ remember: false }}
          >
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your email",
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="password"
              name={"password"}
              rules={[
                { required: true, message: "Please input your password" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex justify-between items-center">
                <Checkbox name={"remember"}>Remember me</Checkbox>
                <Link to="/forget-password" className="text-blue-500 font-bold">
                  Forgot Password ?
                </Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Dont you have an account ?
            <Link to="/register" className="text-blue-500 font-bold">
              &nbsp; Register Now
            </Link>
          </div>
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
  );
};

export default LoginPage;
