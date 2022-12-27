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
import { withStore } from '../../hocs/withStore';
import { Block } from '../../utils/Block';
import { ValidateRules } from '../../utils/validateRules';
import template from './main.hbs';

type MainPageProps = {
    events?: {
        click?: () => void;
    }
}
class MainPageBase extends Block<MainPageProps> {
    showChats = true;
    constructor(props: MainPageProps) {
        super(props);
    }

    protected checkProps() {
        if (this.props.selectedChatId) {
            this.showChats = true;
        }
    }

    protected initChildren(): void {
        let inputNewChatNameEl: HTMLInputElement | undefined;
        this.children.chatsHead = new ChatsHeadComponent({
            events: {
                click: () => {
                    this.showChats = false;
                    chatsController.setSelectedChatId(null);
                    this.setProps({ showChats: this.showChats });
                },
            },
        });
        this.children.chats = new ChatsComponent({});
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
        this.checkProps();
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { showChats: this.showChats, ...this.props });
    }
}

const withSelectedChatId = withStore((state: any) => ({ selectedChatId: state.selectedChatId }));
export const MainPage = withSelectedChatId(MainPageBase);
