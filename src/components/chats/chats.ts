import { Block } from '../../utils/Block';
import template from './chats.hbs';
import avatar1 from '../../../static/avatar1.png';
import avatar2 from '../../../static/avatar2.png';
import avatar3 from '../../../static/avatar3.png';
import { withStore } from '../../hocs/withStore';

type ChatsProps = {
    events?: {
        click?: () => void;
    }
}

class ChatsComponentBase extends Block<ChatsProps> {
    constructor(props: ChatsProps) {
        super(props);
    }

    protected initChildren(): void {
    }

    componentDidUpdate(oldProps: ChatsProps, newProps: ChatsProps): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        const chats = this.props.chats;
        return this.compile(template, { avatar1, avatar2, avatar3, chats });
    }
}

const withChats = withStore((state: any) => state.chats);
export const ChatsComponent = withChats(ChatsComponentBase);
