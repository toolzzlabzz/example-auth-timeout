import { PrismaClient } from '@prisma/client'

export default class GenAIModelRepository {
  private static instance: PrismaClient
  private prisma

  constructor() {
    this.prisma = this.getInstance()
  }

  public getInstance(): PrismaClient {
    if (!GenAIModelRepository.instance) {
      GenAIModelRepository.instance = new PrismaClient()
    }
    return GenAIModelRepository.instance
  }

  public async CreateGenAIModel(payload: any) {
    try {
      return await this.prisma.GenAIModel.create({
        data: {
          genAIId: payload.genAIId,
          name: payload.name,
        },
      })
    } catch (error) {
      return error
    }
  }

  public async GetGenAIModelById(id: string) {
    try {
      const model = await this.prisma.GenAIModel.findUnique({
        where: {
          id: id,
        },
      })

      return model
    } catch (error) {
      return new Error(error)
    }
  }

  public async IndexGenAIModel(id: string) {
    try {
      const model = await this.prisma.genAI.findUnique({
        where: {
          id: id,
        },
      })

      return await this.prisma.GenAIModel.findMany({
        where: {
          genAIId: model.id,
        },
      })
    } catch (error) {
      return error
    }
  }

  public async UpdateGenAIModel(payload: any) {
    try {
      return await this.prisma.GenAIModel.update({
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

  public async DeleteGenAIModel(id: string) {
    try {
      return await this.prisma.GenAIModel.delete({
        where: {
          id: id,
        },
      })
    } catch (error) {
      return error
    }
  }
}
