// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { login } from '../../actions/userActions';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loading } from '../../components/Loading';
import { MainScreen } from '../../components/MainScreen';
import "./LoginScreen.css";
import { useNavigate } from 'react-router-dom';


export const LoginScreen = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const {loading,error,userInfo} = userLogin;

    useEffect(()=>{
        if(userInfo) {
            navigate("/mynotes")
            // console.log(userInfo,"sagar")
        }
    },[userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email,password))
        
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
