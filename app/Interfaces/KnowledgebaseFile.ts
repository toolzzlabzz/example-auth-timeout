import { KnowledgebaseFile as IKnowledgebaseFile } from '@prisma/client'

export interface ICreateKnowledgebaseFile {
  fileName: string
  internalStorageUrl: string
  url: string
  maskName: string
  folderId: string
}

export interface IDeleteKnowledgebaseFile {
  id: string
}

export interface IShowKnowledgebaseFile {
  params: {
    id: string
  }
}

export interface IUpdateKnowledgebaseFile {
  id: string
  maskName?: string
}

export interface IIndexByKnowledgebase {
  params: {
    knowledgebaseId: string
  }
}

export interface IIndexByFolder {
  params: {
    folderId: string
  }
}

export { IKnowledgebaseFile }
