import { Button } from './components/button/button';
import { renderDOM } from './utils/renderDOM';

document.addEventListener('DOMContentLoaded', () => {
    const button = new Button({ 
        label: 'Click me',
        events: {
            click: () => console.log('Clicked'),
        }
    });
    renderDOM('#app', button);
    setTimeout(() => {
        button.setProps({
            label: 'Click me please',
            events: {
                click: () => console.log('New clicked'),
            }
        });
    }, 3000);
});
