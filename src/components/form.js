import React, { useState } from "react";

const Form = ({ closingTodo, setTodoList, form, setForm, todoList }) => {
  const { Todo } = form;

  const addForm = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({
        Todo,
      });
      setForm(body);
      setTodoList([...todoList, form]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <p className="sign-header">Add To Do Item</p>
      <form onSubmit={(e) => addForm(e)}>
        <div className="form-group">
          <input
            name="Todo"
            value={Todo}
            type="text"
            class="form-control"
            placeholder="What to do"
          />
        </div>

        <div className="form-group">
          <button
            className="btn"
            onClick={(e) => {
              closingTodo();
              addForm(e);
            }}
            style={{
              display: "block",
              width: "100%",
              marginTop: "36px",
              marginBottom: "21px",
              color: "white",
              backgroundColor: "#393939",
            }}
          >
            Add To Do
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
