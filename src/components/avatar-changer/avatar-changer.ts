import { Block } from '../../utils/Block';
import template from './avatar-changer.hbs';
import memoji from '../../../static/memoji.png';

type AvatarChangerProps = {
    events?: {
        click?: () => void;
    }
}

export class AvatarChangerComponent extends Block {
    constructor(props: AvatarChangerProps) {
        super(props);
    }

    protected initChildren(): void {
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, { memoji });
    }
}