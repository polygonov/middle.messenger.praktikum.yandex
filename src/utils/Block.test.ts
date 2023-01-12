import { expect } from 'chai';
import { Block } from './Block';

describe('Block', () => {
    class Component extends Block<{}> {
        render() {
            return new DocumentFragment();
        }
    }

    it('should have own id if created', () => {
        const instance = new Component({});
        const typeOfId = typeof instance.id;
        expect(typeof instance.id).to.eq(typeOfId);
    });
});
