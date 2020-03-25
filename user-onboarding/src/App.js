import React from 'react';
import './App.css';
import Form from './components/Form'
import styled from "styled-components";

const Container = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #89afcf;
  width: 80%;
  margin: 10vh 10%;
  padding: 50px 0;
  border-radius: 30px;
  border: 5px solid steelblue;
`;

const Header = styled.h1`
  font-size: 3rem;
  color: white;
  margin-top: 0;
`;

function App() {
  return (
    <Container>
      <Header>Log In</Header>
      <Form/>
    </Container>
  );
}

export default App;
