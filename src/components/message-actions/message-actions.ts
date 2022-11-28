import { Block } from '../../utils/Block';
import template from './message-actions.hbs';
import addImage from '../../../static/add-image.svg';
import addFile from '../../../static/add-file.svg';
import addLocation from '../../../static/add-location.svg';

type MessageActionsProps = {
    events?: {
        click?: () => void;
    }
}

export class MessageActionsComponent extends Block<MessageActionsProps> {
    constructor(props: MessageActionsProps) {
        super(props);
    }

    protected initChildren(): void {
    }

    componentDidUpdate(oldProps: MessageActionsProps, newProps: MessageActionsProps): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { addImage, addFile, addLocation });
    }
}
