import { h } from 'preact';
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { xhr } from '../../src/components/parts/http'; //wrapper around axios
import { resp_data } from './data'; //mocked data
import App from '../../src/components/app'
import { route } from 'preact-router';
import { StoreProvider } from '@preact-hooks/unistore';
import Index from '../../src/routes/index';
import store from '../../src/store';

const nextTick = async () => {
    return new Promise(resolve => {
        setTimeout(resolve, 0)
    })
}
describe('Test for Index/Login & Users/A2b', () => {
    it('should render login page with three paragraphs and Login component', ()=>{
        const wrapper = mount(<StoreProvider value={store}>
                                <Index />
                            </StoreProvider>);
        expect(wrapper.find('p')).toHaveLength(3);
        expect(wrapper.find('Login')).toHaveLength(1);
        expect(wrapper.find('input.username')).toHaveLength(1)
        expect(wrapper.find('input.password')).toHaveLength(1);
        expect(wrapper.find('button#elems')).toHaveLength(1)
    })

    it('should redirect to from Login to A2b on successfull login', async () => {
        jest.spyOn(xhr, 'post').mockResolvedValue({
            data: resp_data,
            status: 200
        })
        const wrapper = mount(<App />);
        const username = wrapper.find('input.username')
        username.getDOMNode().setAttribute('value','ukadikeaustin@gmail.com')
        username.simulate('input')       
        const password = wrapper.find('input.password')
        password.getDOMNode().setAttribute('value', 'intell')
        password.simulate('input') 
        wrapper.find('button#elems').simulate('click')
    
        route('/users/a2b');
        wrapper.update()
        expect(wrapper.contains(<div className='ellipsis' />)).toBe(true)
        
        await nextTick()// a delay to wait for the mocked api call to complete the fetch request

        route('/users/a2b') // I have to call this again to keep the wrapper on the A2b component
        wrapper.update() //

        expect(wrapper.find('p').text()).toContain('Please enter your access code below:');
    });
});
