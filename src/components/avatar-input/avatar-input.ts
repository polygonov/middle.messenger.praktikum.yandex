import { Block } from '../../utils/Block';
import template from './avatar-input.hbs';

type AvatarInputProps = {
    name: string;
    type: string;
    pattern?: string;
    id?: string;
    events?: {
        click?: () => void;
        input?: () => void;
    }
}

export class AvatarInput extends Block<AvatarInputProps> {
    constructor(props: AvatarInputProps) {
        super(props);
    }

    render() {
        return this.compile(template, { ...this.props });
    }
}
