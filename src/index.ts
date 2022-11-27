import LoginPage from './pages/login';
import { httpFetch } from './utils/HTTPTransport';
import { renderDOM } from './utils/renderDOM';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
    const loginPage = new LoginPage();
    renderDOM('#app', loginPage);
});

const testURL = 'https://jsonplaceholder.typicode.com/users';
httpFetch(testURL, {}).then((result: XMLHttpRequest) => {
    console.log(JSON.parse(result.response));
});
