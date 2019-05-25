export interface IUser {
  id: number
  login: string
  avatarUrl: string
}

export class User implements IUser {
  public id: number
  public login: string
  public avatarUrl: string

  constructor(props: any = {}) {
    this.id = +props.id || -1
    this.login = props.login || ''
    this.avatarUrl = props.avatarUrl || ''
  }
}
