export class UserEntity {
    public readonly id: number;
    public name: string;
    public email: string;
    private password: string;
    public userType: string;
    public dateCreate: Date;

    constructor(id: number, name: string, email: string, password: string, userType: string, dateCreate: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.dateCreate = dateCreate;
    }

    public get getPassword(): string {
        return this.password;
    }

}