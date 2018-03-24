import styled from 'styled-components';

const FlexDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const FlexDivCol = FlexDiv.extend`
	flex-direction: column;
`;

const Field = styled.p`
	margin: 0;
	padding: 0;
	font-size: 12pt;
`;

const SubField = Field.extend`
	font-size: 8pt;
	color: gray;
`;

export { FlexDiv, FlexDivCol, Field, SubField };