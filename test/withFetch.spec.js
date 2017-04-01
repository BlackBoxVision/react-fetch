import React from 'react';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import { withFetch } from '../src/index';

const options = {
    url: '',
    config: {

    },
    delay: 3000,
    polling: false,
    renderOnServer: false
};

const Component = ({ jsonData }) => <div>{JSON.stringify(jsonData, null, 2)}</div>
const WrappedComponent = withFetch(options)(Component);
const getRenderedComponent = (component = WrappedComponent) => shallow(React.createElement(component));

describe('Testing -> <FetchComponent/>', () => {
    it('instance of <FetchComponent/> is not undefined', () => {
        expect(getRenderedComponent()).to.not.equal('undefined');
    });

    it('instance of <Component/> wrapped in <FetchComponent/> is not undefined', () => {
        expect(getRenderedComponent().find(Component)).to.not.equal('undefined');
    });

    it('instance of <FetchComponent/> is not null', () => {
        expect(getRenderedComponent()).to.not.equal('null');
    });

    it('instance of <Component/> wrapped in <FetchComponent/> is not null', () => {
        expect(getRenderedComponent().find(Component)).to.not.equal('null');
    });

    it('linkState from <FetchComponent/> is not undefined', () => {
        expect(getRenderedComponent().find('fetchData')).to.not.equal('undefined');
    });
})
