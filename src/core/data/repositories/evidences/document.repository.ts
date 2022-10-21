import { LLOG } from "core/domain/utils/log.utils";
import { MapperModule } from "../../../di/mapper.module";
import { EvidenceDocument } from "../../../domain/models/evidences.model";
import { Status } from "../../../domain/models/status.model";
import { EvidenceDocumentRepository } from "../../../domain/repositories/evidences.repository";
import { StateCallback } from "../../../domain/utils/state.callback.utils";
import { documentsByEvidence, evidencesDocument } from "../../source/remote.api";
import { remoteSource } from "../../source/remote.source";


export class EvidenceDocumentRepositoryImpl implements EvidenceDocumentRepository {
    async uploadFile(model: EvidenceDocument, fileList: File[], formData: any, onProgress: (progress: number) => any, callback: StateCallback<EvidenceDocument, Status>) {
        formData.append("path", fileList[0], model.fileName);
        formData.append("evidence_id", model.evidenceId);
        formData.append("notes", model.notes);

        LLOG.d(JSON.stringify(model));
        const onUploadProgress = (evt: ProgressEvent) => {
            onProgress(Math.round((100 * evt.loaded) / evt.total))
        }

        const response = await remoteSource.uploadFile(evidencesDocument, formData, onUploadProgress);

        if (response.data) {
            callback.onSuccess(
                this.mapper.toDomain(response.data)
            );
            return
        }
        callback.onFailure(response.status.code, response.status);


    }
    create(model: EvidenceDocument, callback: StateCallback<EvidenceDocument, Status>) {
        throw new Error("Method not implemented.");
    }
    private mapper = MapperModule.getInstance().provideEvidenceDocumentMapper();
    async getAll(callback: StateCallback<EvidenceDocument[], Status>) {
        const response = await remoteSource.get(evidencesDocument);
        if (response.data) {
            callback.onSuccess(
                this.mapper.toDomains(response.data)
            );
            return
        }
        callback.onFailure(response.status.code, response.status);
    }

    async getDocsByEvidence(evidenceId: string, callback: StateCallback<EvidenceDocument[], Status>) {
        const response = await remoteSource.get(documentsByEvidence + "/" + evidenceId);
        if (response.data) {
            callback.onSuccess(
                this.mapper.toDomains(response.data)
            );
            return
        }
        callback.onFailure(response.status.code, response.status);
    }



    async update(model: EvidenceDocument, callback: StateCallback<boolean, Status>) {
        const request = this.mapper.fromDomain(model);
        const response = await remoteSource.put(evidencesDocument, request);
        if (response.data) {
            callback.onSuccess(true);
            return
        }
        callback.onFailure(response.status.code, response.status);
    }
    async delete(model: EvidenceDocument, callback: StateCallback<boolean, Status>) {
        const response = await remoteSource.delete(evidencesDocument + "/" + model.id, {});
        if (response.data) {
            callback.onSuccess(true);
            return
        }
        callback.onFailure(response.status.code, response.status);
    }

}