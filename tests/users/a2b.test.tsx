import { h } from 'preact';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { xhr } from '../../src/components/parts/http'; //wrapper around axios
import { resp_data } from '../index/data'; //mocked data
import App from '../../src/components/app'
import { route } from 'preact-router';
import { StoreProvider } from '@preact-hooks/unistore';
import store from '../../src/store';
import A2b from '../../src/routes/users/a2b';
import { createMemoryHistory } from "history";

const nextTick = async () => {
    return new Promise(resolve => {
        setTimeout(resolve, 0)
    })
}

const elems = {
    kode: {
      type: "text",
      name: "kode",
      hint: null,
      order: null,
      reorder: null,
      className: "align-center",
      attributes: {
        className: 'kode',
        style: "width: 130px;font-weight: bold;display:inline-block",
        placeholder: "Access Code",
        value: null
      }
    },
      action: {
      type: "button",
      name: "action",
      className: "mt10 align-center",
      attributes: {
        label: "Send",
        error: "display:none",
        style: "width: 100px;font-weight: bold",
        id: "elems",
        target_options: {
          exclude: "action",
          fetched: "ki,msg",
          url: "/users/key",
          action: "KODE",
          method: "POST"
        },
        value: null
      }
    }
  }
describe('Test for Users/A2b', () => {
    it('should render A2b component correctly', ()=>{
        const wrapper = mount(<StoreProvider value={store}>
                                <A2b />
                            </StoreProvider>);
        expect(wrapper.find('div.ellipsis')).toHaveLength(1) // loading displayed
        expect(wrapper.find('p')).toHaveLength(0)
        expect(wrapper.find('input')).toHaveLength(0)
        expect(wrapper.find('button')).toHaveLength(0)

        store.setState({elems})
        wrapper.update();

        expect(wrapper.find('div.ellipsis')).toHaveLength(0)
        expect(wrapper.find('input.kode')).toHaveLength(1)
        expect(wrapper.find('button#elems')).toHaveLength(1)
        expect(wrapper.find('p').text()).toContain('Please enter your access code below:')        
    })

    it('should redirect from A2b component to Okam component on successfull provision of access code', async () => {
        jest.spyOn(xhr, 'post').mockResolvedValue({
            data: resp_data,
            status: 200
        })
        const history = createMemoryHistory();
        history.push('/users/a2b', {})
        const wrapper = mount(<App history={history} />);
        console.log(wrapper.debug());
    });
});
