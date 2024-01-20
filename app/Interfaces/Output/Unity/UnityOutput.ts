import { unity } from '@prisma/client'

export default class UnityOutput {
  id: string
  institutionId: string
  name: string
  isRoot: boolean
  constructor(unity: unity) {
    this.id = unity.id
    this.institutionId = unity.institutionId
  }
}
