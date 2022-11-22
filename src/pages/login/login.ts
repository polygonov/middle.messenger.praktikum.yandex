import Button from '../../components/button';
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
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {});
    }
}
