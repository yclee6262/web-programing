import './App.css'
import { useEffect } from 'react'
import styled from 'styled-components'
import {useChat} from './containers/hooks/useChat'
import ChatRoom from './containers/ChatRoom'
import SignedIn from './containers/Signin'


const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
    margin: 0;
    margin-right: 20px;
    font-size: 3em;
}`;

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