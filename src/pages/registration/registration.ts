import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Link } from '../../components/link';
import { Block } from '../../utils/Block';
import { Routes } from '../../utils/Routes';
import { ValidateRules } from '../../utils/validateRules';
import template from './registration.hbs';

type RegistrationPageProps = {
    events?: {
        click?: () => void;
    }
}

export class RegistrationPage extends Block<RegistrationPageProps> {
    private _emailRule = new RegExp(ValidateRules.email);
    private _loginRule = new RegExp(ValidateRules.login);
    private _nameRule = new RegExp(ValidateRules.name);
    private _phoneRule = new RegExp(ValidateRules.phone);
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
                    const entries = new Map(data.slice(0, -1));
                    const result = Object.fromEntries(entries);
                    const checkEmail = this._emailRule.test(data[0][1].toString());
                    const checkLogin = this._loginRule.test(data[1][1].toString());
                    const checkFirstName = this._nameRule.test(data[2][1].toString());
                    const checkSecondName = this._nameRule.test(data[3][1].toString());
                    const checkPhone = this._phoneRule.test(data[4][1].toString());
                    const checkPassword = this._passwordRule.test(data[5][1].toString());
                    const checkPasswordAgain = data[5][1].toString() === data[6][1].toString();
                    if (checkEmail &&
                        checkLogin &&
                        checkFirstName &&
                        checkSecondName &&
                        checkPhone &&
                        checkPassword &&
                        checkPasswordAgain
                    ) {
                        console.log(result);
                    }
                },
            },
        });
    }

    protected initChildren(): void {
        this.children.inputEmail = new Input({
            name: 'email',
            type: 'email',
            pattern: ValidateRules.email,
        });
        this.children.inputLogin = new Input({
            name: 'login',
            type: 'text',
            pattern: ValidateRules.login,
        });
        this.children.inputFirstName = new Input({
            name: 'first_name',
            type: 'text',
            pattern: ValidateRules.name,
        });
        this.children.inputSecondName = new Input({
            name: 'second_name',
            type: 'text',
            pattern: ValidateRules.name,
        });
        this.children.inputPhone = new Input({
            name: 'phone',
            type: 'tel',
            pattern: ValidateRules.phone,
        });
        this.children.inputPassword = new Input({
            name: 'password',
            type: 'password',
            pattern: ValidateRules.password,
            events: {
                input: () => {
                    const passwordElement = <HTMLInputElement> this.children.inputPassword.element;
                    this.children.inputPasswordCheck.setProps({
                        pattern: '^' + passwordElement.value + '$',
                    });
                },
            },
        });
        this.children.inputPasswordCheck = new Input({
            name: 'passwordCheck',
            type: 'password',
            pattern: ValidateRules.password,
        });
        this.children.button = new Button({
            label: 'Зарегистрироваться',
            type: 'submit',
        });
        this.children.linkToLogin = new Link({
            label: 'Войти',
            to: Routes.Index,
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
