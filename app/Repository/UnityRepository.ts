// caminho completo: app/Repository/UnityRepository.ts
import { PrismaClient } from '@prisma/client'

export default class UnityRepository {
  private static instance: PrismaClient
  private prisma

  constructor() {
    this.prisma = this.getInstance()
  }

  public getInstance(): PrismaClient {
    if (!UnityRepository.instance) {
      UnityRepository.instance = new PrismaClient()
    }
    return UnityRepository.instance
  }

  public async CreateUnity(payload: any) {
    try {
      return await this.prisma.unity.create({
        data: {
          institutionId: payload.institutionId,
          name: payload.name,
          unityUuid: payload.unityUuid,
          faviconUrl: payload.faviconUrl,
          theme: payload.theme,
          subdomain: payload.subdomain,
        },
      })
    } catch (error) {
      return error
    }
  }

  public async GetUnityById(id: string) {
    try {
      return await this.prisma.unity.findUnique({
        where: {
          id: id,
        },
      })
    } catch (error) {
      return error
    }
  }

  public async UpdateUnity(id: string, payload: any) {
    try {
      return await this.prisma.unity.update({
        where: {
          id: id,
        },
        data: {
          name: payload.name,
          unityUuid: payload.unityUuid,
          faviconUrl: payload.faviconUrl,
          theme: payload.theme,
          subdomain: payload.subdomain,
        },
      })
    } catch (error) {
      return error
    }
  }

  public async DeleteUnity(id: string) {
    try {
      return await this.prisma.unity.delete({
        where: {
          id: id,
        },
      })
    } catch (error) {
      return error
    }
  }

  public async ListUnities(institutionId) {
    try {
      return await this.prisma.unity.findMany({
        where: {
          institutionId,
        },
      })
    } catch (error) {
      return error
    }
  }
}
