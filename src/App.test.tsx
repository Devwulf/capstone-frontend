import React from 'react';
import { shallow } from 'enzyme';
import App from "./App";

test('renders learn react link', () => {
    const wrapper = shallow(<App />);
    const link = wrapper.find({children: /learn react/i});
    expect(link.isEmptyRender()).toEqual(false);
});
