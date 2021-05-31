import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SvgCss } from 'react-native-svg';
import RiceSvg from 'assests/imgs/crops/svgs/rice.svg';
import CornSvg from 'assests/imgs/crops/svgs/corn.svg';
import PepperSvg from 'assests/imgs/crops/svgs/pepper.svg';
import LemonSvg from 'assests/imgs/crops/svgs/lemon.svg';
import ChilliSvg from 'assests/imgs/crops/svgs/chilli.svg';
import MangoSvg from 'assests/imgs/crops/svgs/mango.svg';
import GrapefruitSvg from 'assests/imgs/crops/svgs/grapefruit.svg';
import GrapesSvg from 'assests/imgs/crops/svgs/grapes.svg';
import { useNavigation, useRoute } from '@react-navigation/native';

import Screens from 'until/screens';

const listCrop = [
	{
		id: 'rice',
		name: 'Lúa',
		svgIcon: RiceSvg,
		route: Screens.FEATURES,
	},
	{
		id: 'corn',
		name: 'Ngô',
		svgIcon: CornSvg,
	},
	{
		id: 'pepper',
		name: 'Tiêu',
		svgIcon: PepperSvg,
	},
	{
		id: 'lemon',
		name: 'Chanh',
		svgIcon: LemonSvg,
	},
	{
		id: 'chilli',
		name: 'Ớt',
		svgIcon: ChilliSvg,
	},
	{
		id: 'mango',
		name: 'Xoài',
		svgIcon: MangoSvg,
	},
	{
		id: 'grapefruit',
		name: 'Bưởi',
		svgIcon: GrapefruitSvg,
	},
	{
		id: 'grapes',
		name: 'Nho',
		svgIcon: GrapesSvg,
	},
];

const Crops = ({ crops }) => {
	const navigation = useNavigation();
	const route = useRoute();
	const selectedCrops = route.params['selectedCrops'];

	const handlePress = (route, crop) => {
		// console.log('press');
		if (!route) return;
		console.log('press');
		navigation.navigate(route, {
			from: Screens.HOME,
			crop: crop,
		});
	};

	console.log('Home', crops, route.params);

	return (
		<View style={[styles.container]}>
			<View style={[styles.boudingBox]}>
				<Text style={styles.title}>Quan tâm</Text>
				<View style={[styles.flexBox]}>
					{listCrop.map(({ id, name, route, svgIcon }) =>
						!selectedCrops[id] ? undefined : (
							<View key={name} style={styles.flexItem}>
								<TouchableOpacity
									style={[styles.opacityButton]}
									onPress={() => handlePress(route, name)}>
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
						),
					)}
				</View>
			</View>
			<View style={[styles.boudingBox]}>
				<Text style={styles.title}>Cây khác</Text>
				<View style={[styles.flexBox]}>
					{listCrop.map(({ id, name, route, svgIcon }) =>
						selectedCrops[id] ? undefined : (
							<View key={name} style={styles.flexItem}>
								<TouchableOpacity
									style={[styles.opacityButton]}
									onPress={() => handlePress(route, name)}>
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
						),
					)}
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
		borderColor: '#e0e0e0',
		borderWidth: 1,
		borderRadius: 16,
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
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});

export default Crops;
