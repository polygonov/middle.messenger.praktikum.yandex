import { AvatarChangerComponent } from '../../components/avatar-changer';
import { Block } from '../../utils/Block';
import template from './profile.hbs';
import backPanel from '../../../static/back-panel.svg';
import memoji from '../../../static/memoji.png';

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
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { backPanel, memoji });
    }
}
