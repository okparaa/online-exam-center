import { h } from 'preact';
import { mount } from 'enzyme';
import React from 'react';
import { StoreProvider } from '@preact-hooks/unistore';
import store from '../../src/store';
import Inputs from '../../src/forms/inputs';

const controls = [
    {
        name: 'hidden_code',
        type: 'hidden',
        attributes: {
            style: 'width: 20px',
            className: 'kode',
            id: 'kode'
        }
    },
    {
        name: 'code',
        type: 'text',
        hint: 'Course Code (eg. GEO 432)',
        order: 6,
        reorder: 6,
        className: 'course_wrap',
        attributes: {
            className: 'course_code',
            id: 'code',
            style: 'width: 25%',
            placeholder: 'Course Code',
            smallclass : "help",
        }
    },
    {
        type: "checkbox",
        name: "teaching?",
        attributes: {
            placeholder: "Teaching",
            className: "teaching",
            wclass: 'teach',
        },
        options: {
            value_options: {
                '0': 'teaching',
            }
        }
    },
    {
        name: 'action',
        type: 'button',
        order: 28, 
        reorder: 28,
        className: 'align-center',
        attributes: {
            label: 'Add Course',
            className: 'btn',
            style: "width: 30%",
            id: 'action',
            target_options:  {
                exclude: 'action',
                fetched: 'elements, errors',
                url:  '/courses/course',
                method:  'POST',
            }
        }
    }
]    

describe('Test for Inputs component', () => {
    it('should render Hidden input component correctly', ()=>{
        const wrapper = mount(<StoreProvider value={store}>
                                {
                                    controls.map((control, key)=>(
                                        <Inputs control={control} key={key} />
                                    ))
                                }
                            </StoreProvider>);                                                                              
        expect(wrapper.find('[name="hidden_code"]')).toHaveLength(1)   
    })
    it('should render Text input component correctly', ()=>{
        const wrapper = mount(<StoreProvider value={store}>
                                {
                                    controls.map((control, key)=>(
                                        <Inputs control={control} key={key} />
                                    ))
                                }
                            </StoreProvider>);                                                   
        expect(wrapper.find('input.course_code')).toHaveLength(1)
        expect(wrapper.find('small.help')).toHaveLength(1)
        expect(wrapper.find('small.help').text()).toContain('Course Code (eg. GEO 432)') 
    })
    it('should render Checkbox input component correctly', ()=>{
        const wrapper = mount(<StoreProvider value={store}>
                                {
                                    controls.map((control, key)=>(
                                        <Inputs control={control} key={key} />
                                    ))
                                }
                            </StoreProvider>);                                                   
        expect(wrapper.find('input.teaching')).toHaveLength(1)
        expect(wrapper.find('input.teach')).toHaveLength(1)
    })
    it('should render Button component correctly', ()=>{
        const wrapper = mount(<StoreProvider value={store}>
                                {
                                    controls.map((control, key)=>(
                                        <Inputs control={control} key={key} />
                                    ))
                                }
                            </StoreProvider>);                                                   
        expect(wrapper.find('button#action')).toHaveLength(1)
        expect(wrapper.find('button#action').text()).toContain('Add Course')
    })
});
