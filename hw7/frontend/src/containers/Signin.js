import Title from "./components/Title";
import LogIn from "./components/Login";
import {useChat} from "./hooks/useChat";
import styled from 'styled-components'

const Wrapper = styled.div`
    display: grid-flex;
    align-items: center;
    justify-content: center;
    h1 {
        margin: 0;
        margin-right: 20px;
        font-size: 3em;
    }`;

const SignIn = () => {
    const { me, setMe, setSignedIn, displayStatus } = useChat();
    const handleLogin = (name) => {
    if (!name) displayStatus({
        type: "error",
        msg: "Missing user name",
    });
    else {
        console.log("setttttt")
        setSignedIn(true);
    }
    }
    return (
    <Wrapper>
        <Title />
        <LogIn me={me} setName={setMe} onLogin={handleLogin} />
    </Wrapper>
    );
   }

   export default SignIn