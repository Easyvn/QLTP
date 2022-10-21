import { MapperModule } from "../../../di/mapper.module";
import { EvidenceType } from "../../../domain/models/evidences.model";
import { Status } from "../../../domain/models/status.model";
import { EvidenceTypeRepository } from "../../../domain/repositories/evidences.repository";
import { StateCallback } from "../../../domain/utils/state.callback.utils";
import { evidencesType } from "../../source/remote.api";
import { remoteSource } from "../../source/remote.source";

export class EvidenceTypeRepositoryImpl implements EvidenceTypeRepository {
    private mapper = MapperModule.getInstance().provideEvidenceTypeMapper();

    async getAll(callback: StateCallback<EvidenceType[], Status>) {
        const response = await remoteSource.get(evidencesType);

        if (response.data) {            
            callback.onSuccess(
                this.mapper.toDomains(response.data)
            );
            return
        }
        callback.onFailure(response.status.code, response.status);
    }

    async create(model: EvidenceType, callback: StateCallback<EvidenceType, Status>) {
        const request = this.mapper.fromDomain(model);
        const response = await remoteSource.post(evidencesType, request);
        if (response.data) {
            callback.onSuccess(this.mapper.toDomain(response.data));
            return
        }
        callback.onFailure(response.status.code, response.status);
    }

    async update(model: EvidenceType, callback: StateCallback<boolean, Status>) {
        const request = this.mapper.fromDomain(model);
        const response = await remoteSource.put(evidencesType, request);
        if (response.data) {
            callback.onSuccess(true);
            return
        }
        callback.onFailure(response.status.code, response.status);
    }

    async delete(model: EvidenceType, callback: StateCallback<boolean, Status>) {
        const response = await remoteSource.delete(evidencesType, {
            id: model.id
        });
        if (response.data) {
            callback.onSuccess(true);
            return
        }
        callback.onFailure(response.status.code, response.status);
    }
}