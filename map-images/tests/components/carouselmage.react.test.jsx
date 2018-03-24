import React from 'react';
import { shallowToJson } from 'enzyme-to-json';

import { CarouselImage } from './../../client/src/components/CarouselImage.jsx';

describe('<CarouselImage/>', () => {

	it('should render', () => {
		let component = shallow(<CarouselImage/>);
		expect(shallowToJson(component)).toMatchSnapshot();
	});

	it('should be hoverable', () => {
		let hovered = false;
		let onHover = () => {
			hovered = true;
		}
		let component = shallow(<CarouselImage onMouseEnter={onHover}/>);

		expect(hovered).toEqual(false);
		component.simulate('mouseEnter');
		expect(hovered).toEqual(true);
	});
});