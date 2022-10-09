import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import "./styles.css";
import { useState } from "react";

const Home = () => {
    const[footer, setfooter] = useState([])
    const[num, setnum] = useState(0)

  return (
    <div className="todo-app__root">
      <Header />
      <Main setFooter={setfooter} setnum={setnum}/>
      {
        footer.map((footerData) => {
            return <Footer TODO_num={num}/>
        })
      }
    </div>
  );
};

export default Home;
