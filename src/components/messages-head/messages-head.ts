import { Block } from '../../utils/Block';
import template from './messages-head.hbs';
import avatar2 from '../../../static/avatar2.png';
import chatTools from '../../../static/chat-tools.svg';

type MessagesHeadProps = {
    events?: {
        click?: () => void;
    }
}

export class MessagesHeadComponent extends Block {

    constructor(props: MessagesHeadProps) {
        super(props);
    }

    protected initChildren(): void {
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {avatar2, chatTools});
    }
}
