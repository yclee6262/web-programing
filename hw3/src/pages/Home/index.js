import Header from "./components/header"
import Main from "./components/main"
import Footer from "./components/footer"
import './styles.css'
import { useState } from "react"

const Home = () => {

    const [data, setdata] = useState([]);

    return <div className="todo-app__root">
        <Header />
        <Main add={setdata} listdata={data} />
        <Footer />
    </div>
}

export default Home