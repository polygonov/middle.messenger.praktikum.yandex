import Button from '../../components/button';
import Input from '../../components/input';
import { Block } from '../../utils/Block';
import template from './login.hbs';

export class LoginPage extends Block {

    protected initChildren(): void {
        this.children.button = new Button({
            label: 'Авторизоваться',
            events: {
                click: () => console.log('clicked')
            }
        });
        this.children.inputLogin = new Input({
            minLength: 3,
            maxLength: 20,
            type: 'text',
            pattern: '(?=.*[A-Za-z])[-_A-Za-z0-9]{3,20}',
            events: {
                click: () => console.log('clicked')
            }
        });        
        this.children.inputPassword = new Input({
            minLength: 8,
            maxLength: 40,
            type: 'password',
            pattern: '(?=.*[A-Z])(?=.*[0-9])[-_A-Za-z0-9]{3,20}',
            events: {
                click: () => console.log('clicked')
            }
        });
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {});
    }
}
