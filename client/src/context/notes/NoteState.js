import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const initialNotes = [];

  const [alert, setAlert] = useState(null);
  const [notes, setNotes] = useState(initialNotes);
  const [show, setShow] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [note, addNote] = useState({
    title: "",
    content: "",
    id: "",
  });

  //create a function to show alert with timeout
  const showAlert = (type, message) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  //fetches notes from the backend
  const fetchNotes = async () => {
    try {
      const response = await fetch(`/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);
    } catch (error) {
      console.log(error);
    }
  };

  //add note
  const addNoteDB = async (note) => {
    //API call
    try {
      const response = await fetch(`/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(note),
      });
      const json = await response.json();
      console.log(json);
      if (json.errors) {
        showAlert("danger", json.errors[0].msg);
      } else {
        showAlert("success", "Note added successfully");
        setNotes([...notes, json]);
        addNote({ title: "", content: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //edit note
  const updateNoteDB = async (updatedNote) => {
    //API call
    try {
      const response = await fetch(`/api/notes/updatenote/${updatedNote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title: updatedNote.etitle, content: updatedNote.econtent }),
      });
      const json = await response.json();
      console.log(json);
      if (json.errors) {
        showAlert("danger", json.errors[0].msg);
      } else {
        setNotes(notes.map((note) => (updatedNote.id === note._id ? json : note)));
        showAlert("success", "Note updated successfully");
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete note
  const deleteNoteDB = async (id) => {
    //API call
    try {
      const response = await fetch(`/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      console.log(json);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        note,
        addNote,
        notes,
        setNotes,
        show,
        setShow,
        alert,
        showAlert,
        deleteNoteDB,
        updateNoteDB,
        fetchNotes,
        addNoteDB,
        isloggedIn,
        setIsLoggedIn,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
