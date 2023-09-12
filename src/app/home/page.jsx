"use client";
import React, { useEffect, useState } from "react";
import { Card, Button, Input } from "antd";
import { EditOutlined, CheckOutlined, RestOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const TodoPage = () => {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const updateInput = (value) => {
    setTodo(value);
  };

  const addItem = () => {
    if (todo.trim() !== "") {
      const inputItem = {
        id: uuidv4(),
        value: todo,
      };
      setList([...list, inputItem]);
      setTodo("");
    }
  };

  const deleteItem = (key) => {
    const updatedList = list.filter((item) => item.id !== key);
    setList(updatedList);
  };

  const editItem = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setEditedTodo(list[index].value);
  };

  const saveEditedItem = () => {
    const updatedTodos = [...list];
    updatedTodos[editIndex].value = editedTodo;
    setList(updatedTodos);
    setIsEditing(false);
    setEditIndex(null);
    setEditedTodo("");
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "green",
        }}
      >
        TO DO LIST
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <Input
          placeholder="Add item..."
          value={todo}
          onChange={(e) => updateInput(e.target.value)}
        />
        <Button
          style={{ backgroundColor: "green", color: "white" }}
          onClick={addItem}
        >
          ADD
        </Button>
      </div>

      {list.length > 0 ? (
        list.map((item, index) => (
          <Card
            key={item.id}
            style={{
              width: 560,
              marginBottom: "10px",
            }}
            actions={[
              <RestOutlined key="delete" onClick={() => deleteItem(item.id)} />,
              <EditOutlined key="edit" onClick={() => editItem(index)} />,
              <CheckOutlined key="save" onClick={saveEditedItem} />,
            ]}
          >
            <div className="todo-container">
              {isEditing && index === editIndex ? (
                <Input
                  placeholder="Borderless"
                  bordered={false}
                  className="todo-input"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
              ) : (
                <span style={{ fontSize: "1.2rem", flexGrow: "1" }}>
                  {item.value}
                </span>
              )}
            </div>
          </Card>
        ))
      ) : (
        <div style={{ textAlign: "center", fontSize: "1.2rem", color: "#777" }}>
          No items in the list
        </div>
      )}
    </div>
  );
};

export default TodoPage;
