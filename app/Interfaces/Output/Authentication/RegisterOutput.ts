export default class RegisterOutput {
  id: string
  userUuid: string | null
  name: string
  email: string
  password: string
  rememberMeToken: string | null
  institutionUnity: string | null
  institutionId: string
  token: string

  constructor(payload: any) {
    this.id = payload.id
    this.name = payload.user.name
    this.email = payload.email
    this.password = payload.password
    this.rememberMeToken = payload.rememberMeToken
    this.institutionUnity = payload.institutionUnity
    this.institutionId = payload.institutionId
    this.token = payload.token
  }
}
