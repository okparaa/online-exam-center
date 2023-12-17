import { h } from 'preact';
import { mount } from 'enzyme';
import React from 'react';
import { StoreProvider } from '@preact-hooks/unistore';
import store from '../../src/store';
import { TextInput } from '../../src/forms/text-input';

const control = {
    name: 'code',
    hint: 'Course Code (eg. GEO 432)',
    order: 6,
    reorder: 6,
    className: 'course_wrap',
    options: {},
    attributes: {
        className: 'course_code',
        id: 'code',
        style: 'width: 25%',
        placeholder: 'Course Code',
        smallclass : "help",
    }
}
describe('Test for Text input form component', () => {
    it('should render correctly', ()=>{
        const wrapper = mount(<StoreProvider value={store}>
                                <TextInput control={control} />
                            </StoreProvider>);                            
        expect(wrapper.find('input.course_code')).toHaveLength(1)
        expect(wrapper.find('small.help')).toHaveLength(1)
        expect(wrapper.find('small.help').text()).toContain('Course Code (eg. GEO 432)')       
    })
});
