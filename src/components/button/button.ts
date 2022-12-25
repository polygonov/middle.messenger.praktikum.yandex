import { Block } from '../../utils/Block';
import template from './button.hbs';

type ButtonProps = {
    label: string;
    type?: string;
    className?: string;
    events?: {
        click?: () => void;
    }
}

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
