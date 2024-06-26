/*****************************************************************************
* BTI425 – Project
* I declare that this assignment is my own work in accordance with SenecaAcademic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Group member:9 Name:Ahmed Shaikh 127566222 & John Mubeezi 106922222 Date: 4/19/2024
*****************************************************************************/
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home Page" />
      </Head>
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-md-12">
            <div className="d-flex flex-column justify-content-center align-items-center h-100">
              <h1 className="display-4 fw-bold text-center">Everything at One Place!</h1>
              <h2>Make an Account and Browse a variety of Products!</h2>
              <div className="row gx-5 gy-3 mt-5">
                <div className="col-md-6">
                  <div className="p-3 border bg-light">
                    <h5>Smartphones</h5>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 border bg-light">
                    <h5>Laptops</h5>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 border bg-light">
                    <h5>Fragrances</h5>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-3 border bg-light">
                    <h5>Skincare</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
