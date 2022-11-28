import { Page404Page } from './pages/page404';
import { renderDOM } from './utils/renderDOM';

document.addEventListener('DOMContentLoaded', () => {
    const page404Page = new Page404Page();
    renderDOM('#app', page404Page);
});
