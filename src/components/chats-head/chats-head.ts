import { Block } from '../../utils/Block';
import template from './chats-head.hbs';
import arrowRight from '../../../static/arrow-right.svg';
import search from '../../../static/search.svg';
import { Link } from '../link';
import { AddChatComponent } from '../add-chat';
import { chatsController } from '../../controllers/ChatsController';

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
        this.children.addChat = new AddChatComponent({
            events: {
                click: () => {
                    chatsController.setSelectedChatId(null);
                },
            },
        });
    }

    componentDidUpdate(oldProps: ChatsHeadProps, newProps: ChatsHeadProps): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { arrowRight, search });
    }
}
