import {BaseClient} from "./BaseClient";
import {IAuth, ISqueezeLink, IUser} from "../types/TypesShortLink";


export class ShortLinkClient extends BaseClient {

    static async signUp (username: string,  password: string) {
        let params = {
            username,
            password
        }
        return this.post<IUser>(`register`, null, { params })
    };
    static async auth (username: string,  password: string) {
        let body = "username=" + username + "&password=" + password
        let options = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        }
        return this.post<IAuth>(`login`, body, options)
    };
    static async squeezeLink (link: string) {
        let params = {
            link
        }
        return this.post<ISqueezeLink>(`squeeze`, null, {params})
    };
    static async statistic (offset: number, order: Array<string>) {
        let params
        if (order.length > 0) {
            params = {
                order: order.toString(),
                offset,
                limit: 10
            }
        } else {
            params = {
                offset,
                limit: 10
            }
        }
        return this.get<Array<ISqueezeLink>>('statistics', {params})
    };
    static async redirect (key: string) {
        return this.get(`s/${key}`)
    };
}