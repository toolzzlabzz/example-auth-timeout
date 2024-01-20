import { PrismaClient } from '@prisma/client'

export default class FileRepository {
  private static instance: PrismaClient
  private prisma

  constructor() {
    this.prisma = this.getInstance()
  }

  public getInstance(): PrismaClient {
    if (!FileRepository.instance) {
      FileRepository.instance = new PrismaClient()
    }
    return FileRepository.instance
  }

  public async CreateContent(payload: any): Promise<any | Error> {
    try {
      console.log(payload)

      return await this.prisma.knowLedgeBaseFile.create({
        data: {
          folderCreatorId: payload.userId,
          kbInstitutionId: payload.institutionId,
          knowLedgeBaseId: payload.knowledgebaseId,
          kbFolderId: payload.folderId,
          kbFileName: payload.fileName,
          kbFolderDescription: payload.description,
          url: payload.url,
          maskName: payload.maskName,
        },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  }
}
