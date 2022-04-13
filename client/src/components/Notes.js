import React, { useContext, useEffect, useRef } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { Row, Col } from "react-bootstrap";
import Addnotes from "./Addnotes";
import ModalBS from "./Modal";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const { notes, fetchNotes, addNote, isloggedIn, showAlert } = useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isloggedIn) {
      fetchNotes();
    } else {
      navigate("/login");
      showAlert("success", "Please login to view notes");
    }
  }, []);

  const refs = useRef(null);

  const editNote = (note) => {
    refs.current.click();
    addNote({
      etitle: note.title,
      econtent: note.content,
      id: note._id,
    });
  };

  return (
    <>
      <Addnotes />
      <ModalBS refs={refs} />
      <h2>Your Notes:</h2>
      <Row xs={1} md={4} className='g-4 my-3'>
        {notes.length === 0 && <h3>No Notes</h3>}
        {notes.map((note) => (
          <Col key={note._id}>
            <Noteitem note={note} editNote={editNote} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Notes;
