import x from "./x.png";
import { useState } from "react";

const Item = ({ id, notetext, deleteData, setnum }) => {
  function deleteTODO() {
    setnum(function (prev) {
      return prev - 1;
    });
    deleteData(function (prev) {
      return prev.filter((item) => item.id !== id);
    });
  }

  const [isDone, setIsDone] = useState(false)
  function updateDone(){
    setIsDone(!isDone)
    console.log(isDone)
  }
  
  return (
    <div className="todo-app__item" key={id}>
      <div className="todo-app__checkbox">
        <input type="checkbox" id={id} onClick={updateDone}></input>
        <label for={id}></label>
      </div>
      <h1 className={isDone? 'todo-app_item-done' : "todo-app__item-detail"}>
        <p>{notetext}</p>
      </h1>
      <img
        src={x}
        class="todo-app__item-x"
        alt="delete"
        onClick={deleteTODO}
      ></img>
    </div>
  );
};

export default Item;
