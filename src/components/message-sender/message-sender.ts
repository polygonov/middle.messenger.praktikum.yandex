import { Block } from '../../utils/Block';
import template from './message-sender.hbs';
import sendMessage from '../../../static/send-message.svg';

type MessageSenderProps = {
    type: string;
    events?: {
        click?: () => void;
    }
}

export class MessageSender extends Block {
    constructor(props: MessageSenderProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props, sendMessage });
    }
}
