import { RegistrationPage } from './pages/registration';
import { renderDOM } from './utils/renderDOM';

document.addEventListener('DOMContentLoaded', () => {
    const loginPage = new RegistrationPage();
    renderDOM('#app', loginPage);
});
