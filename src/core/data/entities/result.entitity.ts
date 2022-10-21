import { IEntity } from "core/domain/models/entity.model";

export class ResultEntity implements IEntity {
    id: string
    name: string
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}