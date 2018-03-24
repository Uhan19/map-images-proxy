import React from 'react';
import { shallowToJson } from 'enzyme-to-json';

import { CloseButton } from './../../client/src/components/CloseButton.jsx';

describe('<CloseButton/>', () => {

	it('should render with long and lat props', () => {
		let component = shallow(<CloseButton/>);
		expect(shallowToJson(component)).toMatchSnapshot();
	});

	it('should render without props', () => {
		let component = shallow(<CloseButton/>);
		expect(shallowToJson(component)).toMatchSnapshot();
	});
});