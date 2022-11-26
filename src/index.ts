// import LoginPage from './pages/login';
// import RegistrationPage from './pages/registration';
// import MainPage from './pages/main';
import ProfilePage from './pages/profile';
import { renderDOM } from './utils/renderDOM';

document.addEventListener('DOMContentLoaded', () => {
    // const loginPage = new LoginPage();
    // renderDOM('#app', loginPage);
    // const registrationPage = new RegistrationPage();
    // renderDOM('#app', registrationPage);
    // const mainPage = new MainPage();
    // renderDOM('#app', mainPage);
    const profilePage = new ProfilePage();
    renderDOM('#app', profilePage);
});
