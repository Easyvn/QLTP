import { IEntity } from "../../../domain/models/entity.model";

export class TokenEntity implements IEntity {
    tokenId: string;
    refreshToken: string;

    constructor(access_token: string, refresh_token: string) {
        this.tokenId = access_token;
        this.refreshToken = refresh_token;
    }


    static fromObj(obj: any): TokenEntity | null {
        if (!obj.access_token || obj.refresh_token) {
            return null
        }
        return new TokenEntity(
            obj.access_token,
            obj.refresh_token
        )
    }
}