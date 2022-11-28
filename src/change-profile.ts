import { ChangeProfilePage } from './pages/change-profile';
import { renderDOM } from './utils/renderDOM';

document.addEventListener('DOMContentLoaded', () => {
    const сhangePasswordPage = new ChangeProfilePage();
    renderDOM('#app', сhangePasswordPage);
});
