/*****************************************************************************
* BTI425 – Project
* I declare that this assignment is my own work in accordance with SenecaAcademic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Group member:9 Name:Ahmed Shaikh 127566222 & John Mubeezi 106922222 Date: 4/19/2024
*****************************************************************************/

import Link from 'next/link';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { searchHistoryAtom } from '../atoms';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { readToken, removeToken } from '../lib/authenticate';

export default function Layout(props) {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {

    console.log(searchHistory);
  }, [searchHistory]);

  let token = readToken();

  function logout() {
    removeToken();
    router.push("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchField = e.currentTarget.search.value;
    const queryString = `?q=${searchField}`;
    router.push(`/products${queryString}`);
    setSearchHistory((current) => [...current, searchField]);

  };




  return (
    <>
      <div className="container mt-4">
        <div className="p-5 bg-light rounded shadow">
          <h2 className="mb-4 text-center display-4 text-primary font-weight-bold">GetIT!</h2>

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link text-primary" href="/">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-primary" href="/aboutUs">About Us</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-primary" href="/contactUs">Contact Us</Link>
                  </li>
                  {token && (
                    <li className="nav-item">
                      <Link className="nav-link text-primary" href="/favourites">Favourites</Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <Link className="nav-link text-primary" href="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-primary" href="/register">Register</Link>
                  </li>
                  {token && (
                    <li className="nav-item">
                      <Link className="nav-link text-primary" href="/products">Products</Link>
                    </li>
                  )}
                  {token && (
                    <li className="nav-item">
                      <Link className="nav-link text-primary" href="/history">History</Link>
                    </li>
                  )}

                </ul>
                {token && (
                  <Form className="d-flex" onSubmit={handleSubmit}>
                    <FormControl
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      name="search"
                    />
                    <Button variant="outline-success" type="submit">Search</Button>
                    <Button className="ms-2" variant="outline-danger" onClick={logout}>Logout</Button>
                  </Form>
                )}
              </div>
            </div>
          </nav>

          <hr className="mb-4" />
          {props.children}
        </div>
      </div>


    </>


  )
}
