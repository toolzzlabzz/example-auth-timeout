export default class KbFolderOutput {
  id: string
  institutionId: string
  name: string
  knowLedgeBaseFile: any
  isRoot: boolean
  constructor(kbfolder: any) {
    this.id = kbfolder.id
    this.institutionId = kbfolder.institutionId
    this.name = kbfolder.name
    this.isRoot = kbfolder.isRoot
    this.knowLedgeBaseFile = kbfolder.knowLedgeBaseFile

  }
}
