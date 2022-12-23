import { AvatarChangerComponent } from '../../components/avatar-changer';
import { Block } from '../../utils/Block';
import template from './profile.hbs';
import backPanel from '../../../static/back-panel.svg';
import memoji from '../../../static/memoji.png';
import { Link } from '../../components/link';
import { Routes } from '../../utils/Routes';

type ProfilePageProps = {
    events?: {
        click?: () => void;
    }
}

export class ProfilePage extends Block<ProfilePageProps> {
    showPopupChanger = false;

    protected initChildren(): void {
        this.children.avatarChanger = new AvatarChangerComponent({
            events: {
                click: () => {
                    console.log('avatar clicked');
                    this.showPopupChanger = true;
                    this.setProps({ showPopupChanger: this.showPopupChanger });
                },
            },
        });
        this.children.linkToMessanger = new Link({
            label: '',
            to: Routes.Messenger,
            className: 'back-panel',
            externalTemplate: () => {
                return `<div class="link back-panel">
                            <img src="${backPanel}">
                        </div>`;
            },
        });
        this.children.linkChangeProfile = new Link({
            label: 'Изменить данные',
            to: Routes.ChangeProfile,
            className: 'changer',
        });
        this.children.linkChangePassword = new Link({
            label: 'Изменить пароль',
            to: Routes.ChangePassword,
            className: 'changer',
        });
        this.children.linkExit = new Link({
            label: 'Выйти',
            to: Routes.Index,
            className: 'exit',
            shouldLogout: true,
        });
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { backPanel, memoji });
    }
}
