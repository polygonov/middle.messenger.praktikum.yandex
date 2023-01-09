import { authController } from './controllers/AuthController';
import { chatsController } from './controllers/ChatsController';
import './index.css';
import { ChangePasswordPage } from './pages/change-password';
import { ChangeProfilePage } from './pages/change-profile';
import { LoginPage } from './pages/login';
import { MainPage } from './pages/main';
import { Page404Page } from './pages/page404';
import { Page500Page } from './pages/page500';
import { ProfilePage } from './pages/profile';
import { RegistrationPage } from './pages/registration';
import { Block } from './utils/Block';
import { router } from './utils/Router';
import { Routes } from './utils/Routes';

window.addEventListener('DOMContentLoaded', async() => {
    router
        .use(Routes.Index, LoginPage as unknown as Block<{}>)
        .use(Routes.Registration, RegistrationPage as unknown as Block<{}>)
        .use(Routes.Settings, ProfilePage as unknown as Block<{}>)
        .use(Routes.Messenger, MainPage as unknown as Block<{}>)
        .use(Routes.ChangeProfile, ChangeProfilePage as unknown as Block<{}>)
        .use(Routes.ChangePassword, ChangePasswordPage as unknown as Block<{}>)
        .use(Routes.Error404, Page404Page as unknown as Block<{}>)
        .use(Routes.Error500, Page500Page as unknown as Block<{}>);
    let isProtectedRoute = true;
    switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Registration:
        isProtectedRoute = false;
        break;
    }
    try {
        await authController.fetchUser();
        await chatsController.fetchChats();
        router.start();
        if (!isProtectedRoute) {
            router.go(Routes.Messenger);
        }
    } catch (e) {
        router.start();
        if (isProtectedRoute) {
            router.go(Routes.Index);
        }
        console.log(e);
    }
});
