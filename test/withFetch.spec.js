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

    it('loading in <FetchComponent/> is a Boolean value', () => {
        expect(getRenderedComponent().state().loading).to.be.a('boolean');
    });

    it('loading in <FetchComponent/> is true', () => {
        expect(getRenderedComponent().state().loading).to.equal(true);
    });

    it('data in <FetchComponent/> is a null value', () => {
        expect(getRenderedComponent().state().data).to.be.a('null');
    });

    it('data in <FetchComponent/> is null', () => {
        expect(getRenderedComponent().state().data).to.equal(null);
    });

    it('error in <FetchComponent/> is a null value', () => {
        expect(getRenderedComponent().state().error).to.be.a('null');
    });

    it('error in <FetchComponent/> is null', () => {
        expect(getRenderedComponent().state().error).to.equal(null);
    });
})
