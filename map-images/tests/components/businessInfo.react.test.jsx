import React from 'react';
import { shallowToJson } from 'enzyme-to-json';

import { BusinessInfo } from './../../client/src/components/BusinessInfo.jsx';

describe('<BusinessInfo/>', () => {
	let component = shallow(<BusinessInfo business={{}}/>);

	it('should render with empty business object', () => {
		expect(shallowToJson(component)).toMatchSnapshot();
	});
});