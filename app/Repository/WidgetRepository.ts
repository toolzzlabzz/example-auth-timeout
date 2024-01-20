// Caminho completo: app/Repository/WidgetRepository.ts

import { PrismaClient } from '@prisma/client'

export default class WidgetRepository {
  private static instance: PrismaClient
  private prisma: PrismaClient

  constructor() {
    this.prisma = this.getInstance()
  }

  public getInstance(): PrismaClient {
    if (!WidgetRepository.instance) {
      WidgetRepository.instance = new PrismaClient()
    }
    return WidgetRepository.instance
  }

  public async createWidget(payload: any) {
    try {
      console.log(payload)

      return await this.prisma.Widget.create({
        data: payload,
      })
    } catch (error) {
      return new Error('Error creating Widget: ' + error.message)
    }
  }

  public async getWidgetById(id: string) {
    try {
      return await this.prisma.Widget.findUnique({
        where: { id },
      })
    } catch (error) {
      return new Error('Error retrieving Widget: ' + error.message)
    }
  }
  public async getWidgetsByBot(botId) {
    try {
      return await this.prisma.Widget.findMany({
        where: {
          botId,
        },
      })
    } catch (error) {
      return new Error('Error retrieving Widgets: ' + error.message)
    }
  }
  public async getAllWidgets() {
    try {
      return await this.prisma.Widget.findMany()
    } catch (error) {
      return new Error('Error retrieving Widgets: ' + error.message)
    }
  }

  public async updateWidget(id: string, payload: any) {
    try {
      return await this.prisma.Widget.update({
        where: { id },
        data: payload,
      })
    } catch (error) {
      return new Error('Error updating Widget: ' + error.message)
    }
  }

  public async deleteWidget(id: string) {
    try {
      return await this.prisma.Widget.delete({
        where: { id },
      })
    } catch (error) {
      return new Error('Error deleting Widget: ' + error.message)
    }
  }
}
