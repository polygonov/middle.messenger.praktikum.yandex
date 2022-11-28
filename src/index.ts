import { LoginPage } from './pages/login';
import { HTTPTransport } from './utils/HTTPTransport';
import { renderDOM } from './utils/renderDOM';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
    const loginPage = new LoginPage();
    renderDOM('#app', loginPage);
});

const testURL = 'https://jsonplaceholder.typicode.com/users';
const http = new HTTPTransport();
http.get(testURL).then((result: XMLHttpRequest) => {
    console.log('get');
    console.log(JSON.parse(result.response));
});
http.post(testURL, {
    data: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
}).then((result: XMLHttpRequest) => {
    console.log('post');
    console.log(JSON.parse(result.response));
});
