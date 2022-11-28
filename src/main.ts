import { MainPage } from './pages/main';
import { renderDOM } from './utils/renderDOM';

document.addEventListener('DOMContentLoaded', () => {
    const mainPage = new MainPage();
    renderDOM('#app', mainPage);
});
