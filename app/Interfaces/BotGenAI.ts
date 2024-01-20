import { Bot as IBot } from '@prisma/client'

export interface ICreateBotGenAI {
  botId: string
  genAIId: string
  genAIKey: string
  genAIOrganization: string
  isDefault: boolean
  genAIModelId: string
}

export interface IShowBot {
  params: {
    id: string
  }
}

export interface IUpdateBot {
  id: string
  name: string
}

export interface IDeleteBot {
  params: {
    id: string
  }
}

export interface IDuplicateBot {
  params: {
    id: string
  }
}

export { IBot }
