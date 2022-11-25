import { Block } from '../../utils/Block';
import template from './message-footer.hbs';
import importIcon from '../../../static/import.svg';
import sendMessage from '../../../static/send-message.svg';

type MessageFooterProps = {
    events?: {
        click?: () => void;
    }
}

export class MessageFooterComponent extends Block {
    constructor(props: MessageFooterProps) {
        super(props);
    }

    protected initChildren(): void {
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { importIcon, sendMessage });
    }
}
