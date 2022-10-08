import Item from "./item";
import { useState } from "react";
import { v4 } from "uuid";

const Main = () => {
  const [data, setdata] = useState([]);
  const [note, setnote] = useState("");

  function addItem() {
    setdata(function (prev) {
      return [{ id: v4(), note }, ...prev];
    });
  }

  function noteChange(e) {
    setnote(e.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  return (
    <div className="todo-app__main">
      <input
        type="text"
        className="todo-app__input"
        placeholder="What need to be done?"
        onKeyDown={handleKeyDown}
        value={note}
        onChange={noteChange}
      ></input>
      <ul className="todo-app__list" id="todo-list">
        {data.map((item) => {
          const { note, id } = item;
          return <Item key={id} id={id} notetext={note} deleteData={setdata} />;
        })}
      </ul>
    </div>
  );
};

export default Main;
