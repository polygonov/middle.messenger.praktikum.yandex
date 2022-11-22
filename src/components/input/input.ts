import { Block } from '../../utils/Block';
import template from './input.hbs';

type InputProps = {
    minLength: number;
    maxLength: number;
    type: string;
    pattern: string;
    events?: {
        click?: () => void;
    }
}

export class Input extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
