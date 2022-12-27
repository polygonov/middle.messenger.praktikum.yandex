import { UserAPI } from '../api/UserApi';
import { NewPassword } from '../types/NewPassword';
import { Profile } from '../types/Profile';
import { authController } from './AuthController';

export class UserController {
    private readonly api: UserAPI = new UserAPI();

    async updateProfile(data: Profile) {
        await this.api.update(data);
        await authController.fetchUser();
    }

    async changePassword(data: NewPassword) {
        await this.api.changePassword(data);
        await authController.logout();
    }

    async changeAvatar(data: FormData) {
        await this.api.changeAvatar(data);
        await authController.fetchUser();
    }

    async searchUser(login: string) {
        return await this.api.searchUser(login);
    }
}

export const userController = new UserController();
