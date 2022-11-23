import ChatActionsComponent from '../../partials/chat-actions';
import ChatsComponent from '../../partials/chats';
import ChatsHeadComponent from '../../partials/chats-head';
import MessageActionsComponent from '../../partials/message-actions';
import MessageFooterComponent from '../../partials/message-footer';
import MessagesComponent from '../../partials/messages';
import MessagesHeadComponent from '../../partials/messages-head';
import { Block } from '../../utils/Block';
import template from './main.hbs';

export class MainPage extends Block {

    showChats = true;

    protected initChildren(): void {
        this.children.chatsHead = new ChatsHeadComponent({});
        this.children.chats = new ChatsComponent({
            events: {
                click: () => {
                    this.showChats = !this.showChats;
                    this.setProps({ showChats: this.showChats });
                },
            }
        });
        this.children.messagesHead = new MessagesHeadComponent({});
        this.children.chatActions = new ChatActionsComponent({});
        this.children.messages = new MessagesComponent({});
        this.children.messageAction = new MessageActionsComponent({});
        this.children.messageFooter = new MessageFooterComponent({});
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { showChats: this.showChats });
    }
}
