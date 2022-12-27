import { Button } from '../../components/button';
import { ChatsComponent } from '../../components/chats';
import { ChatsHeadComponent } from '../../components/chats-head';
import { Input } from '../../components/input';
import { MessageActionsComponent } from '../../components/message-actions';
import { MessageFooterComponent } from '../../components/message-footer';
import { MessagesComponent } from '../../components/messages';
import { MessagesHeadComponent } from '../../components/messages-head';
import { chatsController } from '../../controllers/ChatsController';
import { userController } from '../../controllers/UserController';
import { withStore } from '../../hocs/withStore';
import { Chat } from '../../types/Chat';
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
        chatsController.fetchChats();
    }

    protected checkProps() {
        if (this.props.selectedChatId) {
            this.showChats = true;
        } else {
            this.showChats = false;
        }
    }

    protected initChildren(): void {
        let inputNewChatNameEl: HTMLInputElement | undefined;
        this.children.chatsHead = new ChatsHeadComponent({});
        this.children.chats = new ChatsComponent({});
        this.children.messagesHead = new MessagesHeadComponent({});
        this.children.messages = new MessagesComponent({});
        this.children.messageAction = new MessageActionsComponent({});
        this.children.messageFooter = new MessageFooterComponent({});
        this.children.inputConnectName = new Input({
            name: 'passwordCheck',
            type: 'text',
            placeholder: 'Введите логин для связи',
            pattern: ValidateRules.login,
            events: {
                input: () => {
                    inputNewChatNameEl = <HTMLInputElement> this.children.inputConnectName.element;
                },
            },
        });
        this.children.button = new Button({
            label: 'Создать',
            type: 'submit',
            events: {
                click: () => {
                    this.createNewChatWithOneUser(inputNewChatNameEl);
                },
            },
        });
    }

    private async createNewChatWithOneUser(inputNewChatNameEl: HTMLInputElement | undefined) {
        const login = inputNewChatNameEl!.value;
        if (login.length > 0) {
            const users = await userController.searchUser(login);
            const newChatName =
                this.props.user.first_name + ' и ' + users[0].first_name;
            await chatsController.createChat({ title: newChatName });
            const newChat: Chat = this.props.chats[0];
            await chatsController.addNewUsersToChat({
                users: [users[0].id],
                chatId: newChat.id,
            });
        }
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        this.checkProps();
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { showChats: this.showChats, ...this.props });
    }
}

const withChats = withStore((state: any) =>
    ({ user: state.user, selectedChatId: state.selectedChatId, chats: [...(state.chats || [])] }));
export const MainPage = withChats(MainPageBase);
