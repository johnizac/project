/*****************************************************************************
* BTI425 – Project
* I declare that this assignment is my own work in accordance with SenecaAcademic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Group member:9 Name:Ahmed Shaikh 127566222 & John Mubeezi 106922222 Date: 4/19/2024
*****************************************************************************/
import { Form, Button, Alert, Container, Row, Col,Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import { authenticateUser } from "../../lib/authenticate";
import { useRouter } from 'next/router';

export default function Login(props) {

  const [warning, setWarning] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    try{
      await authenticateUser(user, password);
      router.push("/products");
    }catch(err){
     setWarning(err.message);
    }

  }

  return (
    <>
    
    <Container className="mt-5">
 

      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="userName">
              <Form.Label>User Name:</Form.Label>
              <Form.Control type="text" value={user} name="userName" onChange={e => setUser(e.target.value)} />
            </Form.Group>
            
            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" value={password} name="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            {warning && (
              <Alert variant='danger' className="mt-3">
                {warning}
              </Alert>
            )}

            <div className="d-grid gap-2 mt-3">
              <Button variant="primary" type="submit">Login</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    
    </>
  );
}