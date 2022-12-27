import { Block } from '../../utils/Block';
import template from './messages-head.hbs';
import avatar from '../../../static/avatar1.png';
import chatTools from '../../../static/chat-tools.svg';
import { withStore } from '../../hocs/withStore';
import { Chat } from '../../types/Chat';
import { sourceLink } from '../../utils/sourceLink';

type MessagesHeadProps = {
    events?: {
        click?: () => void;
    }
}

export class MessagesHeadComponentBase extends Block<MessagesHeadProps> {
    actualChat: Chat;
    constructor(props: MessagesHeadProps) {
        super(props);
    }

    protected initChildren(): void {
    }

    componentDidUpdate(oldProps: MessagesHeadProps, newProps: MessagesHeadProps): boolean {
        const chats = this.props.chats;
        if (chats.length > 0) {
            this.actualChat = chats.find((chat: Chat) => chat.id === this.props.selectedChatId);
        }
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template,
            {
                avatar,
                chatTools,
                ...this.props,
                sourceLink,
                actualChat: this.actualChat,
            },
        );
    }
}

const withChats = withStore((state: any) =>
    ({ selectedChatId: state.selectedChatId, chats: [...(state.chats || [])] }));
export const MessagesHeadComponent = withChats(MessagesHeadComponentBase);
