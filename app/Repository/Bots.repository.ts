import { PrismaClient } from '@prisma/client'
import BotException from 'App/Exceptions/BotException'

export default class BotRepository {
  private static instance: PrismaClient
  private prisma
  constructor() {
    this.prisma = this.getInstance()
  }
  public getInstance(): PrismaClient {
    if (!BotRepository.instance) {
      BotRepository.instance = new PrismaClient()
    }
    return BotRepository.instance
  }
  public async CreateBot(payload: any, user): Promise<any | Error> {
    try {
      const bot = await this.prisma.Bot.create({
        data: {
          name: payload.name,
          description: payload.description,
          iconImg: payload.iconImg,
          creativePrecision: payload.creativePrecision || 2,
          prompt: payload.prompt || null,
          assistantId: payload.assistantId || null,
          tags: payload.tags ? payload.tags.split(',').map((tag) => tag.trim()) : [],
          institution: {
            connect: { id: user.institutionId },
          },
          unity: payload.unityId
            ? {
                connect: { id: 'affde197-5322-419c-a9de-370688badf94' },
              }
            : undefined,
          user: {
            connect: { id: user.id },
          },
          knowLedgeBase: payload.knowLedgeBaseId
            ? {
                connect: { id: payload.knowLedgeBaseId },
              }
            : undefined,
        },
      })

      return bot
    } catch (error) {
      console.error(error)
      return error
    }
  }

  public async GetBotById(id: string) {
    try {
      const bot = await this.prisma.Bot.findUnique({
        where: {
          id: id,
        },
        include: {
          BotFolder: {
            include: {
              kbFolder: true,
            },
          },
          botGenAI: {
            where: {
              isDefault: true,
            },
            include: {
              genAIModel: true,
              genAI: true,
            },
          },
        },
      })

      return bot
    } catch (error) {
      return error
    }
  }

  public async listBotsByCreator(userId: string) {
    try {
      const bot = await this.prisma.Bot.findMany({
        where: {
          creatorId: userId,
        },
      })
      if (!bot) {
        return new BotException('Bot not found', 404, 'E_NOTFOUND_FAILURE')
      }
      return bot
    } catch (error) {
      return error
    }
  }

  public async listBots(institutionId: string) {
    try {
      const bot = await this.prisma.Bot.findMany({
        where: {
          institutionId: institutionId,
        },
      })
      if (!bot) {
        return new BotException('Bot not found', 404, 'E_NOTFOUND_FAILURE')
      }
      return bot
    } catch (error) {
      return error
    }
  }

  public async UpdateBot(payload: any) {
    try {
      const updateData = {}

      if (payload.name) updateData['name'] = payload.name
      if (payload.description) updateData['description'] = payload.description
      if (payload.iconImg) updateData['iconImg'] = payload.iconImg
      if (payload.creativePrecision) updateData['creativePrecision'] = payload.creativePrecision
      if (payload.prompt) updateData['prompt'] = payload.prompt
      if (payload.tags) updateData['tags'] = payload.tags.split(',').map((tag) => tag.trim())

      return await this.prisma.Bot.update({
        where: {
          id: payload.params.id,
        },
        data: updateData,
      })
    } catch (error) {
      return new BotException(error, 500, 'E_DATABASE_FAILURE')
    }
  }

  public async DeleteBot(id: string) {
    try {
      return await this.prisma.Bot.delete({
        where: {
          id: id,
        },
      })
    } catch (error) {
      return error
    }
  }
}
