import Input from '../../components/input';
import { Block } from '../../utils/Block';
import { ValideRules } from '../../utils/validateRules';
import template from './registration.hbs';

export class RegistrationPage extends Block {
    
    constructor() {
        super();
    }

    // todo - should add other children and submit to console log

    protected initChildren(): void {
        this.children.inputLogin = new Input({
            name: 'login',
            type: 'text',
            pattern: ValideRules.login,
        });
    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {});
    }
}
