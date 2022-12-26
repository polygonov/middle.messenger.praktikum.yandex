import { Button } from '../../components/button';
import { ChatActionsComponent } from '../../components/chat-actions';
import { ChatsComponent } from '../../components/chats';
import { ChatsHeadComponent } from '../../components/chats-head';
import { Input } from '../../components/input';
import { MessageActionsComponent } from '../../components/message-actions';
import { MessageFooterComponent } from '../../components/message-footer';
import { MessagesComponent } from '../../components/messages';
import { MessagesHeadComponent } from '../../components/messages-head';
import { chatsController } from '../../controllers/ChatsController';
import { Block } from '../../utils/Block';
import { ValidateRules } from '../../utils/validateRules';
import template from './main.hbs';

type MainPageProps = {
    events?: {
        click?: () => void;
    }
}

export class MainPage extends Block<MainPageProps> {
    showChats = true;

    protected initChildren(): void {
        let inputNewChatNameEl: HTMLInputElement | undefined;
        this.children.chatsHead = new ChatsHeadComponent({});
        this.children.chats = new ChatsComponent({
            events: {
                click: () => {
                    this.showChats = !this.showChats;
                    this.setProps({ showChats: this.showChats });
                },
            },
        });
        this.children.messagesHead = new MessagesHeadComponent({});
        this.children.chatActions = new ChatActionsComponent({});
        this.children.messages = new MessagesComponent({});
        this.children.messageAction = new MessageActionsComponent({});
        this.children.messageFooter = new MessageFooterComponent({});
        this.children.inputChatName = new Input({
            name: 'passwordCheck',
            type: 'text',
            placeholder: 'Введите название чата',
            pattern: ValidateRules.notEmpty,
            events: {
                input: () => {
                    inputNewChatNameEl = <HTMLInputElement> this.children.inputChatName.element;
                },
            },
        });
        this.children.button = new Button({
            label: 'Создать',
            type: 'submit',
            events: {
                click: () => {
                    const title = inputNewChatNameEl!.value;
                    if (title.length > 0) {
                        chatsController.createChat({ title });
                    }
                },
            },
        });
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { showChats: this.showChats });
    }
}
