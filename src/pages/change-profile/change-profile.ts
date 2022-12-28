import { Block } from '../../utils/Block';
import template from './change-profile.hbs';
import backPanel from '../../../static/back-panel.svg';
import { Input } from '../../components/input';
import { ValidateRules } from '../../utils/validateRules';
import { Button } from '../../components/button';
import { AvatarChangerComponent } from '../../components/avatar-changer';
import { Link } from '../../components/link';
import { Routes } from '../../utils/Routes';
import { Profile } from '../../types/Profile';
import { userController } from '../../controllers/UserController';
import { withStore } from '../../hocs/withStore';
import { AvatarInput } from '../../components/avatar-input';

type ChangeProfilePageProps = {
    events?: {
        click?: () => void;
    }
}

export class ChangeProfilePageBase extends Block<ChangeProfilePageProps> {
    showPopupChanger = false;
    changeAvatarText = 'Выбрать файл на компьютере';
    private _emailRule = new RegExp(ValidateRules.email);
    private _loginRule = new RegExp(ValidateRules.login);
    private _nameRule = new RegExp(ValidateRules.name);
    private _phoneRule = new RegExp(ValidateRules.phone);

    constructor(props: ChangeProfilePageProps) {
        super(props);
        this.addEvents();
    }

    protected addEvents() {
        this.setProps({
            events: {
                submit: (e: SubmitEvent) => {
                    this.submit(e);
                },
            },
        });
    }

    private submit(e: SubmitEvent) {
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
            result.display_name = '';
            console.log(result);
            userController.updateProfile(result as unknown as Profile);
        }
    }

    protected initChildren(): void {
        let inputFileElement: HTMLInputElement | undefined;
        this.children.avatarChanger = new AvatarChangerComponent({
            events: {
                click: () => {
                    this.showPopupChanger = true;
                    this.setProps({ showPopupChanger: this.showPopupChanger });
                    this.changeAvatarText = 'Выбрать файл на компьютере';
                    this.setProps({ changeAvatarText: this.changeAvatarText });
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
        this.children.inputFile = new AvatarInput({
            id: 'file-upload',
            name: 'avatar',
            type: 'file',
            events: {
                input: () => {
                    inputFileElement = <HTMLInputElement> this.children.inputFile.element;
                    this.changeAvatarText = 'Файл выбран';
                    this.setProps({ changeAvatarText: this.changeAvatarText });
                },
            },
        });
        this.children.buttonChangeAvatar = new Button({
            label: 'Поменять',
            className: 'btn',
            events: {
                click: () => {
                    const file: File | undefined = inputFileElement?.files![0];
                    if (!file) {
                        return;
                    }
                    const formData = new FormData();
                    formData.append('avatar', file);
                    userController.changeAvatar(formData);
                    this.showPopupChanger = false;
                    this.setProps({ showPopupChanger: this.showPopupChanger });
                },
            },
        });
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(
            template,
            {
                backPanel,
                showPopupChanger: this.showPopupChanger,
                changeAvatarText: this.changeAvatarText,
                ...this.props,
            },
        );
    }
}

const withUser = withStore((state: any) => state.user);
export const ChangeProfilePage = withUser(ChangeProfilePageBase);
