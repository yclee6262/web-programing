import styled from 'styled-components'
import { useEffect } from 'react'
import SignIn from './SignIn'
import ChatRoom from './ChatRoom'
import { useChat } from './hooks/useChat'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`

function App() {
    const { status, signedIn, displayStatus } = useChat()

    useEffect(() => {
        displayStatus(status)
    }, [status])

    return (
        <Wrapper>
            {signedIn ? <ChatRoom /> : <SignIn />}
        </Wrapper>
    )
}

export default App
