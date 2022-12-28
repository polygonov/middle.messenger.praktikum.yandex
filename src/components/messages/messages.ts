import { Block } from '../../utils/Block';
import template from './messages.hbs';
import messagesList from '../../data/messagesList.json';
import messageStatus from '../../../static/message-status.svg';
import { withStore } from '../../hocs/withStore';
import { MessageComponent } from '../message/message';
import { Message } from '../../controllers/MessagesController';
import { User } from '../../types/User';

type MessagesProps = {
    messages: Message[];
    user: User;
    events?: {
        click?: () => void;
    }
}

class MessagesComponentBase extends Block<MessagesProps> {
    constructor(props: MessagesProps) {
        super(props);
    }

    protected initChildren(): void {
        this.children.messages =
            this.createMessagesViews(this.props) as unknown as Block<MessagesProps>;
    }

    private createMessagesViews(props: MessagesProps) {
        return props.messages.map(data => {
            const date = new Date(data.time);
            return new MessageComponent({
                content: data.content,
                time: date.getHours() + ':' + date.getMinutes(),
                master: props.user.id === data.user_id,
                isReadIcon: data.is_read ? messageStatus : '',
            });
        });
    }

    componentDidUpdate(_oldProps: MessagesProps, newProps: MessagesProps): boolean {
        this.children.messages =
            this.createMessagesViews(newProps) as unknown as Block<MessagesProps>;
        return true;
    }

    protected render(): DocumentFragment {
        return this.compile(template, { messagesList, messageStatus, ...this.props });
    }
}

const withChats = withStore((state: any) => ({
    user: state.user,
    selectedChatId: state.selectedChatId,
    chats: [...(state.chats || [])],
    messages: (state.messages || {})[state.selectedChatId] || [],
}));
export const MessagesComponent = withChats(MessagesComponentBase);
