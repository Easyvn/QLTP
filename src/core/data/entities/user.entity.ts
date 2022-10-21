import { IEntity } from "../../domain/models/entity.model";


export class UserEntity implements IEntity {
    username: string
    code: string;
    password: string
    name: string;
    partner: boolean;
    region: number;
    email: string;
    phonenumber: string;
    birthday: string;
    gender: string
    nationality: string
    address: string;
    job: string;
    notes: string;

    constructor(
        username: string,
        email: string = "",
        password: string = "",
        name: string = "",
        code: string = "",
        partner: boolean = false,
        region: number = 0,
        phonenumber: string = "",
        birthday: string = String(new Date()),
        gender: string = "",
        nationality: string = "",
        address: string = "",
        job: string = "",
        notes: string = "",
    ) {
        this.username = username
        this.code = code;
        this.password = password
        this.name = name
        this.partner = partner
        this.region = region
        this.email = email
        this.phonenumber = phonenumber;
        this.birthday = birthday
        this.gender = gender
        this.nationality = nationality
        this.address = address
        this.job = job
        this.notes = notes
    }
}