import Button from '../../components/button';
import Input from '../../components/input';
import { Block } from '../../utils/Block';
import { ValideRules } from '../../utils/validateRules';
import template from './registration.hbs';

export class RegistrationPage extends Block {
    private _emailRule = new RegExp(ValideRules.email);
    private _loginRule = new RegExp(ValideRules.login);
    private _nameRule = new RegExp(ValideRules.name);
    private _phoneRule = new RegExp(ValideRules.phone);
    private _passwordRule = new RegExp(ValideRules.password);

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
                    const entries = new Map(data.slice(0, -1));
                    const result = Object.fromEntries(entries);
                    const checkEmail = this._emailRule.test(data[0][1].toString());
                    const checkLogin = this._loginRule.test(data[1][1].toString());
                    const checkFirstName = this._nameRule.test(data[2][1].toString());
                    const checkSecondName = this._nameRule.test(data[3][1].toString());
                    const checkPhone = this._phoneRule.test(data[4][1].toString());
                    const checkPassword = this._passwordRule.test(data[5][1].toString());
                    const checkPasswordAgain = data[5][1].toString() === data[6][1].toString();
                    if (checkEmail 
                        && checkLogin 
                        && checkFirstName 
                        && checkSecondName 
                        && checkPhone 
                        && checkPassword 
                        && checkPasswordAgain
                        ) {
                        console.log(result);
                    }
                }
            }
        });
    }

    protected initChildren(): void {
        this.children.inputEmail = new Input({
            name: 'email',
            type: 'email',
            pattern: ValideRules.email,
        });
        this.children.inputLogin = new Input({
            name: 'login',
            type: 'text',
            pattern: ValideRules.login,
        });
        this.children.inputFirstName = new Input({
            name: 'first_name',
            type: 'text',
            pattern: ValideRules.name,
        });
        this.children.inputSecondName = new Input({
            name: 'second_name',
            type: 'text',
            pattern: ValideRules.name,
        });
        this.children.inputPhone = new Input({
            name: 'phone',
            type: 'tel',
            pattern: ValideRules.phone,
        });
        this.children.inputPassword = new Input({
            name: 'password',
            type: 'password',
            pattern: ValideRules.password,
            events: {
                input: () => {
                    const passwordElement = <HTMLInputElement>this.children.inputPassword.element;
                    this.children.inputPasswordCheck.setProps({
                        pattern: '^' + passwordElement.value + '$',
                    })
                },
            }
        });
        this.children.inputPasswordCheck = new Input({
            name: 'passwordCheck',
            type: 'password',
            pattern: ValideRules.password,
        });
        this.children.button = new Button({
            label: 'Зарегистрироваться',
            type: 'submit',
        });
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {});
    }
}
