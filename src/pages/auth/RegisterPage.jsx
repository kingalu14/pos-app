import { Form, Input, Button, Carousel, message } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthService from "../../api/AuthService";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await AuthService.register(values);
      message.success(response.message);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      message.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10  w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-3">Logo</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="User Name"
              name={"username"}
              rules={[
                { required: true, message: "Please input your username" },
              ]}
            >
              <Input placeholder="Enter your user name" />
            </Form.Item>
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
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name={"confirmPassword"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password ",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Do you have account ?
            <Link to="/login" className="text-blue-500 font-bold">
              &nbsp; Login Now
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

export default RegisterPage;
