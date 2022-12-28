import { AvatarInput } from '../../components/avatar-input';
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
    inputFileElement: HTMLInputElement | undefined;
    changeAvatarText = 'Выберите аватар вашего чата на компьютере (не обязательно)';
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
        this.children.chatsHead = new ChatsHeadComponent({});
        this.children.chats = new ChatsComponent({});
        this.children.messagesHead = new MessagesHeadComponent({});
        this.children.messages = new MessagesComponent({});
        this.children.messageAction = new MessageActionsComponent({});
        this.children.messageFooter = new MessageFooterComponent({});
        this.children.inputConnectName = new Input({
            name: 'inputConnectName',
            type: 'text',
            placeholder: 'harrypotter',
            pattern: ValidateRules.login,
        });
        this.children.inputChatName = new Input({
            name: 'inputChatName',
            type: 'text',
            placeholder: 'Гриффиндор',
            pattern: ValidateRules.notEmpty,
        });
        this.children.inputFile = new AvatarInput({
            id: 'file-upload',
            name: 'avatar',
            type: 'file',
            events: {
                input: () => {
                    this.inputFileElement = <HTMLInputElement> this.children.inputFile.element;
                    this.changeAvatarText = 'Изображение выбрано';
                    this.setProps({ changeAvatarText: this.changeAvatarText });
                    this.setProps({ inputFileElement: this.inputFileElement });
                },
            },
        });
        this.children.button = new Button({
            label: 'Создать чат',
            type: 'button',
            events: {
                click: async() => {
                    const inputConnectName =
                        <HTMLInputElement> this.children.inputConnectName.element;
                    if (!inputConnectName.value) {
                        await chatsController.fetchChats();
                        return;
                    }
                    const users = await userController.searchUser(inputConnectName.value);
                    if (users.length === 0) {
                        alert('Такой пользователь не найден');
                        return;
                    }
                    const inputChatName =
                        <HTMLInputElement> this.children.inputChatName.element;
                    if (!inputChatName.value) {
                        await chatsController.fetchChats();
                        return;
                    }
                    await chatsController.createChat({ title: inputChatName.value });
                    const newChat: Chat = this.props.chats[0];
                    await chatsController.addNewUsersToChat({
                        users: [this.props.user.id, users[0].id],
                        chatId: newChat.id,
                    });
                    const file: File | undefined = this.inputFileElement?.files![0];
                    if (!file) {
                        await chatsController.fetchChats();
                        return;
                    }
                    const formData = new FormData();
                    formData.append('chatId', newChat.id.toString());
                    formData.append('avatar', file);
                    await chatsController.changeAvatar(formData);
                    await chatsController.fetchChats();
                    inputConnectName.value = '';
                    inputChatName.value = '';
                    const inputFile = <HTMLInputElement> this.children.inputFile.element;
                    inputFile.value = '';
                    this.changeAvatarText =
                        'Выберите аватар вашего чата на компьютере (не обязательно)';
                    this.setProps({ changeAvatarText: this.changeAvatarText });
                },
            },
        });
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        this.checkProps();
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {
            showChats: this.showChats,
            ...this.props,
            changeAvatarText: this.changeAvatarText,
            inputFileElement: this.inputFileElement,
        });
    }
}

const withChats = withStore((state: any) =>
    ({ user: state.user, selectedChatId: state.selectedChatId, chats: [...(state.chats || [])] }));
export const MainPage = withChats(MainPageBase);
