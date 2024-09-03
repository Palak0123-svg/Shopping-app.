import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/Auth";
const AdminDashboard = () => {
    const[auth] = useAuth();
  return (
    <Layout title={"Dashboard"}>
      <div className="container-fluid m-3 p-3 ">
        <div className="row ">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-info" >
            <div className="card" style={{ width: "18rem" }}>
              
              <div className="card-body">
                <h3 className="card-title">Admin Details</h3>
                <p className="card-text">
                  <b>Admin Name:</b>{auth?.user?.name} <br />
                  <b>Admin E-mail:</b>{auth?.user?.email} <br />
                  <b>Admin Contact:</b>{auth?.user?.phone} <br />
                  <b>Admin city:</b>{auth?.user?.address} <br />
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
