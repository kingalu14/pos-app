import { Badge, Flex, Input } from "antd";
import {
  LogoutOutlined,
  BarChartOutlined,
  UserOutlined,
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Flex horizontal gap="middle" className="border-b mb-6 p-4">
      <div className="logo">
        <Link to="/">
          <h2 className="text-2xl font-bold md:text-4xl">Logo</h2>
        </Link>
      </div>
      <div className="header-search flex-1">
        <Input
          size="large"
          type="text"
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="rounded-full"
        />
      </div>
      <Flex
        horizontal
        gap={30}
        className="items-center md:static fixed z-50 bottom-0 justify-between md:w-auto w-screen"
      >
        <Link
          to="/"
          className="menu-link items-center hover:text-[#40a9ff] transition-all flex flex-col"
        >
          <HomeOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Home</span>
        </Link>
        <Badge count={5}>
          <Link
            to="/cart"
            className="menu-link items-center hover:text-[#40a9ff] transition-all flex flex-col"
          >
            <ShoppingCartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Cart</span>
          </Link>
        </Badge>

        <Link
          to="/invoice"
          className="menu-link items-center hover:text-[#40a9ff] transition-all  flex flex-col"
        >
          <CopyOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Receipt</span>
        </Link>

        <Link
          to="/customer"
          className="menu-link items-center hover:text-[#40a9ff] transition-all flex flex-col"
        >
          <UserOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Customer</span>
        </Link>

        <Link
          to="/statistic"
          className="menu-link items-center hover:text-[#40a9ff] transition-all flex flex-col"
        >
          <BarChartOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Statistic</span>
        </Link>

        <Link
          to="/login"
          className="menu-link items-center hover:text-[#40a9ff] transition-all flex flex-col"
        >
          <LogoutOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Logout</span>
        </Link>
      </Flex>
      <Badge count={5} offset={[0, 6]} className="md:hidden flex px-2">
        <Link
          to="/"
          className="menu-link items-center hover:text-[#40a9ff] transition-all flex flex-col"
        >
          <ShoppingCartOutlined className="md:text-2xl text-xl" />
          <span className="md:text-xs text-[10px]">Cart</span>
        </Link>
      </Badge>
    </Flex>
  );
};

export default Header;
