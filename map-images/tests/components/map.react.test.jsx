import React from 'react';
import { shallowToJson } from 'enzyme-to-json';

import { Map } from './../../client/src/components/Map.jsx';

describe('<Map/>', () => {

	it('should render with long and lat props', () => {
		let component = shallow(<Map longitude={0} latitude={0}/>);
		expect(shallowToJson(component)).toMatchSnapshot();
	});

	it('should render without props', () => {
		let component = shallow(<Map/>);
		expect(shallowToJson(component)).toMatchSnapshot();
	});
});