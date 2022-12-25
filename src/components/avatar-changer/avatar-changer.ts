import { Block } from '../../utils/Block';
import template from './avatar-changer.hbs';
import memoji from '../../../static/memoji.png';
import { withStore } from '../../hocs/withStore';
import { sourceLink } from '../../utils/sourceLink';

type AvatarChangerProps = {
    events?: {
        click?: () => void;
    }
}

export class AvatarChangerComponentBase extends Block<AvatarChangerProps> {
    constructor(props: AvatarChangerProps) {
        super(props);
    }

    protected initChildren(): void {
    }

    componentDidUpdate(oldProps: AvatarChangerProps, newProps: AvatarChangerProps): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(
            template,
            { memoji, ...this.props, sourceLink },
        );
    }
}

const withUser = withStore((state: any) => state.user);
export const AvatarChangerComponent = withUser(AvatarChangerComponentBase);
