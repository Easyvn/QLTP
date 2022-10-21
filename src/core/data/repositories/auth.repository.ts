import { LLOG } from "core/domain/utils/log.utils";
import { Status } from "../../domain/models/status.model";
import User from "../../domain/models/user.model";
import userModel from "../../domain/models/user.model";
import { AuthenticationRepository } from "../../domain/repositories/authentication.repository";
import { StateCallback } from "../../domain/utils/state.callback.utils";
import { UserEntity } from "../entities/user.entity";
import { TokenEntity } from "../entities/user/token.entity";
import { localSource } from "../source/local.source";
import { changeUserPassword, login, register } from "../source/remote.api";
import { remoteSource } from "../source/remote.source";

export class AuthRepositoryImpl implements AuthenticationRepository {
 
    async login(userName: string, password: string, callback: StateCallback<boolean, Status>) {
        const request = {
            username: userName,
            password: password,
        }
        const response = await remoteSource.post(login, request);

        console.log('response', response);

        if (response.data) {
            LLOG.d("LOGIN SUCCESS ",response.data)
            localSource.saveToken(
                new TokenEntity(response.data.tokenId, response.data.refreshToken)
            );

            const userEntity = new UserEntity(response.data.username);
            userEntity.partner = response.data.partner;
            localSource.saveUserInfo(
                userEntity
            );

            callback.onSuccess(true)
        } else {
            LLOG.d("LOGIN FAILURE ",JSON.stringify(response.status))
            callback.onFailure(response.status.code, response.status)
        }
    }

    async signUp(userName: string, email: string, password: string, callback: StateCallback<boolean, Status>) {
        const userEntity = new UserEntity(userName, email, password, userName);
        // console.log(userEntity.birthday);

        const response = await remoteSource.post(register, userEntity);


        if (response.data) {
            callback.onSuccess(true);
            return
        }
        callback.onFailure(response.status.code, response.status)

    }

    forgotPassword(email: string) {
    }

    async changeUserPassword(username: string, password: string, callback: StateCallback<boolean, Status>) {
        const response = await remoteSource.post(changeUserPassword,{
            username,password
        });
        if (response.data) {
            callback.onSuccess(true);
            return
        }
        callback.onFailure(response.status.code, response.status)
    }

    getUserInfo(): String {
       const user = localSource.getUserInfo() as UserEntity
       return user.username
    }

}