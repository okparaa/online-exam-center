import { h } from 'preact';
import { mount } from 'enzyme';
import React from 'react';
import { StoreProvider } from '@preact-hooks/unistore';
import store from '../../src/store';
import { Button } from '../../src/forms/button';

const control = {
    name: 'action',
    type: 'Button',
    order: 28, 
    reorder: 28,
    className: 'align-center',
    attributes: {
        label: 'Add Course',
        className: 'btn',
        id: 'action',
        style: "width: 30%",
        target_options:  {
            exclude: 'action',
            fetched: 'elements, errors',
            url:  '/courses/course',
            method:  'POST',
        }
    }
}
describe('Test for Button input form component', () => {
    it('should render correctly', ()=>{
        const wrapper = mount(<StoreProvider value={store}>
                                <Button control={control} />
                            </StoreProvider>);                                                                              
        expect(wrapper.find('button#action')).toHaveLength(1)
        expect(wrapper.find('button#action').text()).toContain('Add Course')
    })
});
