import styled from 'styled-components'

export const ChatContainer = styled.div`
  background-color: #e9e9e9;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MessageContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
  padding: 1rem;
  height: calc(100% - 50px); /* Adjusted height */
  overflow-y: auto; /* Enable scrolling */
`

// ========================================================
export const BubbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  gap: 1rem;
`

export const BubbleBox = styled.div<{ $isMe: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isMe ? 'flex-end' : 'flex-start')};
  gap: 0.5rem;

  .msg {
    display: flex;
    flex-direction: ${(props) => props.$isMe && 'row-reverse'};
    align-items: flex-end;
    gap: 0.5rem;
  }
`

export const Username = styled.span<{ $isMe: boolean }>`
  display: ${(props) => props.$isMe && 'none'};
`

export const ChatBubble = styled.div<{ $isMe: boolean }>`
  background-color: #d9d9d9;
  border-radius: ${(props) =>
    props.$isMe ? '1rem 1rem 0 1rem' : '0 1rem 1rem 1rem'};
  padding: 10px;
`
// ========================================================

export const MyChatBubble = styled(ChatBubble)`
  border-radius: 1rem 1rem 0 1rem;
`

export const MsgInputBox = styled.div`
  background-color: #ffffff;
  width: 350px;
  height: 3.5rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

`

export const SendButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #d9d9d9; /* Blue send button */
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 1rem;
`
