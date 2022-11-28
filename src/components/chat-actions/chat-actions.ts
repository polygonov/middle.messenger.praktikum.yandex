import { Block } from '../../utils/Block';
import template from './chat-actions.hbs';
import icnAddUser from '../../../static/icn_add_user.svg';
import icnDeleteUser from '../../../static/icn_delete_user.svg';
import icnDeleteChat from '../../../static/icn_delete_chat.svg';

type ChatActionsProps = {
    events?: {
        click?: () => void;
    }
}

export class ChatActionsComponent extends Block<ChatActionsProps> {
    constructor(props: ChatActionsProps) {
        super(props);
    }

    protected initChildren(): void {
    }

    componentDidUpdate(oldProps: ChatActionsProps, newProps: ChatActionsProps): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { icnAddUser, icnDeleteUser, icnDeleteChat });
    }
}
