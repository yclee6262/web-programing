import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import "./styles.css";
import { useState, useEffect } from "react";

const Home = () => {
    const[footer, setfooter] = useState([])

  return (
    <div className="todo-app__root">
      <Header />
      <Main setFooter={setfooter}/>
      {
        footer.map((footerData) => {
            return <Footer/>
        })
      }
    </div>
  );
};

export default Home;
