import { MapperModule } from "../../../di/mapper.module";
import { EvidenceResultType } from "../../../domain/models/evidences.model";
import { Status } from "../../../domain/models/status.model";
import { EvidenceResultTypeRepository } from "../../../domain/repositories/evidences.repository";
import { StateCallback } from "../../../domain/utils/state.callback.utils";
import { evidencesResultType } from "../../source/remote.api";
import { remoteSource } from "../../source/remote.source";

export class EvidenceResultTypeRepositoryImpl implements EvidenceResultTypeRepository {
    private mapper = MapperModule.getInstance().provideEvidenceResultType()

    async getAll(callback: StateCallback<EvidenceResultType[], Status>) {
        const response = await remoteSource.get(evidencesResultType);

        if (response.data) {
            callback.onSuccess(
                this.mapper.toDomains(response.data)
            );
            return
        }
        callback.onFailure(response.status.code, response.status);
    }

    async create(model: EvidenceResultType, callback: StateCallback<EvidenceResultType, Status>) {
        const request = this.mapper.fromDomain(model);
        const response = await remoteSource.post(evidencesResultType, request);
        if (response.data) {
            callback.onSuccess(this.mapper.toDomain(response.data));
            return
        }
        callback.onFailure(response.status.code, response.status);
    }

    async update(model: EvidenceResultType, callback: StateCallback<boolean, Status>) {
        const request = this.mapper.fromDomain(model);
        const response = await remoteSource.put(evidencesResultType, request);
        if (response.data) {
            callback.onSuccess(true);
            return
        }
        callback.onFailure(response.status.code, response.status);
    }

    async delete(model: EvidenceResultType, callback: StateCallback<boolean, Status>) {
        const response = await remoteSource.delete(evidencesResultType, {
            id: model.id
        });
        if (response.data) {
            callback.onSuccess(true);
            return
        }
        callback.onFailure(response.status.code, response.status);
    }

}