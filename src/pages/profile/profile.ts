import AvatarComponent from '../../components/avatar';
import { Block } from '../../utils/Block';
import template from './profile.hbs';
import backPanel from '../../../static/back-panel.svg';

export class ProfilePage extends Block {
    showPopupChanger = false;

    protected initChildren(): void {
        this.children.avatar = new AvatarComponent({
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
        return this.compile(template, { backPanel, showPopupChanger: this.showPopupChanger });
    }
}
