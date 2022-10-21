import axios from "axios";
import { LLOG } from "core/domain/utils/log.utils";
import { INVALID_TOKEN, REFRESH_TOKEN_FAILURE, REQUIRE_LOGOUT, UNKNOWN_ERR } from "../../domain/const/error.const";
import { SUCCESS_STATUS } from "../../domain/const/http.status.const";
import { IResponse } from "../../domain/models/response.model";
import { Status } from "../../domain/models/status.model";
import { TokenEntity } from "../entities/user/token.entity";
import { localSource } from "./local.source";
import { refreshToken, rootUrl } from "./remote.api";

type Header = {
    "Content-Type": string,
    tokenid: string | undefined
}

class RemoteSource {
    private static instance?: RemoteSource;
    private constructor() { }
    static getInstance(): RemoteSource {
        if (this.instance == null) {
            this.instance = new RemoteSource()
        }
        return this.instance;
    }

    private api = axios.create({
        baseURL: rootUrl
    })
    private logout() {
        localSource.logout();
        global.logout();
    }

    private headers = {
        // 'User-Agent': 	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
        'Content-Type': 'application/json',
        tokenid: ''
    }

    async refreshToken(): Promise<IResponse<TokenEntity>> {
        let token: TokenEntity | null = localSource.getToken();
        if (!token) new IResponse(null, REFRESH_TOKEN_FAILURE)

        const request = {
            refreshToken: token?.tokenId
        }

        const response = await this.post(refreshToken, request);
        if (!response.data) {
            return response;
        }
        const authData = response.data.data;
        token = TokenEntity.fromObj(authData);

        if (!token) new IResponse(null, REFRESH_TOKEN_FAILURE);

        localSource.saveToken(token!)

        return new IResponse(token!, SUCCESS_STATUS)
    }

    async post(path: string, request: any, isRepost: boolean = false): Promise<IResponse<any>> {
        console.log(JSON.stringify(request));

        const token: TokenEntity | null = localSource.getToken();
        // if (!token) return new IResponse(null, INVALID_TOKEN)
        let tokenId = ""
        if (token)
            tokenId = token.tokenId
        this.headers.tokenid = tokenId


        try {
            const response: any = await this.api(
                {
                    method: 'post',
                    url: path,
                    data: request,
                    headers: this.headers,
                }
            )
            const data = response.data
            console.log(response);

            if (data.code === 103) {
                localSource.logout()
                return new IResponse(null, REQUIRE_LOGOUT);
            }

            if (data.code === 412) {
                localSource.logout()
                return new IResponse(null, REQUIRE_LOGOUT);
                // if (isRepost) {
                //     localSource.logout()
                //     return new IResponse(null, REQUIRE_LOGOUT);
                // }
                // const newTokenResponse = await this.refreshToken();

                // // console.log('hasNewToken', hasNewToken);

                // if (!newTokenResponse.data) {
                //     return newTokenResponse;
                // }

                // return await this.post(path, request, true)
            }
            if (data.code !== 100 && data.code !== 200) {
                return new IResponse(null, new Status(data.code, data.message))
            }

            return new IResponse(data, SUCCESS_STATUS)
        } catch (err) {
            return new IResponse(null, UNKNOWN_ERR)
        }
    }

    async get(path: string, params?: any, isRepost: boolean = false): Promise<IResponse<any>> {
        const token: TokenEntity | null = localSource.getToken();
        if (!token) return new IResponse(null, INVALID_TOKEN)
        this.headers.tokenid = token.tokenId
        try {
            const data: any = await this.api(
                {
                    method: 'get',
                    url: path,
                    params: params ? params : '',
                    headers: this.headers,
                }
            )
            if (data.status === 103) {
                logout()
                return new IResponse(null, REQUIRE_LOGOUT);
            }

            if (data.status === 412) {
                logout()
                return new IResponse(null, REQUIRE_LOGOUT);
                // if (isRepost) {
                //     logout()
                //     return new IResponse(null, REQUIRE_LOGOUT);
                // }
                // const newTokenResponse = await this.refreshToken();

                // // console.log('hasNewToken', hasNewToken);

                // if (!newTokenResponse.data) {
                //     return newTokenResponse;
                // }

                // return await this.get(path, true)
            }
            if (data.status !== 200) {
                return new IResponse(null, UNKNOWN_ERR)
            }
            return new IResponse(data.data.data, SUCCESS_STATUS)
        } catch (err) {
            return new IResponse(null, UNKNOWN_ERR)
        }
    }

    async put(path: string, request: any, isRepost: boolean = false): Promise<IResponse<any>> {
        const token: TokenEntity | null = localSource.getToken();
        // if (!token) return new IResponse(null, INVALID_TOKEN)
        let tokenId = ""
        if (token)
            tokenId = token.tokenId
        this.headers.tokenid = tokenId


        try {
            const response: any = await this.api(
                {
                    method: 'put',
                    url: path,
                    data: request,
                    headers: this.headers,
                }
            )
            const data = response.data;
            if (data.code === 103) {
                logout()
                return new IResponse(null, REQUIRE_LOGOUT);
            }

            if (data.code === 412) {
                logout()
                return new IResponse(null, REQUIRE_LOGOUT);

                // if (isRepost) {
                //     logout()
                //     return new IResponse(null, REQUIRE_LOGOUT);
                // }
                // const newTokenResponse = await this.refreshToken();

                // // console.log('hasNewToken', hasNewToken);

                // if (!newTokenResponse.data) {
                //     return newTokenResponse;
                // }

                // return await this.put(path, request, true)
            }
            if (data.code !== 200) {
                LLOG.d("PUT ERROR: ", JSON.stringify(data));
                return new IResponse(null, UNKNOWN_ERR)
            }
            return new IResponse(data, SUCCESS_STATUS)
        } catch (err) {
            LLOG.d("PUT ERROR: ", JSON.stringify(err));
            return new IResponse(null, UNKNOWN_ERR)
        }
    }

    async delete(path: string, params: any, isRepost: boolean = false): Promise<IResponse<any>> {
        const token: TokenEntity | null = localSource.getToken();
        // if (!token) return new IResponse(null, INVALID_TOKEN)
        let tokenId = ""
        if (token)
            tokenId = token.tokenId
        this.headers.tokenid = tokenId
        console.log(params, path);



        try {
            const response: any = await this.api(
                {
                    method: 'delete',
                    url: path,
                    params: params,
                    headers: this.headers,
                }
            )
            const data = response.data
            if (data.code === 103) {
                logout()
                return new IResponse(null, REQUIRE_LOGOUT);
            }

            if (data.code === 412) {

                if (isRepost) {
                    logout()
                    return new IResponse(null, REQUIRE_LOGOUT);
                }
                const newTokenResponse = await this.refreshToken();

                // console.log('hasNewToken', hasNewToken);

                if (!newTokenResponse.data) {
                    return newTokenResponse;
                }

                return await this.delete(path, params, true)
            }
            if (data.code !== 200) {
                console.log("DELETE_ERR", data);
                return new IResponse(null, UNKNOWN_ERR)
            }
            return new IResponse(data, SUCCESS_STATUS)
        } catch (err) {
            console.log("DELETE_ERR", err);

            return new IResponse(null, UNKNOWN_ERR)
        }
    }

    async uploadFile(path: string, formData: any, onProgress: (progressEvt: ProgressEvent) => void): Promise<IResponse<any>> {
        const token: TokenEntity | null = localSource.getToken();
        // if (!token) return new IResponse(null, INVALID_TOKEN)
        let tokenId = ""
        if (token)
            tokenId = token.tokenId
        const headers = {
            'Content-Type': 'multipart/form-data',
            tokenid: tokenId
        }

        try {
            const response: any = await this.api.post(path, formData, {
                headers: headers,
                onUploadProgress: onProgress
            },)
            const data = response.data
            if (data.code === 103) {
                logout()
                return new IResponse(null, REQUIRE_LOGOUT);
            }

            if (data.code === 412) {
                localSource.logout()
                return new IResponse(null, REQUIRE_LOGOUT);
            }
            if (data.code !== 100 && data.code !== 200) {
                LLOG.d('Upload err', JSON.stringify(data));
                return new IResponse(null, new Status(-1, data.message))
            }
            return new IResponse(data, SUCCESS_STATUS)
        } catch (err) {
            LLOG.d('Upload err', err);
            return new IResponse(null, UNKNOWN_ERR)
        }
    }
}

const source = RemoteSource.getInstance()


export {
    source as remoteSource,
    RemoteSource
}