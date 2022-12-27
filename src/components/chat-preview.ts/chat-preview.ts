import { Block } from '../../utils/Block';
import template from './chat-preview.hbs';
import { withStore } from '../../hocs/withStore';

type ChatPreviewProps = {
    id: number;
    avatar: string;
    title: string;
    content: string;
    time: string;
    count: number;
    className?: string;
    events?: {
        click?: () => void;
    }
}

class ChatPreviewBase extends Block<ChatPreviewProps> {
    constructor(props: ChatPreviewProps) {
        super(props);
        this.addProps();
    }

    protected addProps() {
        if (this.props.selectedChatId === this.props.id) {
            this.setProps({
                className: 'chat-preview-selected',
            });
        }
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}

const withSelectedChatId = withStore((state: any) => ({ selectedChatId: state.selectedChatId }));
export const ChatPreview = withSelectedChatId(ChatPreviewBase);
