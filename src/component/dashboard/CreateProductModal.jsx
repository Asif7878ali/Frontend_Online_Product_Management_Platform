import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Upload, Button, notification } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const CreateProductModal = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleFinish = async (values) => {
    setLoading(true);
    // Simulate API request
    try {
      if (fileList.length === 0) {
        notification.error({ message: "Error", description: "Please upload an image." });
        setLoading(false);
        return;
      }

      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      notification.success({ message: "Success", description: "Product created successfully!" });
      
      const newProduct = {
        id: Math.random().toString(36).substr(2, 9),
        ...values,
        image: fileList[0].name,
      };

      form.resetFields();
      setFileList([]);
      onSuccess(newProduct); 
      onClose();
    } catch (error) {
      notification.error({ message: "Error", description: "Failed to create product." });
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false; // Prevent automatic upload
    },
    fileList,
    maxCount: 1, 
  };

  return (
    <Modal
      title={<h2 className="text-xl font-semibold mb-4">Create New Product</h2>}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label={<span className="font-medium text-gray-700">Product Name</span>}
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input placeholder="Enter product name" size="large" />
        </Form.Item>

        <Form.Item
          name="description"
          label={<span className="font-medium text-gray-700">Description</span>}
          rules={[{ required: true, message: "Please input product description!" }]}
        >
          <TextArea rows={4} placeholder="Enter product description" />
        </Form.Item>

        <div className="flex gap-4">
          <Form.Item
            name="price"
            label={<span className="font-medium text-gray-700">Price ($)</span>}
            rules={[{ required: true, message: "Please input product price!" }]}
            className="flex-1"
          >
            <InputNumber className="w-full" size="large" min={0} placeholder="0.00" />
          </Form.Item>

          <Form.Item
            name="stock"
            label={<span className="font-medium text-gray-700">Stock Quantity</span>}
            rules={[{ required: true, message: "Please input stock quantity!" }]}
            className="flex-1"
          >
            <InputNumber className="w-full" size="large" min={0} placeholder="0" />
          </Form.Item>
        </div>

        <Form.Item
          name="status"
          label={<span className="font-medium text-gray-700">Status</span>}
          rules={[{ required: true, message: "Please select product status!" }]}
        >
          <Select size="large" placeholder="Select Status">
            <Option value="active">Active</Option>
            <Option value="draft">Draft</Option>
            <Option value="out_of_stock">Out of Stock</Option>
          </Select>
        </Form.Item>

        <Form.Item label={<span className="font-medium text-gray-700">Product Image</span>} required>
          <Upload {...uploadProps} listType="picture">
            <Button size="large">Select Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item className="mt-6 mb-0 text-right">
          <Button onClick={onClose} className="mr-3" size="large">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading} size="large" className="bg-blue-600">
            Create Product
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;
