import { AuthAPI } from '../api/AuthAPI';
import { SigninData } from '../types/SigninData';
import { SignupData } from '../types/SignupData';
import { router } from '../utils/Router';
import { Routes } from '../utils/Routes';
import { store } from '../utils/Store';

export class AuthController {
    private readonly api: AuthAPI = new AuthAPI();

    async signin(data: SigninData) {
        try {
            await this.api.signin(data);

            router.go(Routes.Messenger);
        } catch (e: any) {
            console.error(e);
        }
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data);

            await this.fetchUser();

            router.go(Routes.Messenger);
        } catch (e: any) {
            console.error(e.message);
        }
    }

    async fetchUser() {
        const user = await this.api.read();

        store.set('user', user);
    }

    async logout() {
        try {
            await this.api.logout();

            router.go(Routes.Index);
        } catch (e: any) {
            console.error(e.message);
        }
    }
}

export const authController = new AuthController();
