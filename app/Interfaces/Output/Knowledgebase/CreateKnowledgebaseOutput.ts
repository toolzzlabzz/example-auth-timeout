export default class KnowledgeBaseOutput {
    id: string
    title: string
    description: string
    documentCount: number
    wordCount: number
    status: Boolean
    icon: string

    //TODO: Implementar doc count e word count
    constructor(knowledge: any) {
        this.id = knowledge.id
        this.title = knowledge.kbName
        this.description = knowledge.kbDescription
        this.documentCount = 0
        this.wordCount = 0
        this.icon = knowledge.kbIconImg
        this.status = knowledge.kbStatus
    }
}