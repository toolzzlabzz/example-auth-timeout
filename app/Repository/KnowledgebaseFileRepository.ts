import { PrismaClient } from '@prisma/client'
export default class KnowledgebaseFileRepository {
  private static instance: PrismaClient
  private prisma

  constructor() {
    this.prisma = this.getInstance()
  }

  public getInstance(): PrismaClient {
    if (!KnowledgebaseFileRepository.instance) {
      KnowledgebaseFileRepository.instance = new PrismaClient()
    }
    return KnowledgebaseFileRepository.instance
  }

  public async CreateKnowledgebaseFile(payload: any) {
    try {
      return await this.prisma.KnowledgebaseFile.create({
        data: {
          fileName: payload.fileName,
          internalStorageUrl: payload.internalStorageUrl,
          url: payload.url,
          maskName: payload.maskName,
          kbFolderId: payload.folderId,
          institutionId: payload.institutionId,
          knowLedgeBaseId: payload.knowLedgeBaseId,
        },
      })
    } catch (error) {
      return error
    }
  }

  public async GetKnowledgebaseFileById(id: string) {
    try {
      const knowledgeFile = await this.prisma.KnowledgebaseFile.findUnique({
        where: {
          id: id,
        },
      })

      return knowledgeFile
    } catch (error) {
      return new Error(error)
    }
  }

  public async IndexByKnowledgebase(knowLedgeBaseId) {
    try {
      const knowledgeFiles = await this.prisma.KnowledgebaseFile.findMany({
        where: {
          knowLedgeBaseId: knowLedgeBaseId,
        },
      })

      return knowledgeFiles
    } catch (error) {
      return error
    }
  }

  public async IndexByFolder(folderId) {
    try {
      const knowledgeFiles = await this.prisma.KnowledgebaseFile.findMany({
        where: {
          kbFolderId: folderId,
        },
      })

      return knowledgeFiles
    } catch (error) {
      return error
    }
  }

  public async UpdateKnowledgebaseFile(payload: any) {
    try {
      return await this.prisma.KnowledgebaseFile.update({
        where: {
          id: payload.id,
        },
        data: {
          maskName: payload.maskName,
        },
      })
    } catch (error) {
      return error
    }
  }

  public async DeleteKnowledgebaseFile(id: string) {
    try {
      return await this.prisma.KnowledgebaseFile.delete({
        where: {
          id: id,
        },
      })
    } catch (error) {
      return error
    }
  }
}
