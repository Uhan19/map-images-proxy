import React from 'react';
import { shallowToJson } from 'enzyme-to-json';

import { Carousel } from './../../client/src/components/Carousel.jsx';

describe('<Carousel/>', () => {
	let component = shallow(<Carousel/>);

	it('should render without props', () => {
		expect(shallowToJson(component)).toMatchSnapshot();
	});
});