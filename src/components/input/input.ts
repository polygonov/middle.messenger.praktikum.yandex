import { Block } from '../../utils/Block';
import template from './input.hbs';

type InputProps = {
    name: string;
    type: string;
    pattern: string;
    placeholder?: string;
    events?: {
        click?: () => void;
        input?: (e?: any) => void;
    }
}

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
