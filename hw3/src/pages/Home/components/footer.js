const Footer = ({TODO_num}) => {
  return (
    <div className="todo-app__footer" id="todo-footer">
      <div className="todo-app__total">{TODO_num + 1} left</div>
      <ul className="todo-app__view-buttons">
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </ul>
      <div className="todo-app__clean">
        <button>clear</button>
      </div>
    </div>
  );
};

export default Footer;
