import { h } from 'preact';
import { mount } from 'enzyme';
import React from 'react';
import { StoreProvider } from '@preact-hooks/unistore';
import store from '../../src/store';
import { Checkbox } from '../../src/forms/checkbox';

const control = {
    type: "checkbox",
    name: "teaching?",
    value: '',
    attributes: {
        placeholder: "Teaching",
        className: "teaching",
    },
    options: {
        value_options: {
            '0': 'teaching',
            '1': 'non-teaching'
        }
    }
}
describe('Test for Checkbox form component', () => {
    it('should render correctly', ()=>{
        const wrapper = mount(<StoreProvider value={store}>
                                <Checkbox control={control} />
                            </StoreProvider>);
        expect(wrapper.find('input.teaching')).toHaveLength(2)
        expect(wrapper.find('[type="hidden"]')).toHaveLength(2)        
    })
});
