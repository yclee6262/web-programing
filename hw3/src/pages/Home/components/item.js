import x from './x.png';

const Item = () => {
    return <div className="todo-app__item">
        <div className="todo-app__checkbox">
            <input type="checkbox" id="2"></input>
            <label for="2"></label>
        </div>
        <h1 className="todo-app_item-detail">
            this is TODO
        </h1>
        <img src={x} class="todo-app__item-x" alt='delete'></img>
    </div>
}

export default Item