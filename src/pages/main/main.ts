import ChatsComponent from '../../partials/chats';
import ChatsHeadComponent from '../../partials/chats-head';
import { Block } from '../../utils/Block';
import template from './main.hbs';

export class MainPage extends Block {

    protected initChildren(): void {
        this.children.chatsHead = new ChatsHeadComponent({
            events: {
                click: () => console.log('clicked ChatsHeadComponent')
            }
        });
        this.children.chats = new ChatsComponent({
            events: {
                click: () => console.log('clicked ChatsComponent')
            }
        });
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {});
    }
}
