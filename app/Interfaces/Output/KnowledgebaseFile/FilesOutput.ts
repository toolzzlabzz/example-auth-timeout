export default class FilesOutput {
  constructor(knowledgeFiles: any[]) {
    return knowledgeFiles.map((knowledgeFile) => ({
      id: knowledgeFile.id || null,
      fileName: knowledgeFile.fileName,
      internalStorageUrl: knowledgeFile.internalStorageUrl,
      url: knowledgeFile.url,
      maskName: knowledgeFile.maskName,
      status: 'Aprendido',
      createdAt: '15/12/2023',
      updatedAt: '15/12/2023',
    }))
  }
}
