import * as React from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
//import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import EditProduct from "./product/edit.component";
import ProductList from "./product/list.component";
import CreateProduct from "./product/create.component";
import AllProducts from "./product/allListing.component";
import ProductPage from "./product/productPage.component";

function App() {
  return (
    <Router>
      <Navbar bg="primary">
        <Container>
          <Link to={"/"} className="navbar-brand text-white">
            User Listing
          </Link>
          <Link to={"/allListing"} className="navbar-brand text-white">
            Admin Listing
          </Link>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="/book/create" element={<CreateProduct />} />
              <Route path="/book/edit/:id" element={<EditProduct />} />
              <Route exact path='/allListing' element={<ProductList />} />
              <Route path='/' element={<AllProducts />} />
              <Route path="/productpage/:id" element={<ProductPage />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>);
}

ReactDOM.render(<App />, document.getElementById('app'))