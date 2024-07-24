export class ConnectorNotFoundError extends Error {
  constructor() {
    super('wallet not found, please make sure it is installed.')
    this.name = 'ConnectorNotFoundError'
  }
}

export class UserRejectError extends Error {
  static code = 4001

  constructor() {
    super('User rejected the request.')
    this.name = 'UserRejectError'
  }
}
