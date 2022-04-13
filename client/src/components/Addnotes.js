import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import NoteContext from "../context/notes/noteContext";

const Addnotes = () => {
  const { addNoteDB, note, addNote } = useContext(NoteContext);

  const { title, content } = note;

  const handleChange = (e) => {
    addNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNoteDB(note);
  };

  return (
    <Form>
      <Form.Group className='mb-3 my-4' controlId='exampleForm.ControlInput1'>
        <Form.Label>Title</Form.Label>
        <Form.Control type='text' name='title' value={title} onChange={handleChange} />
      </Form.Group>
      <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
        <Form.Label>Content</Form.Label>
        <Form.Control as='textarea' name='content' value={content} onChange={handleChange} rows={3} />
      </Form.Group>
      <Button className='my-2' variant='primary' onClick={handleSubmit} type='submit'>
        Add Note
      </Button>
    </Form>
  );
};

export default Addnotes;
