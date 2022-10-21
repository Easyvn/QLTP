import { MapperModule } from "../../../di/mapper.module";
import { Evidence, EvidenceReport } from "../../../domain/models/evidences.model";
import { Status } from "../../../domain/models/status.model";
import { EvidenceRepository } from "../../../domain/repositories/evidences.repository";
import { StateCallback } from "../../../domain/utils/state.callback.utils";
import { evidences, evidencesByCase, evidencesSearch, evidencesReport } from "../../source/remote.api";
import { remoteSource } from "../../source/remote.source";


export class EvidenceRepositoryImpl implements EvidenceRepository {
    private mapper = MapperModule.getInstance().provideEvidenceMapper();
    private searchMapper = MapperModule.getInstance().provideEvidenceSearchMapper();
    private reportMapper = MapperModule.getInstance().provideEvidenceReportMapper();

    async getAll(callback: StateCallback<Evidence[], Status>) {
        const response = await remoteSource.get(evidences);
        if (response.data) {
            callback.onSuccess(
                this.mapper.toDomains(response.data)
            )
            return;
        }
        callback.onFailure(response.status.code, response.status);
    }

    async create(model: Evidence, callback: StateCallback<Evidence, Status>) {
        const response = await remoteSource.post(evidences,
            this.mapper.fromDomain(model));
        if (response.data) {
            callback.onSuccess(
                this.mapper.toDomain(response.data)
            )
            return;
        }
        callback.onFailure(response.status.code, response.status);
    }

    async update(model: Evidence, callback: StateCallback<boolean, Status>) {
        const response = await remoteSource.put(evidences + "/" + model.id,
            this.mapper.fromDomain(model));
        if (response.data) {
            callback.onSuccess(
                true
            )
            return;
        }
        callback.onFailure(response.status.code, response.status);
    }

    async delete(model: Evidence, callback: StateCallback<boolean, Status>) {
        const response = await remoteSource.delete(evidences + "/" + model.id,
            { id: model.id }
        );
        if (response.data) {
            callback.onSuccess(
                true
            )
            return;
        }
        callback.onFailure(response.status.code, response.status);
    };

    async getAllEvidenceByCase(caseId: string, callback: StateCallback<Evidence[], Status>) {
        const response = await remoteSource.get(evidencesByCase + "/" + caseId,);
        if (response.data) {
            callback.onSuccess(
                this.mapper.toDomains(response.data)
            )
            return;
        }
        callback.onFailure(response.status.code, response.status);
    }

    async getAllEvidenceByKeyword(keyword: string, species: boolean, symbol: boolean, characteristics: boolean, callback: StateCallback<Evidence[], Status>) {

        const params = {
            q: keyword,
            species: species,
            symbol: symbol,
            characteristics: characteristics,
        }

        // console.log('params', params);

        const response = await remoteSource.get(evidencesSearch, params);
        // console.log('response.data Search',response.data);
        // console.log("Before mapper ",response.data[0].tbl_case);
        
        if (response.data) {
            // for (const item of response.data) {
            //     item.caseName = item.tbl_case.name;
            // }
            // console.log('response.data2',this.searchMapper.toDomains(response.data));
            callback.onSuccess(
                this.searchMapper.toDomains(response.data)
            )
            return;
        }
        callback.onFailure(response.status.code, response.status);
    }

    async getReportEvidences(fromDate: string, toDate: string, resutId: string, typeId: string, callback: StateCallback<EvidenceReport[], Status>) {

        const params = {
            fromDate,
            toDate,
            resutId,
            typeId
        }

        // console.log('params', params);

        const response = await remoteSource.get(evidencesReport, params);
        // console.log('response.data Search',response.data);
        // console.log("Before mapper ",response.data[0].tbl_case);
        
        if (response.data) {
            // for (const item of response.data) {
            //     item.caseName = item.tbl_case.name;
            // }
            // console.log('response.data2',this.searchMapper.toDomains(response.data));
            callback.onSuccess(
                this.reportMapper.toDomains(response.data)
            )
            return;
        }
        callback.onFailure(response.status.code, response.status);
    }

}