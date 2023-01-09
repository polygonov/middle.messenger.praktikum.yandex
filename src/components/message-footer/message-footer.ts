import { Block } from '../../utils/Block';
import template from './message-footer.hbs';
import importIcon from '../../../static/import.svg';
import sendMessage from '../../../static/send-message.svg';
import { Input } from '../input';
import { ValidateRules } from '../../utils/validateRules';
import { MessageSender } from '../message-sender';
import { messagesController } from '../../controllers/MessagesController';
import { withStore } from '../../hocs/withStore';

type MessageFooterProps = {
    events?: {
        click?: () => void;
    }
}

export class MessageFooterComponentBase extends Block<MessageFooterProps> {
    private _messageRule = new RegExp(ValidateRules.notEmpty);

    constructor(props: MessageFooterProps) {
        super(props);
        this.addEvents();
    }

    protected addEvents() {
        this.setProps({
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    const data: any[] = [...new FormData(e.target as HTMLFormElement)];
                    const entries = new Map(data);
                    const result = Object.fromEntries(entries);
                    const checkMessage = this._messageRule.test(data[0][1].toString());
                    if (checkMessage) {
                        messagesController.sendMessage(this.props.selectedChatId, result.message);
                        const inputMessage =
                            <HTMLInputElement> this.children.inputMessage.element;
                        inputMessage.value = '';
                    }
                },
            },
        });
    }

    protected initChildren(): void {
        this.children.inputMessage = new Input({
            name: 'message',
            type: 'text',
            pattern: ValidateRules.notEmpty,
        });
        this.children.messageSender = new MessageSender({
            type: 'submit',
        });
    }

    componentDidUpdate(oldProps: MessageFooterProps, newProps: MessageFooterProps): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { importIcon, sendMessage, ...this.props });
    }
}

const withselectedChatId = withStore((state: any) => ({
    selectedChatId: state.selectedChatId,
}));
export const MessageFooterComponent = withselectedChatId(MessageFooterComponentBase);
