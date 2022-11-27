import ChangePasswordPage from './pages/change-password';
import { renderDOM } from './utils/renderDOM';

document.addEventListener('DOMContentLoaded', () => {
    const сhangePasswordPage = new ChangePasswordPage();
    renderDOM('#app', сhangePasswordPage);
});
