import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { GOOGLE_API_KEY } from './../keys';

class Map extends React.PureComponent {
	static propTypes = {
		longitude: PropTypes.number,
		latitude: PropTypes.number,
	}

	static defaultProps = {
		longitude: 0.0,
		latitude: 0.0,
	}

	static miniMap = styled.img`
		border: 1px solid #cccccc;
		width: 285px;
		height: 135px;
		cursor: pointer;
	`;

	onClick = () => {
		console.log(this.props.latitude, this.props.longitude);
	}

	getMapUri = () => {
		return `
			https://maps.googleapis.com/maps/api/staticmap
				?key=${GOOGLE_API_KEY}
				&zoom=13
				&size=285x135
				&maptype=roadmap
				&markers=color:red%7Clabel:S%7C
				${this.props.latitude},
				${this.props.longitude}
		`;
	}

	render() {
		return (
			<Map.miniMap
				src={this.getMapUri()}
				onClick={this.onClick}
			/>
		);
	}
}

export { Map };