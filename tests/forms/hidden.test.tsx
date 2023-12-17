import { h } from 'preact';
import { mount } from 'enzyme';
import React from 'react';
import { StoreProvider } from '@preact-hooks/unistore';
import store from '../../src/store';
import { TextInput } from '../../src/forms/text-input';

const control = {
    name: 'code',
    type: 'hidden',
    attributes: {
        style: 'width: 20px',
        className: 'kode',
    }
    
}
describe('Test for Hidden input form component', () => {
    it('should render correctly', ()=>{
        const wrapper = mount(<StoreProvider value={store}>
                                <TextInput control={control} />
                            </StoreProvider>);                                                   
        expect(wrapper.find('input.kode')).toHaveLength(1)       
    })
});
