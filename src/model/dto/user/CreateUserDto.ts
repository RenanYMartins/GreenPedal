export class CreateUserDto {
    public name: string;
    public email: string;
    public readonly password: string;
    public userType: string;

    constructor(name: string, email: string, password: string, userType: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }

}