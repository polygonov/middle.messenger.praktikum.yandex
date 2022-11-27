// import LoginPage from './pages/login';
// import RegistrationPage from './pages/registration';
// import MainPage from './pages/main';
// import ProfilePage from './pages/profile';
// import ChangePasswordPage from './pages/change-password';
// import ChangeProfilePage from './pages/change-profile';
// import Page404Page from './pages/page404';
import Page500Page from './pages/page500';
import { renderDOM } from './utils/renderDOM';

document.addEventListener('DOMContentLoaded', () => {
    // const loginPage = new LoginPage();
    // renderDOM('#app', loginPage);
    // const registrationPage = new RegistrationPage();
    // renderDOM('#app', registrationPage);
    // const mainPage = new MainPage();
    // renderDOM('#app', mainPage);
    // const profilePage = new ProfilePage();
    // renderDOM('#app', profilePage);
    // const сhangePasswordPage = new ChangePasswordPage();
    // renderDOM('#app', сhangePasswordPage);
    // const сhangeProfilePage = new ChangeProfilePage();
    // renderDOM('#app', сhangeProfilePage);
    // const page404Page = new Page404Page();
    // renderDOM('#app', page404Page);
    const page500Page = new Page500Page();
    renderDOM('#app', page500Page);
});
