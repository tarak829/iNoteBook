import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./components/Appbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alertbox from "./components/Alert";
import SignUp from "./components/Auth/Register";
import SignIn from "./components/Auth/Login";

function App() {
  return (
    <NoteState>
      <Router>
        <Appbar />
        <Alertbox />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/login' element={<SignIn />} />
          <Route exact path='/register' element={<SignUp />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
