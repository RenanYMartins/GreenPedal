export class UserDto {
    public readonly id: number;
    public name: string;
    public email: string;
    public password: string;
    public userType: string;

    constructor(id: number, name: string, email: string, password: string, userType: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }

}