import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Dynamic() {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState([]);
  const [total, setTotal] = useState(0);
  const [current_page, setCurrent_page] = useState(1);
  const [per_page, setPer_page] = useState(12);
  const [search, setSearch] = useState('');

  const fetchData = async (pageNumber = 1) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ search: search })
    };
    const response = await fetch(`http://127.0.0.1:8000/api/searchData?page=${pageNumber}`, requestOptions);
    const nbaData = await response.json();
    setBookData(nbaData.data);
    setCurrent_page(nbaData.current_page);
    setPer_page(nbaData.per_page);
    setTotal(nbaData.total);
  }

  useEffect(() => {
    fetchData(1);
  }, []);

  const getPageDetail = (id) => {
    navigate("/productpage/" + id);
  }

  const renderBookData = () => {
    return (
      <Row>
        {bookData && bookData.map((book, k) => (
          <Col key={k} xs={12} md={4} lg={3} className='mb-3'>
            <Card>
              <Card.Img src={book.image} height='200vh' />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                <Card.Text>{book.description.substring(0, 120) + "..."}</Card.Text>
                <Button variant="primary" onClick={() => getPageDetail(book.id)}> Full Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))
        }
        <div className="mt-3">
          <Pagination activePage={current_page} totalItemsCount={total} itemsCountPerPage={per_page}
            onChange={(pageNumber) => fetchData(pageNumber)} itemClass="page-item" linkClass='page-link' firstPageText='First' lastPageText='Last'
          />
        </div>
      </Row >
    );
  }

  const searchBooks = () => {
    fetchData(1);
  }

  return (
    <Container>
      <div className='mb-5'>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search Anything"
            aria-label="Search Anything"
            aria-describedby="basic-addon2"
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button variant="outline-secondary" id="button-addon2" onClick={() => searchBooks()}>
            Search
          </Button>
        </InputGroup>
        <Form.Text id="searchHelpBlock" muted>
          You can search anything about books
        </Form.Text>
      </div>
      {bookData && renderBookData()}
    </Container>
  )
}