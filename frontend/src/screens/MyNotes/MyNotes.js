import React, { useEffect, useState } from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { MainScreen } from '../../components/MainScreen'
import axios from "axios";

export const MyNotes = () => {

    const [notes,setNotes] = useState([]);



    const deleteHandler = () => {
        if(window.confirm("Are you sure ? ")) {

        }
    }

    const fetchNotes = async () => {
        const {data} = await axios.get("/api/notes");
        setNotes(data)
    }

    useEffect(() =>{
        fetchNotes()
    },[])
    

  return (
    <MainScreen title='Welcome Back Sahil Kumar...' >
        <Link to='createnote' >
            <Button style={{marginLeft:10 , marginBottom:6}} size="lg" >
                Create New Note
            </Button>
        </Link>
                {
                    notes.map((note) => (
                        <Accordion key={note._id} >
                            <Card style={{margin:10}} >
                            <Card.Header style={{display:"flex"}} >
                                <span style={{color:"black" , textDecoration:"none" , flex:1,cursor:"pointer" , alignSelf:"center",fontSize:18}} >
                                    {note.title}
                                </span>
                            <div>
                                <Button href={`/note/${note._id}`} >Edit</Button>
                                <Button variant='danger' className='mx-2' onClick={() => deleteHandler(note.id)} >
                                Delete
                                </Button>
                            </div>
                            </Card.Header>
                            
                                <Card.Body>
                                <h4>
                                    <Badge variant="success" >
                                        Category -{note.category}
                                    </Badge>
                                </h4>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                    {note.content}
                                    </p>
                                    <footer className="blockquote-footer">
                                    Created On -date
                                    </footer>
                                </blockquote>
                                </Card.Body>
                            </Card>
                        </Accordion>
                    ))
                }
            
        
    </MainScreen>
  )
}
