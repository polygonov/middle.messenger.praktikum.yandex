import { Block } from '../../utils/Block';
import template from './chats.hbs';
import avatar1 from '../../../static/avatar1.png';
import avatar2 from '../../../static/avatar2.png';
import avatar3 from '../../../static/avatar3.png';
import { withStore } from '../../hocs/withStore';
import { Chat } from '../../types/Chat';
import { ChatPreview } from '../chat-preview.ts';

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
        console.log('chats>>>', this.children.chats);
        const data = this.props.chats[0];
        this.children.chatView = new ChatPreview({
            ...data,
            events: {
                click: () => {},
            },
        }) as unknown as Block<ChatsProps>;
        console.log('single chatView>>>', this.children.chatView);
    }

    componentDidUpdate(_oldProps: ChatsProps, newProps: ChatsProps): boolean {
        this.children.chats = this.createChatsViews(newProps) as unknown as Block<ChatsProps>;
        return true;
    }

    private createChatsViews(props: ChatsProps) {
        return props.chats.map(data => {
            return new ChatPreview({
                id: data.id,
                avatar: data.avatar || '',
                title: data.title || '',
                content: data.last_message?.content || '',
                time: data.last_message?.time || '',
                count: data.unread_count || 0,
                events: {
                    click: () => {},
                },
            });
        });
    }

    protected render(): DocumentFragment {
        const chats = this.props.chats;
        return this.compile(template, { avatar1, avatar2, avatar3, chats, ...this.props });
    }
}

const withChats = withStore((state: any) => ({ chats: [...(state.chats || [])] }));
export const ChatsComponent = withChats(ChatsComponentBase);
