export default class BotsOutput {
  id?: string
  name: string
  prompt: string
  description: string
  folders: any[]
  botGenAI: any
  assistantId: string

  constructor(bot: any) {
    this.id = bot.id || null
    this.name = bot.name
    this.prompt = bot.prompt
    this.description = bot.description
    this.folders = bot.BotFolder
    this.botGenAI = bot.botGenAI
    this.assistantId = bot.assistantId
  }
}
