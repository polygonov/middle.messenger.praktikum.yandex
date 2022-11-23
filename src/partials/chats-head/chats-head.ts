import { Block } from '../../utils/Block';
import template from './chats-head.hbs';
import arrowRight from '../../../static/arrow-right.svg';
import search from '../../../static/search.svg';

type ChatsHeadProps = {
    events?: {
        click?: () => void;
    }
}

export class ChatsHeadComponent extends Block {

    constructor(props: ChatsHeadProps) {
        super(props);
    }

    protected initChildren(): void {
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { arrowRight, search });
    }
}
