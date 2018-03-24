import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class CloseButton extends React.PureComponent {
	static propTypes = {
		onClose: PropTypes.func,
	}

	static container = styled.div`
		text-align: center;
		color: lightgray;
		cursor: pointer;
		font-size: 16pt;
		user-select: none;

		&:hover {
			color: white;
		}
	`;

	render() {
		return (
			<CloseButton.container
				onClick={this.props.onClose}>
				exit ✕
			</CloseButton.container>
		);
	}
}

export { CloseButton };