import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";
import Categoryform from "../../components/form/categoryform";
function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${data.Category.name} is created`);
        console.log(data);
        setName("");
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in form");
    }
  };

  const handlSubmitName = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected}`,
        { name: updatedName }
      );
      console.log(selected);

      if (data?.success) {
        toast.success(updatedName, "updated");
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleDeleteName = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`
      );

      if (data?.success) {
        toast.success(`${data.category.name} deleted  `);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  // get all categories

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) setCategories(data.category);
      // console.log(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in getting Data");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title={"Admin DashBoard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Manage Category</h2>
            <div className="p-3 w-50">
              <Categoryform
                value={name}
                setValue={setName}
                handlesubmit={handleSubmit}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <>
                        <td>{c.name}</td>
                      </>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c._id);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger ms-2"
                          onClick={(e) => {
                            handleDeleteName(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <Categoryform
              value={updatedName}
              setValue={setUpdatedName}
              handlesubmit={handlSubmitName}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
