export interface ChatMessage {
  chatId: number
  content: string
  createdAt: string
  sender: {
    memberEmail: string
    memberId: number
    memberName: string
  }
}

export interface ChatDataProps {
  meetingId: number
  chats: ChatMessage[]
}
