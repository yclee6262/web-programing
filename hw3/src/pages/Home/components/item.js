import x from "./x.png";

const Item = ({ id, notetext, deleteData }) => {
  function deleteTODO() {
    deleteData(function (prev) {
      return prev.filter((item) => item.id !== id);
    });
  }

  return (
    <div className="todo-app__item">
      <div className="todo-app__checkbox">
        <input type="checkbox" id="2"></input>
        <label for="2"></label>
      </div>
      <h1 className="todo-app_item-detail">
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
