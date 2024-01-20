export default class LoginOutput {
  user: {
    id: string
    name: string
    email: string
    institutionId: string
    token: string
  }

  constructor(payload: any) {
    this.user = {
      id: payload.user.id,
      name: payload.user.name,
      email: payload.user.email,
      institutionId: payload.user.institutionId,
      token: `Bearer ${payload.token}`
    }
  }
}
