import Header from "./components/header";
import Main from "./components/main";
import Footer from "./components/footer";
import "./styles.css";
import { useEffect } from "react";

const Home = () => {
  return (
    <div className="todo-app__root">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default Home;
