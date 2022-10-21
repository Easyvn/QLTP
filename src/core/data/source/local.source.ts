import { Status } from "../../domain/models/status.model";
import { StateCallback } from "../../domain/utils/state.callback.utils";
import { TokenEntity } from "../entities/user/token.entity";

const USER_INFO = "USER_INFO"
const TOKEN_INFO = "TOKEN_INFO"
class LocalSource {
    private static instance: LocalSource;

    private constructor() { }

    public static getInstance(): LocalSource {
        if (LocalSource.instance == null)
            LocalSource.instance = new LocalSource()
        return LocalSource.instance;
    }


    public saveUserInfo(user: any) {
        localStorage.setItem(USER_INFO, JSON.stringify(user));
    }

    public getUserInfo(): any | null {
        const user = localStorage.getItem(USER_INFO);
        if (!user) {
            return null
        }
        return JSON.parse(user);
    }

    public logout() {
        localStorage.removeItem(USER_INFO);
        localStorage.removeItem(TOKEN_INFO);
    }

    public saveToken(token: TokenEntity) {
        if (token.tokenId && token.tokenId)
            localStorage.setItem(TOKEN_INFO, JSON.stringify(token));
    }
    public getToken(): TokenEntity | null {
        const token = localStorage.getItem(TOKEN_INFO);
        if (!token) {
            return null
        }
        return JSON.parse(token)
    }


}

const source = LocalSource.getInstance()


export {
    source as localSource,
    LocalSource
}