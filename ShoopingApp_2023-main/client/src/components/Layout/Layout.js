import React from "react";
import Header from "./Header";
import Footer from "./Foter";
import { Helmet } from "react-helmet";
// import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Layout = ({ children , title , description , keyword , author }) => {
  return (
    <div>
      <Helmet>
        
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keyword} />
          <meta name="author" content={author} />
          <title>{title}</title>
        
      </Helmet>
      <Header></Header>
      <main style={{ minHeight: "75vh" }}>
      {/* <ToastContainer /> */}
        {children}</main>
      <Footer></Footer>
    </div>
  );
};

Layout.defaultProps = {
  title:"Ecommerse - shopping site",
  author:"Isha maurya",
  description:"shooping webapp",
  keyword:"mobile , headphone , eardbubs , lead , smartphone"


}

export default Layout;
