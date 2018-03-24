import React from 'react';
import { shallowToJson } from 'enzyme-to-json';

import { Gallery } from './../../client/src/components/Gallery.jsx';

describe('<Gallery/>', () => {
	let component = shallow(
		<Gallery photos={[{id: 'id'}]} />
	);

	it('should render', () => {
		expect(shallowToJson(component)).toMatchSnapshot();
	});

});