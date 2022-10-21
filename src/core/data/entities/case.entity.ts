import { IEntity } from "../../domain/models/entity.model";
import { ResultEntity } from "./result.entitity";

export class CaseEntity implements IEntity {
    id: string;
    name: string;
    prosecution_date: string;
    prosecution_number: string;
    result_id?: string;
    handler: string;
    profile_number: string;
    is_submit_profile: boolean
    notes: string

    constructor(
        id: string,
        name: string,
        prosecution_date: string,
        prosecution_number: string,
        handler: string,
        profile_number: string,
        is_submit_profile: boolean,
        notes: string,
        result_id?: string,
    ) {
        this.id = id;
        this.name = name;
        this.prosecution_date = prosecution_date
        this.prosecution_number = prosecution_number
        this.result_id = result_id;
        this.handler = handler;
        this.profile_number = profile_number;
        this.is_submit_profile = is_submit_profile;
        this.notes = notes
    }

    static fromObj(obj: any): CaseEntity {
        return new CaseEntity(
            obj.id,
            obj.name,
            obj.prosecution_date,
            obj.prosecution_number,
            obj.result_id,
            obj.handler,
            obj.profile_number,
            obj.is_submit_profile,
            obj.notes
        )
    }
    static fromObjs(objs: any[]): CaseEntity[] {
        return objs.map((ele: any) => CaseEntity.fromObj(ele));
    }
}
