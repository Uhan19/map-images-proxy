import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { FlexDivCol } from './styledComponents';

class CarouselImage extends React.PureComponent {
	static propTypes = {
		business: PropTypes.object,
		image: PropTypes.object,
		enlarged: PropTypes.bool,
		onClick: PropTypes.func,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
	};

	static defaultProps = {
		business: {},
		image: {
			id: '',
			caption: '',
		},
		enlarged: false,
	};

	/** culls the caption text to be length characters long
	 * @param {string} caption The caption to cull
	 * @param {number} length The length to cull to
	 * @return the caption culled to the given length */
	cullCaption = (caption, length) => {
		caption = caption || '';
		if (caption.length >= length) {
			caption = caption.substr(length) + '...';
		}

		return caption;
	}

	static container = styled.div`
		position: relative;
		box-shadow: ${props => props.enlarged ? '0 0 32px 8px rgba(0, 0, 0, 0.2)' : ''};
	`;

	static image = styled.img`
		background: black;
		object-fit: cover;
		width: ${props => props.enlarged ? '250px' : '220px'};
		height: ${props => props.enlarged ? '250px' : '220px'};
		padding: 0;
		margin: 0;
	`;

	static label = styled.div`
		display: ${props => props.show ? 'flex' : 'none'};
		flex-direction: row;
		position: absolute;
		color: white;
		background: rgba(0,0,0,0.5);
		width: 250px;
		left: 0;
		bottom: 0;
		margin: 0;
		padding: 8px 0;
	`;

	static captionContainer = FlexDivCol.extend`
		width: 80%;
	`;

	static profileIcon = styled.img`
		visibility: hidden;
		background: lightgray;
		border-radius: 6px;
		border-width: 0;
		width: 10px;
		height: 30px;
		margin: 0 8px;
	`;

	static captionText = styled.div`
		text-align: center;
		font-size: 10pt;
		padding: 0;
	`;

	render() {
		let {id, caption} = this.props.image;

		return (
			<CarouselImage.container enlarged={this.props.enlarged}
				onClick={this.props.onClick}
				onMouseEnter={this.props.onMouseEnter}
				onMouseLeave={this.props.onMouseLeave}>

				{/* Image */}
				<CarouselImage.image enlarged={this.props.enlarged}
					src={id ? `https://s3-media4.fl.yelpcdn.com/bphoto/${id}/o.jpg` : undefined}
				/>

				{/* Caption */}
				<CarouselImage.label show={this.props.enlarged}>
					<CarouselImage.profileIcon/>

					<CarouselImage.captionContainer>
						{
							caption.length > 0
								? <CarouselImage.captionText>{this.cullCaption(caption)}</CarouselImage.captionText>
								: undefined
						}
						<CarouselImage.captionText>by {this.props.business.name || 'Anonymous'}</CarouselImage.captionText>
					</CarouselImage.captionContainer>
				</CarouselImage.label>

			</CarouselImage.container>
		);
	}
}

export { CarouselImage };