import React, { useEffect } from 'react'
import { Accordion, Badge, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { MainScreen } from '../../components/MainScreen'
// import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/notesActions';
import { Loading } from '../../components/Loading';
import { ErrorMessage } from '../../components/ErrorMessage';

export const MyNotes = ({search}) => {
    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const noteList = useSelector(state => state.noteList);
    const {loading , notes,error} = noteList;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    console.log("ss" , userInfo);

    const noteCreate = useSelector((state) => state.noteCreate);
    const {success : successCreate} = noteCreate;

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const {success:successUpdate} = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const {loading:loadingDelete,error:errorDelete,success:successDelete} = noteDelete;





    const deleteHandler = (id) => {
        console.log(id,"ddd")
        if(window.confirm("Are you sure ? ")) {
            dispatch(deleteNoteAction(id))
        }
    }

    console.log(notes,"sahil")

    useEffect(() =>{
        dispatch(listNotes());
        if(!userInfo) {
            navigate("/")
        }
    },[dispatch , userInfo , navigate , successCreate , successUpdate , successDelete ])
    

  return (
    <MainScreen title = {`Welcome Back ${userInfo.name}..`} >
        <Link to='/createnote' >
            <Button style={{marginLeft:10 , marginBottom:6}} size="lg" >
                Create New Note
            </Button>
        </Link>
        {errorDelete && (
            <ErrorMessage variant='danger' >{errorDelete}</ErrorMessage>
        )}
        {loadingDelete && <Loading/>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading/>}
                {
                    notes?.reverse().filter(filteredNote => (
                        filteredNote.title.toLowerCase().includes(search.toLowerCase())
                    )).map((note) => (
                        <Accordion key={note._id} >
                            <Card style={{margin:10}} >
                            <Card.Header style={{display:"flex"}} >
                                <span style={{color:"black" , textDecoration:"none" , flex:1,cursor:"pointer" , alignSelf:"center",fontSize:18}} >
                                    {note.title}
                                </span>
                            <div>
                                <Button href={`/notes/${note._id}`} >Edit</Button>
                                <Button variant='danger' className='mx-2' onClick={() => deleteHandler(note._id)} >
                                Delete
                                </Button>
                            </div>
                            </Card.Header>
                            
                                <Card.Body>
                                <h4>
                                    <Badge bg="success" >
                                        Category -{note.category}
                                    </Badge>
                                </h4>
                                <blockquote className="blockquote mb-0">
                                    <p>
                                    {note.content}
                                    </p>
                                    <footer className="blockquote-footer">
                                    Created On {" "}
                                        <cite title='Source Title' >
                                            {note.createdAt.substring(0,10)}
                                        </cite>
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
