import React from 'react';
import PropTypes from 'prop-types';

import { FlexDiv } from './styledComponents';
import { CarouselImage } from './CarouselImage.jsx';
import { Gallery } from './Gallery.jsx';

class Carousel extends React.Component {
	static propTypes = {
		business: PropTypes.object,
		photos: PropTypes.array,
	};

	static defaultProps = {
		business: {},
		photos: [],
	};

	constructor(props) {
		super(props);

		this.state = {
			galleryOpen: false,
			galleryStartPage: 0,
			hoveredIndex: 1,
		};
	};

	/* called when a carousel image is clicked */
	itemOnClick = (index) => {
		this.setState({
			galleryOpen: true,
			galleryStartPage: index
		});
	}

	/* called when the gallery is closed */
	galleryClose = () => {
		this.setState({galleryOpen: false});
	}

	/** called to enlarge a carousel image
	 * @param {number} carouselImageIndex Carousel Image to enlarge */
	enlarge = (carouselImageIndex) => {
		this.setState({ hoveredIndex: carouselImageIndex});
	}

	render() {
		return (
			<FlexDiv>
				{this.props.photos.slice(0, 3).map((photo, i) => {
					return <CarouselImage key={i}
						image={photo} business={this.props.business}
						onClick={this.itemOnClick.bind(null, i)}
						enlarged={this.state.hoveredIndex === i}
						onMouseEnter={this.enlarge.bind(this, i)}
						onMouseLeave={this.enlarge.bind(this, 1)}
					/>
				})}

				{
					this.state.galleryOpen
					? <Gallery photos={this.props.photos} business={this.props.business}
							initialIndex={this.state.galleryStartPage} onClose={this.galleryClose}/>
					: undefined
				}
			</FlexDiv>
		)
	}
};

export { Carousel };