export class UserModel {
    name: string;
    lastName: string;
    email: string;
    photo: string;
    sessionHistory: Array<any>;

    constructor() {
        this.photo = null;
    }
}