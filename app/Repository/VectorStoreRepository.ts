// caminho: app/Repository/CognitiveServiceRepository.ts

import { PrismaClient } from '@prisma/client'

export default class VectorStoreRepository {
  private static instance: PrismaClient
  private prisma

  constructor() {
    this.prisma = this.getInstance()
  }

  public getInstance(): PrismaClient {
    if (!VectorStoreRepository.instance) {
      VectorStoreRepository.instance = new PrismaClient()
    }
    return VectorStoreRepository.instance
  }

  public async CreateVectorStore(payload: any) {
    try {
      return await this.prisma.VectorStore.create({
        data: {
          name: payload.name,
        },
      })
    } catch (error) {
      return error
    }
  }

  public async GetVectorStoreById(id: string) {
    try {
      const service = await this.prisma.VectorStore.findUnique({
        where: {
          id: id,
        },
      })

      if (!service) {
        return new Error('VectorStore not found')
      }
      return service
    } catch (error) {
      return new Error(error)
    }
  }

  public async GetAllVectorStores() {
    try {
      return await this.prisma.VectorStore.findMany()
    } catch (error) {
      return error
    }
  }

  public async UpdateVectorStore(id: string, payload: any) {
    try {
      return await this.prisma.VectorStore.update({
        where: {
          id: id,
        },
        data: {
          name: payload.name,
        },
      })
    } catch (error) {
      return error
    }
  }

  public async DeleteVectorStore(id: string) {
    try {
      return await this.prisma.VectorStore.delete({
        where: {
          id: id,
        },
      })
    } catch (error) {
      return error
    }
  }
}
