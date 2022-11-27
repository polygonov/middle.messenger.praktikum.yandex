import ProfilePage from './pages/profile';
import { renderDOM } from './utils/renderDOM';

document.addEventListener('DOMContentLoaded', () => {
    const profilePage = new ProfilePage();
    renderDOM('#app', profilePage);
});
