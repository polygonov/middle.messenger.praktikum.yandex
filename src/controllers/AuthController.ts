import { AuthAPI } from '../api/AuthAPI';
import store from '../utils/Store';
import { SigninData } from '../types/SigninData';
import { SignupData } from '../types/SignupData';
import { router } from '../utils/Router';

export class AuthController {
    private readonly api: AuthAPI = new AuthAPI();

    async signin(data: SigninData) {
        try {
            await this.api.signin(data);

            router.go('/profile');
        } catch (e: any) {
            console.error(e);
        }
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data);

            await this.fetchUser();

            router.go('/profile');
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

            router.go('/');
        } catch (e: any) {
            console.error(e.message);
        }
    }
}

export default new AuthController();
