import { Block } from '../../utils/Block';
import template from './message.hbs';
import messageStatus from '../../../static/message-status.svg';

type MessageProps = {
    content: string;
    time: string;
    master: boolean;
    isReadIcon: string;
    events?: {
        click?: () => void;
    }
}

export class MessageComponent extends Block<MessageProps> {
    constructor(props: MessageProps) {
        super(props);
    }

    protected initChildren(): void {
    }

    componentDidUpdate(oldProps: MessageProps, newProps: MessageProps): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { messageStatus, ...this.props });
    }
}
