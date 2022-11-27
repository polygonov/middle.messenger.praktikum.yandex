import { Block } from '../../utils/Block';
import template from './chats.hbs';
import avatar1 from '../../../static/avatar1.png';
import avatar2 from '../../../static/avatar2.png';
import avatar3 from '../../../static/avatar3.png';
import chatsList from '../../data/chatsList.json';

type ChatsProps = {
    events?: {
        click?: () => void;
    }
}

export class ChatsComponent extends Block {
    constructor(props: ChatsProps) {
        super(props);
    }

    protected initChildren(): void {
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { avatar1, avatar2, avatar3, chatsList });
    }
}
