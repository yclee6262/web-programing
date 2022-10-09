import Item from "./item";
import { useState } from "react";
import { v4 } from "uuid";

const Main = ({ setFooter, setnum }) => {
  const [data, setdata] = useState([]);
  const [note, setnote] = useState("");

  function addItem() {
    setdata(function (prev) {
      return [...prev, { id: v4(), note }];
    });
  }

  function addFooter() {
    setFooter([1]);
  }

  function updateNum() {
    setnum(data.length);
  }

  function noteChange(e) {
    setnote(e.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addItem();
      addFooter();
      updateNum();
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
          return (
            <Item
              key={id}
              id={id}
              notetext={note}
              deleteData={setdata}
              setnum={setnum}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Main;
