import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loading } from '../../components/Loading';
import { MainScreen } from '../../components/MainScreen';
import "./LoginScreen.css";


export const LoginScreen = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(false)
    const [loading,setLoading] = useState(false);


    


    const submitHandler = async (e) => {
        e.preventDefault()
        // console.log(email,password)
        try {
            
            setLoading(true);

            const {data} = await axios.post("/api/users/login",
            {
                email,
                password,
            });

            console.log(data);
            localStorage.setItem('userInfo', JSON.stringify(data))

            setLoading(false);

        } catch (error) {
            setError(error.response.data.message)
            console.log(error)
            setLoading(false);
        }
    }


  return (
    <MainScreen title="LOGIN">
        <div className='loginContainer'>
        {error && <ErrorMessage variant='danger' >{error}</ErrorMessage>}
        {loading && <Loading/>}
                    <Form onSubmit={submitHandler} >
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        </Form.Group>
                        <Button variant="primary" type="submit">
                        Submit
                        </Button>
                    </Form>
                    <Row className='py-3' >
                        <Col>
                            New Customer ? <Link to='/register' >Register Here</Link>
                        </Col>
                    </Row>
        </div>
    </MainScreen>
  )
}
