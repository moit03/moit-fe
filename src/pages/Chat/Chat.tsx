import { useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client/dist/sockjs'
import { Stomp, type IMessage, type CompatClient } from '@stomp/stompjs'
import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import DetailHeader from '@/components/DetailHeader/DetailHeader'
import {
  BubbleBox,
  BubbleContainer,
  ChatBubble,
  ChatContainer,
  MessageContainer,
  MsgInputBox,
  SendButton,
  Username,
} from './styles'
import { getLocalStorageItem } from '@/util/localStorage'
import { getChatMsg } from '@/apis/meeting'
import { type ChatMessage } from '@/type/chat'

function Chat(): JSX.Element {
  const { meetingId } = useParams()

  const queryClient = useQueryClient()
  const stompClient = useRef<CompatClient | null>(null)

  const [chatMessage, setChatMessage] = useState('')
  const [chats, setChats] = useState<ChatMessage[]>([])

  const socket = new SockJS(`${import.meta.env.VITE_SOCKET_URL}`)
  const token: string = getLocalStorageItem('accessToken')
  const headers = { Authorization: `Bearer ${token}` }
  const decodedToken = jwtDecode(token)

  const { data } = useQuery({
    queryKey: ['getChatMessage'],
    queryFn: async () => await getChatMsg(Number(meetingId)),
  })

  useEffect(() => {
    stompClient.current = Stomp.over(socket)

    stompClient.current?.connect(headers, (): void => {
      stompClient.current?.subscribe(
        `/topic/rooms/${meetingId}/chat`,
        (message: IMessage) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const newMessage: ChatMessage = JSON.parse(message.body)
          setChats((prev) => [...prev, newMessage])
        }
      )
    })

    return () => {
      if (stompClient.current !== null) {
        stompClient.current?.disconnect()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingId])

  const sendChatMessage = (): void => {
    const chatRequest = { content: chatMessage }
    stompClient.current?.send(
      `/app/api/meetings/${meetingId}/chat`,
      headers,
      JSON.stringify(chatRequest)
    )
    setChatMessage('')
    void queryClient.invalidateQueries({ queryKey: ['getChatMessage'] })
  }

  useEffect(() => {
    // 채팅 내역이 변경될 때마다 스크롤을 맨 아래로 이동
    const messageContainer = document.getElementById('messageContainer')
    if (messageContainer !== null) {
      messageContainer.scrollTop = messageContainer.scrollHeight
    }
  }, [chats, data])

  return (
    <ChatContainer>
      <DetailHeader meetingId={Number(meetingId)} />
      <MessageContainer id="messageContainer">
        <BubbleContainer>
          {data?.chats?.map((e: ChatMessage) => (
            <BubbleBox
              key={e.chatId}
              $isMe={e.sender.memberEmail === decodedToken.sub}
            >
              <Username $isMe={e.sender.memberEmail === decodedToken.sub}>
                {e.sender.memberName}
              </Username>
              <div className="msg">
                <ChatBubble $isMe={e.sender.memberEmail === decodedToken.sub}>
                  {e.content}
                </ChatBubble>
                {e.createdAt.slice(11, 16)}
              </div>
            </BubbleBox>
          ))}
        </BubbleContainer>
      </MessageContainer>
      <MsgInputBox>
        <input
          type="text"
          value={chatMessage}
          onChange={(e) => {
            setChatMessage(e.target.value)
          }}
          placeholder="Type your message..."
        />
        <SendButton onClick={sendChatMessage}>Send</SendButton>
      </MsgInputBox>
    </ChatContainer>
  )
}

export default Chat
