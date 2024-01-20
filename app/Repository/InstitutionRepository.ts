import { PrismaClient, institution as Institution } from '@prisma/client'

export default class InstitutionRepository {
  private static instance: PrismaClient
  private prisma

  /**
   * Initializes a new instance of the class.
   *
   * @constructor
   */
  constructor() {
    this.prisma = this.getInstance()
  }

  /**
   * Returns an instance of the PrismaClient.
   *
   * @return {PrismaClient} An instance of the PrismaClient.
   */
  public getInstance(): PrismaClient {
    if (!InstitutionRepository.instance) {
      InstitutionRepository.instance = new PrismaClient()
    }
    return InstitutionRepository.instance
  }
  /**
   * Creates a new institution with the given payload.
   *
   * @param {any} payload - The payload containing the information for the new institution.
   * @return {Promise<any>} - A promise that resolves to the newly created institution.
   */
  public async createInstitution(payload: any) {
    try {
      const existingInstitution = await this.prisma.institution.findUnique({
        where: {
          subdomain: payload.subdomain,
        },
      })
      if (existingInstitution) {
        return existingInstitution
      }

      const institution = {
        aiDefaultModel: 'gpt-4',
        institutionToolzzId: payload.id,
        chatStyle: payload.style.buttonStyle,
        primaryColorHex: payload.style.primaryColorHex,
        secondaryColorHex: payload.style.secondaryColorHex,
        lightModeLogoUrl: payload.style.lightModeLogoUrl,
        darkModeLogoUrl: payload.style.darkModeLogoUrl,
        faviconUrl: payload.style.faviconUrl,
        theme: payload.style.theme,
        subdomain: payload.subdomain,
        customDomain: null,
        apiConversationUrl: null,
      }

      const newInstitution = await this.prisma.institution.create({
        data: institution,
      })

      return newInstitution
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  /**
   * Retrieves an institution based on the provided subdomain.
   *
   * @param {string} subdomain - The subdomain of the institution.
   * @return {Promise<Institution>} The institution object.
   */
  public async getInstitutionBySubdomain(subdomain: string) {
    try {
      const institution = await this.prisma.institution.findUnique({
        where: {
          subdomain: subdomain,
        },
      })
      return institution
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  /**
   * Busca uma instituição pelo ID.
   *
   * @param {string} id - O ID da instituição.
   * @return {Promise<Institution | null>} A instituição encontrada ou null se nenhuma instituição foi encontrada.
   * @throws {Error} Se ocorrer um erro ao buscar a instituição.
   */
  public async getInstitutionById(id: string): Promise<Institution | null> {
    try {
      const institution = await this.prisma.institution.findUnique({
        where: { id },
      })
      if (!institution) {
        return null
      }

      return institution
    } catch (error) {
      console.error('Error fetching institution:', error)
      throw new Error('Error fetching institution')
    }
  }
}
