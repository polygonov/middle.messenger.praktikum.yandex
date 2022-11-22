import LoginPage from './pages/login';
import { renderDOM } from './utils/renderDOM';

document.addEventListener('DOMContentLoaded', () => {
    const loginPage = new LoginPage();
    renderDOM('#app', loginPage);
});
