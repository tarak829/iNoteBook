import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <Container>
      <h1>About</h1>
      <p>This is a full-stack react application for keeping your notes online.</p>
      <p>You can create an account, add notes, update notes, and delete notes.</p>
      <p>This project was created using the following technologies:</p>
      <ul>
        <li>React</li>
        <li>Node</li>
        <li>Express</li>
        <li>Bootstrap</li>
      </ul>
    </Container>
  );
};

export default About;
