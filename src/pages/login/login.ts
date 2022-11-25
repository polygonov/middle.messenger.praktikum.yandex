import Button from '../../components/button';
import Input from '../../components/input';
import { Block } from '../../utils/Block';
import { ValidateRules } from '../../utils/validateRules';
import template from './login.hbs';

export class LoginPage extends Block {
    private _loginRule = new RegExp(ValidateRules.login);
    private _passwordRule = new RegExp(ValidateRules.password);
    
    constructor() {
        super();
        this.addEvents();
    }

    protected addEvents() {
        this.setProps({
            events: {
                submit: e => {
                    e.preventDefault();
                    const data = [...new FormData(e.target)];
                    const entries = new Map(data);
                    const result = Object.fromEntries(entries);
                    const checkLogin = this._loginRule.test(data[0][1].toString());
                    const checkPassword = this._passwordRule.test(data[1][1].toString());
                    if (checkLogin && checkPassword) {
                        console.log(result);
                    }
                }
            }
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
            pattern:  ValidateRules.password,
        });
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {});
    }
}
