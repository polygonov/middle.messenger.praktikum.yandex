import { Block } from '../../utils/Block';
import template from './messages.hbs';
import messagesList from '../../data/messagesList.json';
import messageStatus from '../../../static/message-status.svg';

type MessagesProps = {
    events?: {
        click?: () => void;
    }
}

export class MessagesComponent extends Block<MessagesProps> {
    constructor(props: MessagesProps) {
        super(props);
    }

    protected initChildren(): void {
    }

    componentDidUpdate(oldProps: MessagesProps, newProps: MessagesProps): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { messagesList, messageStatus });
    }
}
