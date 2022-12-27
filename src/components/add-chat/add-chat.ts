import { Block } from '../../utils/Block';
import template from './add-chat.hbs';
import icnAddChat from '../../../static/icn_add_user.svg';

type AddChatProps = {
    events?: {
        click?: () => void;
    }
}

export class AddChatComponent extends Block<AddChatProps> {
    constructor(props: AddChatProps) {
        super(props);
    }

    protected initChildren(): void {
    }

    componentDidUpdate(oldProps: AddChatProps, newProps: AddChatProps): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { icnAddChat });
    }
}
