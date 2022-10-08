import Item from './item';
import { useState } from "react"

const Main = () => {

    const [data, setdata] = useState([]);
    const [note, setnote] = useState('')
    function addItem() {
        setdata(function(prev){
            return [...prev, note]
        })
    }

    function noteChange(e) {
        setnote(e.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log("yes")
            addItem();
        }
    }
    
    return <div className='todo-app__main'>
        <input type="text" className="todo-app__input" placeholder="What need to be done?"  onKeyDown={handleKeyDown} 
        value={note} onChange={noteChange}></input>
        <ul className="todo-app__list" id="todo-list">
            {
                data.map(item => <Item/>)
            }
        </ul>
    </div>
}

export default Main