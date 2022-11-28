import { Block } from '../../utils/Block';
import template from './change-password.hbs';
import backPanel from '../../../static/back-panel.svg';
import { Input } from '../../components/input';
import { ValidateRules } from '../../utils/validateRules';
import memoji from '../../../static/memoji.png';
import { Button } from '../../components/button';

export class ChangePasswordPage extends Block {
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
                    const checkOldPassword = this._passwordRule.test(data[0][1].toString());
                    const checkPassword = this._passwordRule.test(data[1][1].toString());
                    const checkPasswordAgain = data[1][1].toString() === data[2][1].toString();
                    if (checkOldPassword && checkPassword && checkPasswordAgain) {
                        console.log(result);
                    }
                },
            },
        });
    }

    protected initChildren(): void {
        this.children.inputOldPassword = new Input({
            name: 'old_password',
            type: 'password',
            pattern: ValidateRules.password,
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
            label: 'Сохранить',
            type: 'submit',
        });
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { backPanel, memoji });
    }
}
