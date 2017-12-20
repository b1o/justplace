export class UserModel {
    name: string;
    lastName: string;
    email: string;
    phone: string;
    photo: string;
    sessionHistory: Array<any>;

    constructor() {
        this.photo = null;
    }
}