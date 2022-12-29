import { NewPassword } from '../types/NewPassword';
import { Profile } from '../types/Profile';
import { User } from '../types/User';
import { BaseAPI } from './BaseAPI';

export class UserAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    update(data: Profile) {
        return this.http.put('/profile', data);
    }

    changePassword(data: NewPassword) {
        return this.http.put('/password', data);
    }

    changeAvatar(data: FormData) {
        return this.http.put('/profile/avatar', data);
    }

    searchUser(login: string): Promise<User[]> {
        return this.http.post('/search', { login });
    }

    create = undefined;
    delete = undefined;
    read = undefined;
}
