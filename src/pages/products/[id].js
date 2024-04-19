/*****************************************************************************
* BTI425 – Project
* I declare that this assignment is my own work in accordance with SenecaAcademic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Group member:9 Name:Ahmed Shaikh 127566222 & John Mubeezi 106922222 Date: 4/19/2024
*****************************************************************************/
import { useRouter } from 'next/router';

import { Container, Card, Button, Row, Col } from 'react-bootstrap';

export async function getServerSideProps(context) {
    const { id } = context.params;
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const product = await response.json();

    return { props: { product } };
}

export default function ProductDetail({ product }) {
    const router =useRouter();
    return (
        <Container className="my-5">
        <Card>
          <Row className="g-0">
            <Col md={6}>
              <Card.Img src={product.images[0]} alt={product.title} style={{ width: '100%', height: 'auto' }} />
            </Col>
            <Col md={6}>
              <Card.Body>
                <Card.Title className="display-5">{product.title}</Card.Title>
                <Card.Text className="mb-2 text-muted">Category: {product.category}</Card.Text>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>
                  <small className="text-muted">Brand: {product.brand}</small>
                </Card.Text>
                <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                <Card.Text>Rating: {product.rating} / 5</Card.Text>
                <Button variant="primary" onClick={() => router.push("/products")}>Go Back to Products</Button>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    );
}
