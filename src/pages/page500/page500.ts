import { Block } from '../../utils/Block';
import template from './page500.hbs';

export class Page500Page extends Block {
    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {});
    }
}
