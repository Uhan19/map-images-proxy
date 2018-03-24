import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import * as FontAwesome from "react-icons/lib/fa";

import { Map } from "./Map.jsx";

class BusinessInfo extends React.PureComponent {
  static propTypes = {
    business: PropTypes.object,
  };

  static defaultProps = {
    business: {},
  };

  static container = styled.div`
    border: 1px solid #cccccc;
    margin: 0;
    padding: 4px;
  `;

  static infoContainer = styled.div`
    display: grid;
    grid-template-columns: 32px 1fr;
    padding: 8px;
  `;

  static textItem = styled.p`
    fontsize: 10pt;
    margin: auto 0;
    padding: 0;
  `;

  static link = BusinessInfo.textItem.extend`
		color: blue;
		cursor: pointer;
	`;

  static address = BusinessInfo.textItem.extend`
		font-weight: bold;
	`;

  render() {
    const iconStyle = {
      width: "18px",
      height: "18px",
      margin: "4px auto",
      color: "darkgray",
    };

    return (
      <BusinessInfo.container>
        <Map
          longitude={this.props.business.longitude * 1 || 0.0} // get rid of the '* 1' for both for mysql
          latitude={this.props.business.latitude * 1 || 0.0}
        />

        <BusinessInfo.infoContainer>
          <FontAwesome.FaMapMarker style={iconStyle} />
          <div>
            <BusinessInfo.address>{`${
              this.props.business.address
            }`}</BusinessInfo.address>
            <BusinessInfo.address>{`${this.props.business.city}, ${
              this.props.business.state
            } ${this.props.business.postal_code}`}</BusinessInfo.address>
          </div>

          <FontAwesome.FaMapSigns style={iconStyle} />
          <BusinessInfo.link>Get Directions</BusinessInfo.link>

          {/* no phone numbers in the database */}
          <FontAwesome.FaPhone style={iconStyle} />
          <BusinessInfo.textItem>(545) 523-7964</BusinessInfo.textItem>

          <FontAwesome.FaExternalLink style={iconStyle} />
          <BusinessInfo.link>{`${
            this.props.business.name
          }.com`}</BusinessInfo.link>

          <FontAwesome.FaMobile style={iconStyle} />
          <BusinessInfo.link>Send to your phone</BusinessInfo.link>
        </BusinessInfo.infoContainer>
      </BusinessInfo.container>
    );
  }
}

export { BusinessInfo };
