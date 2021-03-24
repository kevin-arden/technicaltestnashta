import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./header.css";
import Form from "./form";

const Header = () => {
  const history = useHistory();
  const [todoList, setTodoList] = useState([]);
  const [showTodo, setShowTodo] = useState(false);
  const showingTodo = () => setShowTodo(true);

  const closingTodo = () => setShowTodo(false);

  const goHome = () => {
    history.push(`/`);
  };
  const goAddEvent = () => {
    history.push(`/addevent`);
  };

  const goDashBoard = () => {
    history.push(`/dashboard`);
  };
  return (
    <div style={{ backgroundColor: "#C0C0C0" }}>
      <div className="navbarContainer">
        <Navbar bg="none" expand="lg">
          <Navbar.Brand onClick={goHome}>
            <h1 style={{ cursor: "pointer" }}>Event App</h1>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav
              style={{
                display: "inline-block",
                float: "right",
                paddingRight: "20px",
              }}
            >
              {" "}
              <button
                className="btn btn-light"
                onClick={goAddEvent}
                style={{
                  display: "inline-block",
                }}
              >
                Add Event
              </button>
            </Nav>
            <Nav
              style={{
                display: "inline-block",
                float: "right",
              }}
            >
              {" "}
              <button
                className="btn btn-light"
                onClick={goDashBoard}
                style={{
                  display: "inline-block",
                }}
              >
                Dashboard
              </button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <Modal show={showTodo} onHide={closingTodo} dialogClassName="modal-main">
        <Modal.Body>
          <Form closingTodo={closingTodo} setTodoList={setTodoList} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Header;
