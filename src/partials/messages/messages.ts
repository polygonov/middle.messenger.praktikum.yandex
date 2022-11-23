import { Block } from '../../utils/Block';
import template from './messages.hbs';
import messagesList from '../../data/messagesList.json';
import messageStatus from '../../../static/message-status.svg';

type MessagesProps = {
    events?: {
        click?: () => void;
    }
}

export class MessagesComponent extends Block {

    constructor(props: MessagesProps) {
        super(props);
    }

    protected initChildren(): void {
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { messagesList, messageStatus });
    }
}
