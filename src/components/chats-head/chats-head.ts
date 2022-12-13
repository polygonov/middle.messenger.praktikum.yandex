import { Block } from '../../utils/Block';
import template from './chats-head.hbs';
import arrowRight from '../../../static/arrow-right.svg';
import search from '../../../static/search.svg';
import { Link } from '../link';

type ChatsHeadProps = {
    events?: {
        click?: () => void;
    }
}

export class ChatsHeadComponent extends Block<ChatsHeadProps> {
    constructor(props: ChatsHeadProps) {
        super(props);
    }

    protected initChildren(): void {
        this.children.link = new Link({
            label: 'Профиль',
            to: '/settings',
            className: 'label',
        });
    }

    componentDidUpdate(oldProps: ChatsHeadProps, newProps: ChatsHeadProps): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { arrowRight, search });
    }
}
