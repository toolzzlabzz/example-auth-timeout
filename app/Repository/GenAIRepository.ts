import { PrismaClient } from '@prisma/client'
export default class GenAIRepository {
  private static instance: PrismaClient
  private prisma

  constructor() {
    this.prisma = this.getInstance()
  }

  public getInstance(): PrismaClient {
    if (!GenAIRepository.instance) {
      GenAIRepository.instance = new PrismaClient()
    }
    return GenAIRepository.instance
  }

  public async CreateGenAI(payload: any) {
    try {
      return await this.prisma.genAI.create({
        data: {
          name: payload.name,
        },
      })
    } catch (error) {
      return error
    }
  }

  public async GetGenAIById(id: string) {
    try {
      return await this.prisma.genAI.findUnique({
        where: {
          id: id,
        },
      })
    } catch (error) {
      return error
    }
  }

  public async IndexGenAI() {
    try {
      return await this.prisma.genAI.findMany({})
    } catch (error) {
      return error
    }
  }

  public async UpdateGenAI(payload: any) {
    try {
      return await this.prisma.genAI.update({
        where: {
          id: payload.id,
        },
        data: {
          name: payload.name,
        },
      })
    } catch (error) {
      return error
    }
  }

  public async DeleteGenAI(id: string) {
    try {
      return await this.prisma.GenAI.delete({
        where: {
          id: id,
        },
      })
    } catch (error) {
      return error
    }
  }
}
