import { MapperModule } from "../../di/mapper.module";
import { Case } from "../../domain/models/case.model";
import { Status } from "../../domain/models/status.model";
import { CaseRepository } from "../../domain/repositories/cases.reposioty";
import { StateCallback } from "../../domain/utils/state.callback.utils";
import { CasesMapper } from "../mappers/cases.mapper";
import { cases } from "../source/remote.api";
import { remoteSource } from "../source/remote.source";


export class CaseRepositoryImpl implements CaseRepository {
    private mapper: CasesMapper = MapperModule.getInstance().provideCaseMapper()

    async getAll(callback: StateCallback<Case[], Status>) {
        const response = await remoteSource.get(cases);
        if (response.data) {
            callback.onSuccess(
                this.mapper.toDomains(response.data)
            )
            return;
        }
        callback.onFailure(response.status.code, response.status);
    }
    async create(model: Case, callback: StateCallback<Case, Status>) {
        console.log(this.mapper.fromDomain(model));

        const entity = this.mapper.fromDomain(model);
        const response = await remoteSource.post(cases,
            entity
        );
        if (response.data) {
            callback.onSuccess(
                this.mapper.toDomain(response.data)
            )
            return;
        }
        callback.onFailure(response.status.code, response.status);
    }
    async update(model: Case, callback: StateCallback<boolean, Status>) {
        const response = await remoteSource.put(cases + "/" + model.caseId,
            this.mapper.fromDomain(model)
        );
        if (response.data) {
            callback.onSuccess(
                true
            )
            return;
        }
        callback.onFailure(response.status.code, response.status);
    }
    async delete(model: Case, callback: StateCallback<boolean, Status>) {
        const response = await remoteSource.delete(cases + "/" + model.caseId,
            {
                id: model.caseId
            });
        if (response.data) {
            console.log("Delete case", response.data);

            callback.onSuccess(
                true
            )
            return;
        }
        callback.onFailure(response.status.code, response.status);
    }
}