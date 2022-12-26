import { Block } from '../../utils/Block';
import template from './chat-preview.hbs';
import avatar1 from '../../../static/avatar1.png';

type ChatPreviewProps = {
    id: number;
    avatar: string;
    title: string;
    content: string;
    time: string;
    count: number;
    events?: {
        click?: () => void;
    }
}

export class ChatPreview extends Block<ChatPreviewProps> {
    constructor(props: ChatPreviewProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props, avatar1 });
    }
}
