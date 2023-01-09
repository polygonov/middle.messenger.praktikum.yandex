import { SigninData } from '../types/SigninData';
import { SignupData } from '../types/SignupData';
import { User } from '../types/User';
import { BaseAPI } from './BaseAPI';

export class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signin(data: SigninData) {
        return this.http.post('/signin', data);
    }

    signup(data: SignupData) {
        return this.http.post('/signup', data);
    }

    read(): Promise<User> {
        return this.http.get('/user');
    }

    logout() {
        return this.http.post('/logout');
    }

    create = undefined;
    update = undefined;
    delete = undefined;
}
