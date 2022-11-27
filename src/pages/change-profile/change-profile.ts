import { Block } from '../../utils/Block';
import template from './change-profile.hbs';
import backPanel from '../../../static/back-panel.svg';
import Input from '../../components/input';
import { ValidateRules } from '../../utils/validateRules';
import Button from '../../components/button';
import AvatarChangerComponent from '../../components/avatar-changer';

export class ChangeProfilePage extends Block {
    showPopupChanger = false;
    private _emailRule = new RegExp(ValidateRules.email);
    private _loginRule = new RegExp(ValidateRules.login);
    private _nameRule = new RegExp(ValidateRules.name);
    private _phoneRule = new RegExp(ValidateRules.phone);

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
                    const checkEmail = this._emailRule.test(data[0][1].toString());
                    const checkLogin = this._loginRule.test(data[1][1].toString());
                    const checkFirstName = this._nameRule.test(data[2][1].toString());
                    const checkSecondName = this._nameRule.test(data[3][1].toString());
                    const checkPhone = this._phoneRule.test(data[4][1].toString());
                    if (checkEmail &&
                        checkLogin &&
                        checkFirstName &&
                        checkSecondName &&
                        checkPhone
                    ) {
                        console.log(result);
                    }
                },
            },
        });
    }

    protected initChildren(): void {
        this.children.avatarChanger = new AvatarChangerComponent({
            events: {
                click: () => {
                    this.showPopupChanger = true;
                    this.setProps({ showPopupChanger: this.showPopupChanger });
                },
            },
        });
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
        this.children.button = new Button({
            label: 'Сохранитьm',
            type: 'submit',
        });
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { backPanel, showPopupChanger: this.showPopupChanger });
    }
}
