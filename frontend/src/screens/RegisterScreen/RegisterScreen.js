import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ErrorMessage } from '../../components/ErrorMessage'
import { Loading } from '../../components/Loading'
import { MainScreen } from '../../components/MainScreen'
import "./RegisterScreen.css"

export const RegisterScreen = () => {

  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [pic,setPic] = useState("https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [message,setMessage] = useState(null);
  const [picMessage,setPicMessage] = useState(null);
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setMessage("Password Do not match")
    }else{
      setMessage(null);
      try {
        
        setLoading(true)
        const {data} = await axios.post("/api/users",{name,pic,email,password});
        setLoading(false);
        localStorage.setItem("userInfo" , JSON.stringify(data));
        console.log(data,"sahil")
      } catch (error) {
        setError(error.response.data.message);
      }
    }
    // console.log(email)
  };

  const postDetails = (pics) => {
    if(!pics) {
      return setPicMessage("Please Select an Image")
    }
    setPicMessage(null);
    if(pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file',pics)
      data.append('upload_preset','sahilzipper')
      data.append('cloud_name','dtd5m7mvd')
      fetch("https://api.cloudinary.com/v1_1/dtd5m7mvd/upload",{
        method:'post',
        body:data,
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPic(data.url.toString());
      })
      .catch((err)=>{
        console.log(err)
      })
    } else {
      return setPicMessage("Please Select an Image")
    }
  }


  return (
    <MainScreen title="REGISTER" >
      <div className='loginContainer' >
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
      {loading && <Loading/>}
        <Form onSubmit={submitHandler} >
          <Form.Group controlId='name' >
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} type='name' placeholder='Enter Name' onChange={(e) => setName(e.target.value)}  />
          </Form.Group>

          <Form.Group controlId='formBasicEmail' >
            <Form.Label>Email address</Form.Label>
            <Form.Control value={email} type='email' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId='formBasicPassword' >
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} type='password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId='confirmPassword' >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control value={confirmPassword} type='password' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Group>


          {picMessage && (
            <ErrorMessage variant='danger' >{picMessage}</ErrorMessage>
          )}

          <Form.Group controlId="pic" >
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control onChange={(e) => postDetails(e.target.files[0])} type="file" placeholder='Upload ' />
          </Form.Group>

          <Button className='button' variant="primary" type="submit">
                        Register
          </Button>
        </Form>
        <Row className='py-3' >
                        <Col>
                            Already ? <Link to='/login' >Login Here</Link>
                        </Col>
        </Row>
      </div>
    </MainScreen>
  )
}
