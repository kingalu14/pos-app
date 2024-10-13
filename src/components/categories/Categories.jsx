import { Modal } from "antd";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import "./style.css";
import { PlusOutlined } from "@ant-design/icons";

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    try {
      console.log(values);
      fetch("http://localhost:5000/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        credentials: "include",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ul className="flex border-b mb-0 md:mb-6  gap-4 text-2lg pb-2 md:pb-10 md:flex-col overflow-auto">
        <li className="category-item ">
          <span>Tüm</span>
        </li>
        <li className="category-item">
          <span>Foods</span>
        </li>
        <li className="category-item ">
          <span>Drinks</span>
        </li>
        <li
          className="category-item !bg-purple-800 hover:opacity-90"
          onClick={showModal}
        >
          <PlusOutlined />
        </li>

        <Modal
          title="Add New Category"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
        >
          <Form style={{ maxWidth: 600 }} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Add Category"
              name="title"
              rules={[{ required: true, message: "category can't be empty!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item className="flex justify-end mb-0">
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </ul>
    </div>
  );
};

export default Categories;
