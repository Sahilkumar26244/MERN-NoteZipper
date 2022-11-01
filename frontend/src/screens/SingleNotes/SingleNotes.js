import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteNoteAction, updateNoteAction } from '../../actions/notesActions';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loading } from '../../components/Loading';
import { MainScreen } from '../../components/MainScreen';

export const SingleNotes = () => {
  const [title,setTitle] = useState();
  const [content,setContent] = useState();
  const [category,setCategory] = useState();
  const [date,setDate] = useState("");
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const {loading,error} = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {loading:loadingDelete , error:errorDelete} = noteDelete;

  const deleteHandler = (id) => {
    if(window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id))
    }
    navigate("/mynotes");
  }

  useEffect(() => {
    const fetching = async () => {
      const {data} = await axios.get(`/api/notes/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };
    fetching()
  },[id,date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  }

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(id,title,content,category));
    if(!title || !content || !category) return;

    resetHandler();
    navigate("/mynotes")

  }

  return (
    <MainScreen title="Edit Note" >
      <Card>
        <Card.Header>Edit your note</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
          {loadingDelete && <Loading/>}
          {errorDelete && (
            <ErrorMessage variant='danger' >{errorDelete}</ErrorMessage>
          )}
            {error && <ErrorMessage variant='danger' >{error}</ErrorMessage>}
            <Form.Group controlId='title' >
              <Form.Label>Title</Form.Label>
              <Form.Control type='title' placeholder='Enter the title' value={title} 
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='content' >
              <Form.Label>Content</Form.Label>
              <Form.Control as='textarea' placeholder="Enter the content" rows={4} value={content} 
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId='content'>
              <Form.Label>Category</Form.Label>
              <Form.Control type='content' placeholder='Enter the category' value={category} 
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant='primary' type='submit' >
              Update Note
            </Button>
            <Button variant='danger' className='mx-2' onClick={() => deleteHandler(id)} >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className='text-muted'>
              Updating on - {date.substring(0,10)}
        </Card.Footer>
      </Card>
    
    </MainScreen>
  )
}
