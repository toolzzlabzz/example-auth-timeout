export default class KnowledgebaseFileOutput {
  id?: string
  fileName: string
  internalStorageUrl: string
  url: string
  maskName: string
  folderId: string
  status: string
  createdAt: string
  updatedAt: string

  constructor(knowledgebaseFile: any) {
    console.log('sddssd')

    this.id = knowledgebaseFile.id || null
    this.fileName = knowledgebaseFile.fileName
    this.internalStorageUrl = knowledgebaseFile.internalStorageUrl
    this.url = knowledgebaseFile.url
    this.maskName = knowledgebaseFile.maskName
    this.folderId = knowledgebaseFile.folderId
    this.status = 'Aprendido'
    this.createdAt = '2023-12-15'
    this.updatedAt = '2023-12-15'
  }
}
