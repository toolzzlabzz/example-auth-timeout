import { PrismaClient } from '@prisma/client'
import KbFolderException from 'App/Exceptions/KbFolderException'
import { ICreateKbFolderPayload, IKbFolder } from 'App/Interfaces/kbfolder'

export default class KbFolderRepository {
  private static instance: PrismaClient
  private prisma

  constructor() {
    this.prisma = this.getInstance()
  }

  public getInstance(): PrismaClient {
    if (!KbFolderRepository.instance) {
      KbFolderRepository.instance = new PrismaClient()
    }
    return KbFolderRepository.instance
  }

  public async CreateKbFolder(payload: ICreateKbFolderPayload): Promise<IKbFolder | Error> {
    try {
      return await this.prisma.kbFolder.create({
        data: {
          name: payload.name,
          institutionId: payload.institutionId,
          knowLedgeBaseId: payload.knowledgebaseId,
          isRoot: payload.isRoot || false,
        },
      })
    } catch (error) {
      return error
    }
  }

  public async GetKbFolderById(id: string) {
    try {
      const kbFolder = await this.prisma.kbFolder.findUnique({
        where: {
          id: id,
        },
        include: {
          knowLedgeBaseFile: true,
        },
      })

      return kbFolder
    } catch (error) {
      return error
    }
  }

  public async GetByBotId(botId: string) {
    try {
      const botFolders = await this.prisma.BotFolder.findMany({
        where: {
          botId: botId,
        },
        include: {
          kbFolder: true,
        },
      })

      return botFolders
    } catch (error) {
      return new KbFolderException(error.message, error.status, error.code)
    }
  }

  public async listAllKbFoldersByknowledgeId(id: string) {
    try {
      const knowledge = await this.prisma.knowLedgeBase.findFirst({
        where: {
          id: id,
        },
      })

      return await this.prisma.kbFolder.findMany({
        where: {
          knowLedgeBaseId: knowledge.id,
        },
      })
    } catch (error) {
      return error
    }
  }

  public async UpdateKbFolder(payload: any) {
    try {
      return await this.prisma.kbFolder.update({
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

  public async DeleteKbFolder(id: string) {
    try {
      return await this.prisma.kbFolder.delete({
        where: {
          id: id,
        },
      })
    } catch (error) {
      return error
    }
  }
}
