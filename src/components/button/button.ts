import { Block } from '../../utils/Block';
import template from './button.hbs';

type ButtonProps = {
    label: string;
    type: string;
    events?: {
        click?: () => void;
    }
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
