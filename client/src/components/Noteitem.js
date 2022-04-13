import React, { useContext} from "react";
import { Card } from "react-bootstrap";
import NoteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const { note, editNote } = props;
  const { deleteNoteDB, showAlert } = useContext(NoteContext);

  const deleteNote = async (noteitem) => {
    try {
      await deleteNoteDB(noteitem._id);
      showAlert("success", "Note deleted successfully");
    } catch (error) {
      showAlert("danger", "Error deleting note");
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>{note.content}</Card.Text>
      </Card.Body>
      <Card.Footer className='d-flex justify-content-end'>
        <i className='fa-solid fa-trash-can mx-3' onClick={()=> {deleteNote(note)}}></i>
        <i className='fa-solid fa-pen-to-square' onClick={() => {editNote(note)}}></i>
      </Card.Footer>
    </Card>
  );
};

export default Noteitem;
