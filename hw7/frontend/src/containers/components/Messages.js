import styled from 'styled-components'

const StyledMessage = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${({fromMe}) => (fromMe ? 'row-reverse' : 'row')};
    margin: 8px 10px;
    & p:first-child {
        margin: 0 5px;
    }
    & p:last-child {
        padding: 2px 5px;
        border-radius: 5px;
        background: #eee;
        color: gray;
        margin: auto 0;
    }`;

const Message = ({ fromMe, message}) => {
    return (
    <StyledMessage fromMe={fromMe}>
        <p> {message}</p>
    </StyledMessage>
    );
   };

   export default Message