import {
  knowLedgeBase as IKnowledgeBase,
  knowLedgeBaseFile as IKnowledgeBaseFile,
  kbContentLibrary as IkbContentLibrary,
  kbContentSourcesSettings as IkbContentSourcesSettings,
} from '@prisma/client'

export interface ICreateKnowledgeBase {
  name: string
  description: string
  icon: string
  contentSourceId: string
  fileStorageId: string
}

export interface IUpdateKnowledgeBase {
  name: string
  description: string
  icon: string
  contentSourceId: string
  fileStorageId: string
}

export { IKnowledgeBase, IKnowledgeBaseFile, IkbContentLibrary, IkbContentSourcesSettings }
