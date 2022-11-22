// import LoginPage from './pages/login';
import MainPage from './pages/main';
import { renderDOM } from './utils/renderDOM';

document.addEventListener('DOMContentLoaded', () => {
    // const loginPage = new LoginPage();
    // renderDOM('#app', loginPage);
    const mainPage = new MainPage();
    renderDOM('#app', mainPage);
});
