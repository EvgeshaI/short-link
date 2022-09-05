export interface ISqueezeLink {
    id: number,
    short: string,
    target: string,
    counter: number
}
export interface IUser {
    username: string
}

export interface IAuth {
    access_token: string,
    token_type: string
}