import ChatActionsComponent from '../../components/chat-actions';
import ChatsComponent from '../../components/chats';
import ChatsHeadComponent from '../../components/chats-head';
import MessageActionsComponent from '../../components/message-actions';
import MessageFooterComponent from '../../components/message-footer';
import MessagesComponent from '../../components/messages';
import MessagesHeadComponent from '../../components/messages-head';
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
