import { Bot as IBot } from '@prisma/client'

export interface ICreateBot {
  name: string
  description: string
  iconImg?: string
  creativePrecision?: string
  tags?: string
  unity?: string
  prompt: string
  modelId: string
  genAIKey: string
  genAIOrganization: string
  folder: {
    id: string
    name: string
  }[]
  assistantId?: string
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
  id: string
}

export { IBot }
