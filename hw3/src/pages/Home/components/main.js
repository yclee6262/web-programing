import Item from './item';

const Main = ({listdata}) => {

    return <div className='todo-app__main'>
        <input type="text" className="todo-app__input" placeholder="What need to be done?"></input>
        <ul className="todo-app__list" id="todo-list">
            {
                listdata.map(item => <Item />)
            }
        </ul>
    </div>
}

export default Main