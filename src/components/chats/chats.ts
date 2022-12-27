import { Block } from '../../utils/Block';
import template from './chats.hbs';
import defAvatar from '../../../static/avatar1.png';
import { withStore } from '../../hocs/withStore';
import { Chat } from '../../types/Chat';
import { ChatPreview } from '../chat-preview.ts';
import { sourceLink } from '../../utils/sourceLink';
import { chatsController } from '../../controllers/ChatsController';

type ChatsProps = {
    chats: Chat[];
    events?: {
        click?: () => void;
    }
}

class ChatsComponentBase extends Block<ChatsProps> {
    constructor(props: ChatsProps) {
        super(props);
    }

    protected initChildren(): void {
        this.children.chats = this.createChatsViews(this.props) as unknown as Block<ChatsProps>;
    }

    componentDidUpdate(_oldProps: ChatsProps, newProps: ChatsProps): boolean {
        this.children.chats = this.createChatsViews(newProps) as unknown as Block<ChatsProps>;
        return true;
    }

    private createChatsViews(props: ChatsProps) {
        return props.chats.map(data => {
            const date = new Date(data.last_message?.time);
            const avatar = data.avatar;
            return new ChatPreview({
                id: data.id,
                avatar: avatar ? sourceLink + avatar : defAvatar,
                title: data.title || '',
                content: data.last_message?.content || '',
                time: data.last_message?.time ? date.getHours() + ':' + date.getMinutes() : '',
                count: data.unread_count || 0,
                events: {
                    click: () => {
                        chatsController.setSelectedChatId(data.id);
                    },
                },
            });
        });
    }

    protected render(): DocumentFragment {
        const chats = this.props.chats;
        return this.compile(template, { defAvatar, chats, ...this.props });
    }
}

const withChats = withStore((state: any) => ({ chats: [...(state.chats || [])] }));
export const ChatsComponent = withChats(ChatsComponentBase);
