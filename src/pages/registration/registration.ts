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
        this.children.inputEmail = new Input({
            name: 'email',
            type: 'email',
            pattern: ValideRules.email,
        });
        this.children.inputLogin = new Input({
            name: 'login',
            type: 'text',
            pattern: ValideRules.login,
        });
        this.children.inputFirstName = new Input({
            name: 'first_name',
            type: 'text',
            pattern: ValideRules.name,
        });
        this.children.inputSecondName = new Input({
            name: 'second_name',
            type: 'text',
            pattern: ValideRules.name,
        });
        this.children.inputPhone = new Input({
            name: 'phone',
            type: 'tel',
            pattern: ValideRules.phone,
        });
        this.children.inputPassword = new Input({
            name: 'password',
            type: 'password',
            pattern: ValideRules.password,
            events: {
                input: () => {
                    const passwordElement = <HTMLInputElement>this.children.inputPassword.element;
                    this.children.inputPasswordCheck.setProps({
                        pattern: '^' + passwordElement.value +'$',
                    })
                },
            }
        });
        this.children.inputPasswordCheck = new Input({
            name: 'passwordCheck',
            type: 'password',
            pattern: ValideRules.password,
        });

    }

    componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
        return super.componentDidUpdate(oldProps, newProps);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {});
    }
}
