import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { SvgCssUri, SvgXml, SvgCss } from 'react-native-svg';
import RiceSvg from 'assests/imgs/crops/svgs/rice.svg';
import CornSvg from 'assests/imgs/crops/svgs/corn.svg';
import PepperSvg from 'assests/imgs/crops/svgs/pepper.svg';
import LemonSvg from 'assests/imgs/crops/svgs/lemon.svg';
import ChilliSvg from 'assests/imgs/crops/svgs/chilli.svg';
import MangoSvg from 'assests/imgs/crops/svgs/mango.svg';
import GrapefruitSvg from 'assests/imgs/crops/svgs/grapefruit.svg';
import GrapesSvg from 'assests/imgs/crops/svgs/grapes.svg';

const listCrop = [
	{
		name: 'Lúa',
		svgIcon: RiceSvg,
	},
	{
		name: 'Ngô',
		svgIcon: CornSvg,
	},
	{
		name: 'Tiêu',
		svgIcon: PepperSvg,
	},
	{
		name: 'Chanh',
		svgIcon: LemonSvg,
	},
	{
		name: 'Ớt',
		svgIcon: ChilliSvg,
	},
	{
		name: 'Xoài',
		svgIcon: MangoSvg,
	},
	{
		name: 'Bưởi',
		svgIcon: GrapefruitSvg,
	},
	{
		name: 'Nho',
		svgIcon: GrapesSvg,
	},
];

const Crops = () => {
	const handlePress = () => {
		console.log('press');
	};

	return (
		<View style={[styles.container]}>
			<View style={[styles.boudingBox]}>
				<View style={[styles.flexBox]}>
					{listCrop.map(({ name, svgIcon }) => (
						<View key={name} style={styles.flexItem}>
							<TouchableOpacity
								style={[styles.opacityButton]}
								onPress={handlePress}>
								<View style={[styles.flexContentButton]}>
									<SvgCss
										width={80}
										height={80}
										xml={svgIcon}
									/>
									<Text style={[styles.buttonName]}>
										{name}
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					))}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		position: 'relative',
	},
	boudingBox: {
		padding: 16,
	},
	flexBox: {
		display: 'flex',
		flexWrap: 'wrap',
		// alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	flexItem: {
		paddingTop: '2%',
		flexBasis: '49%',
	},
	opacityButton: {
		flex: 1,
		borderColor: '#797979b5',
		borderWidth: 1,
		borderRadius: 8,
	},
	flexContentButton: {
		paddingTop: 8,
		paddingBottom: 4,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonName: {
		fontSize: 18,
	},
});

export default Crops;
