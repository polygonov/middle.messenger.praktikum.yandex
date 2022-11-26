import { Block } from '../../utils/Block';
import template from './avatar.hbs';
import memoji from '../../../static/memoji.png';

type AvatarProps = {
    events?: {
        click?: () => void;
    }
}

export class AvatarComponent extends Block {
    constructor(props: AvatarProps) {
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
