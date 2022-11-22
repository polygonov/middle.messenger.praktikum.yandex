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
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {});
    }
}
