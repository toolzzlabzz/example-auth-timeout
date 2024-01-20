import { PrismaClient } from '@prisma/client'
import BotException from 'App/Exceptions/BotException'

export default class BotGenAIRepository {
  private static instance: PrismaClient
  private prisma
  constructor() {
    this.prisma = this.getInstance()
  }
  public getInstance(): PrismaClient {
    if (!BotGenAIRepository.instance) {
      BotGenAIRepository.instance = new PrismaClient()
    }
    return BotGenAIRepository.instance
  }
  public async CreateBotGenAI(payload: any): Promise<any | Error> {
    try {
      const genAIModel = await this.prisma.GenAIModel.findFirst({
        where: { id: payload.genAIModelId },
      })

      if (!genAIModel) {
        return new BotException('Model not found', 404, 'E_NOTFOUND_FAILURE')
      }

      const genAIId = genAIModel.genAIId

      const botGenAI = await this.prisma.BotGenAI.create({
        data: {
          botId: payload.botId,
          assistantId: payload.assistantId,
          genAIId: genAIId,
          genAIKey: payload.genAIKey,
          genAIOrganization: payload.genAIOrganization,
          isDefault: payload.isDefault || true,
          genAIModelId: genAIModel.id,
        },
      })

      return botGenAI
    } catch (error) {
      console.error(error)
      return error
    }
  }

  public async GetByBotId(id: string, isDefault?: boolean) {
    try {
      const whereCondition = {
        botId: id,
      }

      if (isDefault !== undefined) {
        whereCondition['isDefault'] = isDefault
      }
      const genAi = await this.prisma.BotGenAI.findMany({
        where: {
          botId: id,
        },
      })

      if (!genAi) {
        return new Error(genAi)
      }
      return genAi
    } catch (error) {
      return new Error(error)
    }
  }

  public async DeleteBotGenAIByBot(botId: string) {
    try {
      return await this.prisma.BotGenAI.deleteMany({
        where: {
          botId: botId,
        },
      })
    } catch (error) {
      return new BotException(error, 500, 'E_DATABASE_FAILURE')
    }
  }
}
