import { PrismaClient } from '@prisma/client'
import {
  default as CreateKnowledgebaseException,
  default as KnowledgebaseException,
} from 'App/Exceptions/KnowledgebaseException'
import { IKnowledgeBase } from 'App/Interfaces/knowledgebase'
import { IUser } from 'App/Interfaces/user'
import UnityRepository from './UnityRepository'

export default class KnowledgeBaseRepository {
  private static instance: PrismaClient
  private prisma
  private unityRepository = new UnityRepository()

  /**
   * Initializes the constructor and sets up the Prisma instance in Singleton.
   *
   * @return {void} There is no return value for this function.
   */
  constructor() {
    this.prisma = this.getInstance()
  }

  /**
   * Returns an instance of the PrismaClient.
   *
   * @return {PrismaClient} An instance of the PrismaClient.
   */
  private getInstance(): PrismaClient {
    if (!KnowledgeBaseRepository.instance) {
      KnowledgeBaseRepository.instance = new PrismaClient()
    }
    return KnowledgeBaseRepository.instance
  }

  /**
   * Cria uma nova base de conhecimento.
   *
   * @param {IKnowledgeBase} CreateKnowledgeBasePayload - Os dados da base de conhecimento a ser criada.
   * @param {IUser} user - O usuário que está criando a base de conhecimento.
   * @return {Promise<IKnowledgeBase | Error>} A base de conhecimento criada ou um erro se a criação falhar.
   */
  public async CreateKnowledgeBase(
    payload: any,
    user: IUser,
    kbInstitutionId?
  ): Promise<IKnowledgeBase | Error> {
    try {
      if (
        !(await this.unityRepository.GetUnityById(payload.unityId))
        //|| !(await this.unityRepository.checkIfUserCanDoIt(user, payload.unityId))
      ) {
        throw new CreateKnowledgebaseException(
          'User cannot create knowledge base in this Unity',
          400,
          'E_VALIDATION_FAILURE'
        )
      }

      return await this.prisma.knowLedgeBase.create({
        data: {
          unityId: payload.unityId,
          kbCreatorId: user.id,
          kbInstitutionId: user.institutionId,
          kbStatus: 1,
          kbName: payload.name,
          kbDescription: payload.description,
          kbIconImg: payload.icon || 'https://exemplo.com/imagem.jpg',
        },
      })
    } catch (error) {
      console.error(error)
      return new CreateKnowledgebaseException(
        'Error creating knowledge base',
        500,
        'E_VALIDATION_FAILURE'
      )
    }
  }

  public async DeleteKnowledgeBase(id: string) {
    try {
      return await this.prisma.knowLedgeBase.delete({
        where: {
          id: id,
        },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  }

  public async DuplicateKnowledgeBase(id: number, user: IUser): Promise<IKnowledgeBase | Error> {
    try {
      // Buscar o KnowledgeBase existente e suas relações
      const existingKnowledgeBase = await this.prisma.knowLedgeBase.findUnique({
        where: { id },
        include: {
          /* Inclua aqui as relações que deseja duplicar */
        },
      })

      if (!existingKnowledgeBase) {
        throw new CreateKnowledgebaseException('KnowledgeBase not found', 404, 'E_NOT_FOUND')
      }

      const newKnowledgeBaseData = {
        ...existingKnowledgeBase,
        id: undefined,
        kbCreatorId: user.id,
        kbInstitutionId: user.institutionId,
      }
      const newKnowledgeBase = await this.prisma.knowLedgeBase.create({
        data: newKnowledgeBaseData,
      })
      return newKnowledgeBase
    } catch (error) {
      return new CreateKnowledgebaseException(
        'Error duplicating KnowledgeBase',
        500,
        'E_DATABASE_FAILURE'
      )
    }
  }

  public async listAllKnowledgesByInstitutionId(institutionId: number) {
    try {
      const institution = await this.prisma.institution.findUnique({
        where: {
          id: institutionId,
        },
        include: {
          unity: {
            include: {
              knowLedgeBase: true,
            },
          },
        },
      })
      const allKnowledges = institution?.unity.flatMap((unity) => unity.knowLedgeBase)
      return allKnowledges
    } catch (error) {
      return error
    }
  }

  public async listByUnity(unityId: number) {
    try {
      const allKnowledges = await this.prisma.knowLedgeBase.findMany({
        where: {
          unityId: unityId,
        },
        include: {
          kbFolder: true,
        },
      })

      return allKnowledges
    } catch (error) {
      return error
    }
  }

  public async UpdateKnowledgeBase(payload: any) {
    try {
      const knowledgeBase = await this.prisma.knowLedgeBase.findUnique({
        where: { id: payload.params.id },
      })

      if (!knowledgeBase) {
        throw new KnowledgebaseException('KnowledgeBase not found', 404, 'E_NOT_FOUND')
      }

      return await this.prisma.knowLedgeBase.update({
        where: {
          id: payload.params.id,
        },
        data: {
          kbName: payload.name,
          kbDescription: payload.description,
        },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  }

  /**
   * @TODO CRIAR PARA A V2, NAO INCORPORADO NESTA VERSAO!
   */

  public async GetKnowledgeBaseByUnityId(unityId: number) {
    try {
      const knowLedgeBases = await this.prisma.knowLedgeBase.findMany({
        where: {
          unityId: unityId,
        },
      })

      return knowLedgeBases
    } catch (error) {
      return error
    }
  }

  public async GetKnowledgeBaseById(id: string) {
    try {
      const knowledgeBase = await this.prisma.knowLedgeBase.findFirst({
        where: {
          id: id,
        },
        include: {
          kbFolder: true,
        },
      })
      return knowledgeBase
    } catch (error) {
      return new KnowledgebaseException('KnowledgeBase not found', 404, 'E_NOT_FOUND')
    }
  }
}
