import { PrismaClient } from '@prisma/client'
import BotException from 'App/Exceptions/BotException'

export default class BotFolderRepository {
  private static instance: PrismaClient
  private prisma
  constructor() {
    this.prisma = this.getInstance()
  }
  public getInstance(): PrismaClient {
    if (!BotFolderRepository.instance) {
      BotFolderRepository.instance = new PrismaClient()
    }
    return BotFolderRepository.instance
  }
  public async CreateBotFolder(payload: any): Promise<any | Error> {
    try {
      const folder = await this.prisma.kbFolder.findUnique({
        where: { id: payload.folderId },
      })

      if (!folder) {
        return new BotException('Folder not found', 404, 'E_NOTFOUND_FAILURE')
      }

      const knowledgebase = await this.prisma.knowLedgeBase.findUnique({
        where: { id: folder.knowLedgeBaseId },
      })
      if (!knowledgebase) {
        return new BotException('Knowledgebase not found', 404, 'E_NOTFOUND_FAILURE')
      }
      const botFolder = await this.prisma.botFolder.create({
        data: {
          bot: {
            connect: { id: payload.botId },
          },
          kbFolder: {
            connect: { id: folder.id },
          },
          knowledgebase: {
            connect: { id: knowledgebase.id },
          },
        },
      })
      return botFolder
    } catch (error) {
      console.error(error)
      return error
    }
  }

  public async DeleteAllBotFoldersByBot(botId: string): Promise<any | Error> {
    try {
      return await this.prisma.BotFolder.deleteMany({
        where: { botId: botId },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  }
}
