import React, { useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import NoteContext from "../context/notes/noteContext";

const ModalBS = (props) => {
  const { note, addNote, updateNoteDB, show, setShow } = useContext(NoteContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    addNote({ ...note, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNoteDB(note);
  };

  return (
    <>
      <Button className='d-none' ref={props.refs} variant='primary' onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' name='etitle' value={note.etitle} onChange={handleChange} autoFocus />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Content</Form.Label>
              <Form.Control
                as='textarea'
                name='econtent'
                value={note.econtent}
                onChange={handleChange}
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalBS;
