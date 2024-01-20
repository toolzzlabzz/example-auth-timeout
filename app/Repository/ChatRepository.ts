// app/Repository/ChatRepository.ts
import { PrismaClient } from '@prisma-mongodb/client'

export default class ChatRepository {
  private static instance: PrismaClient
  private prisma: PrismaClient
  private Date
  constructor() {
    this.prisma = ChatRepository.getInstance()
    this.Date = new Date()
  }

  private static getInstance(): PrismaClient {
    if (!ChatRepository.instance) {
      ChatRepository.instance = new PrismaClient()
    }
    return ChatRepository.instance
  }

  // CRUD operations for Conversation
  public async createConversation(botId, userId: string) {
    return this.prisma.conversation.create({
      data: {
        botId,
        userId,
        createdAt: this.Date,
      },
    })
  }

  public async getConversations() {
    return this.prisma.conversation.findMany({
      include: {
        Message: true,
      },
    })
  }

  public async getConversationById(id: string) {
    return this.prisma.conversation.findUnique({
      where: { id },
      include: {
        Message: true,
      },
    })
  }

  public async deleteConversation(id: string) {
    return this.prisma.conversation.delete({
      where: { id },
    })
  }

  // CRUD operations for Message
  public async createMessage(payload) {
    return this.prisma.message.create({
      data: {
        conversationId: payload.conversationId,
        content: payload.message,
        createdAt: this.Date,
        role: payload.role,
      },
    })
  }

  public async getMessagesByConversationId(conversationId: string) {
    console.log(conversationId)

    return this.prisma.message.findMany({
      select: {
        role: true,
        content: true,
      },
      where: {
        conversationId: conversationId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  public async deleteMessage(id: string) {
    return this.prisma.message.delete({
      where: { id },
    })
  }
}
