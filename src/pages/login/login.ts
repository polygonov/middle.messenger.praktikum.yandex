import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Link } from '../../components/link';
import { Block } from '../../utils/Block';
import { Routes } from '../../utils/Routes';
import { ValidateRules } from '../../utils/validateRules';
import template from './login.hbs';

type LoginPageProps = {
    events?: {
        click?: () => void;
    }
}

export class LoginPage extends Block<LoginPageProps> {
    private _loginRule = new RegExp(ValidateRules.login);
    private _passwordRule = new RegExp(ValidateRules.password);

    constructor() {
        super();
        this.addEvents();
    }

    protected addEvents() {
        this.setProps({
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    const data = [...new FormData(e.target as HTMLFormElement)];
                    const entries = new Map(data);
                    const result = Object.fromEntries(entries);
                    const checkLogin = this._loginRule.test(data[0][1].toString());
                    const checkPassword = this._passwordRule.test(data[1][1].toString());
                    if (checkLogin && checkPassword) {
                        console.log(result);
                    }
                },
            },
        });
    }

    protected initChildren(): void {
        this.children.button = new Button({
            label: 'Авторизоваться',
            type: 'submit',
        });
        this.children.inputLogin = new Input({
            name: 'login',
            type: 'text',
            pattern: ValidateRules.login,
        });
        this.children.inputPassword = new Input({
            name: 'password',
            type: 'password',
            pattern: ValidateRules.password,
        });
        this.children.linkToRegistration = new Link({
            label: 'Нет аккаунта?',
            to: Routes.Registration,
            className: 'ask',
        });
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {});
    }
}
