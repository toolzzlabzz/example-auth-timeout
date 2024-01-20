// app/Repository/BotCognitiveServiceRepository.ts
import { PrismaClient } from '@prisma/client'

export default class BotVectorStoreRepository {
  private static instance: PrismaClient
  private prisma: PrismaClient

  constructor() {
    this.prisma = BotVectorStoreRepository.getInstance()
  }

  private static getInstance(): PrismaClient {
    if (!BotVectorStoreRepository.instance) {
      BotVectorStoreRepository.instance = new PrismaClient()
    }
    return BotVectorStoreRepository.instance
  }

  public async createBotVectorStore(payload: any): Promise<any> {
    try {
      return await this.prisma.BotVectorStore.create({
        data: payload,
      })
    } catch (error) {
      return new Error(error)
    }
  }

  public async getBotVectorStoreById(id: string): Promise<any> {
    try {
      return await this.prisma.BotVectorStore.findUnique({
        where: { id },
      })
    } catch (error) {
      return new Error(error)
    }
  }

  public async listBotVectorStore(): Promise<any> {
    try {
      return await this.prisma.BotVectorStore.findMany()
    } catch (error) {
      return new Error(error)
    }
  }

  public async updateBotVectorStore(id: string, payload: any): Promise<any> {
    try {
      return await this.prisma.BotVectorStore.update({
        where: { id },
        data: payload,
      })
    } catch (error) {
      return new Error(error)
    }
  }

  public async deleteBotVectorStore(id: string): Promise<any> {
    try {
      return await this.prisma.BotVectorStore.delete({
        where: { id },
      })
    } catch (error) {
      return new Error(error)
    }
  }
}
