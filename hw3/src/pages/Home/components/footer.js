const Footer = ({TODO_num}) => {
  return (
    <div className="todo-app__footer" id="todo-footer">
      <div className="todo-app__total">{TODO_num + 1} left</div>
      <ul className="todo-app__view-buttons">
        <li>all</li>
      </ul>
      <div className="todo-app__clean">clear</div>
    </div>
  );
};

export default Footer;
