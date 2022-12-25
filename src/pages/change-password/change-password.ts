import { Block } from '../../utils/Block';
import template from './change-password.hbs';
import backPanel from '../../../static/back-panel.svg';
import { Input } from '../../components/input';
import { ValidateRules } from '../../utils/validateRules';
import memoji from '../../../static/memoji.png';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { Routes } from '../../utils/Routes';
import { userController } from '../../controllers/UserController';
import { NewPassword } from '../../types/NewPassword';
import { sourceLink } from '../../utils/sourceLink';
import { withStore } from '../../hocs/withStore';

type ChangePasswordPageProps = {
    events?: {
        click?: () => void;
    }
}

class ChangePasswordPageBase extends Block<ChangePasswordPageProps> {
    private _passwordRule = new RegExp(ValidateRules.password);

    constructor(props: ChangePasswordPageProps) {
        super(props);
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
                        userController.changePassword(result as unknown as NewPassword);
                    }
                },
            },
        });
    }

    protected initChildren(): void {
        this.children.inputOldPassword = new Input({
            name: 'oldPassword',
            type: 'password',
            pattern: ValidateRules.password,
        });
        this.children.inputPassword = new Input({
            name: 'newPassword',
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
        this.children.linkToProfile = new Link({
            label: '',
            to: Routes.Settings,
            className: 'back-panel',
            externalTemplate: () => {
                return `<div class="link back-panel">
                            <img src="${backPanel}">
                        </div>`;
            },
        });
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { backPanel, memoji, sourceLink, ...this.props });
    }
}

const withUser = withStore((state: any) => state.user);
export const ChangePasswordPage = withUser(ChangePasswordPageBase);
