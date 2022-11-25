import './App.css'
import { useEffect } from 'react'
import styled from 'styled-components'
import {useChat} from './containers/hooks/useChat'
import ChatRoom from './containers/ChatRoom'
import SignedIn from './containers/Signin'


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`;

const App = () => {
  const {status, signedIn, displayStatus } = useChat()
  
  useEffect(() => {
    displayStatus(status)},[status, displayStatus])
  // console.log(messages)
   
  return (
    <Wrapper>{signedIn? <ChatRoom /> : <SignedIn />}</Wrapper>
  )

}

export default App