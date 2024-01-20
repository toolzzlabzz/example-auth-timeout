import { kbFolder as IKbFolder } from '@prisma/client'
import KbFolderOutput from './Output/KbFolder/KbFolderOutput'

export interface ICreateKbFolder {
  name: string
  knowledgebaseId: string
  institutionId?: string
}

export interface IShowKbFolder {
  params: {
    id: string
  }
}
export interface IIndexKbFolder {
  params: {
    institutionId: string
  }
}
export interface IUpdateKbFolder {
  id: string
  name: string
}
export interface IDeleteKbFolder {
  params: {
    id: string
  }
}

export interface ICreateKbFolderPayload {
  institutionId?: string
  knowledgebaseId: string
  name: string,
  isRoot?: boolean
}

export { IKbFolder, KbFolderOutput }
