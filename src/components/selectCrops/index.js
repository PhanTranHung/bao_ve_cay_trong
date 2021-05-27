import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	ImageBackground,
	Image,
} from 'react-native';
import { SvgCss } from 'react-native-svg';
import RiceSvg from 'assests/imgs/crops/svgs/rice.svg';
import CornSvg from 'assests/imgs/crops/svgs/corn.svg';
import PepperSvg from 'assests/imgs/crops/svgs/pepper.svg';
import LemonSvg from 'assests/imgs/crops/svgs/lemon.svg';
import ChilliSvg from 'assests/imgs/crops/svgs/chilli.svg';
import MangoSvg from 'assests/imgs/crops/svgs/mango.svg';
import GrapefruitSvg from 'assests/imgs/crops/svgs/grapefruit.svg';
import GrapesSvg from 'assests/imgs/crops/svgs/grapes.svg';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Screens from 'until/screens';
// import {  } from 'react-native-gesture-handler';

const listCrop = [
	{
		id: 'rice',
		name: 'Lúa',
		svgIcon: RiceSvg,
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

const SelectCrops = ({ navigation, ...props }) => {
	const [crops, setCrops] = useState({});

	const handlePress = (id, crop) => {
		setCrops({ ...crops, [id]: !crops[id] });
	};

	const goToHome = () => {
		Object.keys(crops).forEach(k => !crops[k] && delete crops[k]);

		//const selectedCrops =  Object.entries(crops)
		// 	.filter(([k, v]) => v)
		// 	.map(([k, v]) => k);
		// console.log(crops);

		navigation.navigate(Screens.HOME, { selectedCrops: crops });
	};

	// console.log(crops);
	return (
		<SafeAreaView style={[styles.fullScreen, styles.backgroundImage]}>
			<ImageBackground
				source={require('assests/imgs/select-crops.png')}
				style={styles.fullScreen}>
				<View style={[styles.flexRow, styles.flexEnd, styles.topBtns]}>
					{Object.values(crops).filter(v => v).length > 0 && (
						<TouchableOpacity
							onPress={goToHome}
							style={styles.next}>
							<View style={styles.flexRow}>
								<Text style={styles.nextText}>Hoàn thành</Text>
								{/* <Icon
								name='chevron-right'
								size={32}
								color='#119016'
							/> */}
							</View>
						</TouchableOpacity>
					)}
				</View>
				<View style={[styles.title, styles.flexRow, styles.flexCenter]}>
					<Text style={[styles.titleText, styles.centerText]}>
						{`Chọn những cây trồng \nbạn đang quan tâm`}
					</Text>
				</View>

				<ScrollView>
					<View style={[styles.container, styles.fullScreen]}>
						<View style={[styles.boudingBox]}>
							<View style={[styles.flexBox]}>
								{listCrop.map(({ id, name, svgIcon }) => (
									<View key={id} style={styles.flexItem}>
										<TouchableOpacity
											style={[styles.opacityButton]}
											onPress={() =>
												handlePress(id, name)
											}>
											<View
												style={[
													styles.flexContentButton,
												]}>
												<SvgCss
													width={80}
													height={80}
													xml={svgIcon}
												/>
												<Text
													style={[styles.buttonName]}>
													{name}
												</Text>
												{crops[id] === true && (
													<View
														style={[
															styles.checked,
														]}>
														<Icon
															name='check'
															size={24}
															color='#119016'
														/>
													</View>
												)}
											</View>
										</TouchableOpacity>
									</View>
								))}
							</View>
						</View>
					</View>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	// imageBackground: {
	//   width:
	// },
	fullScreen: {
		width: '100%',
		height: '100%',
	},
	title: {
		height: '25%',

		// borderColor: '#797979b5',
		// borderWidth: 1,
	},
	titleText: {
		fontSize: 24,
		color: 'white',
	},
	checked: {
		position: 'absolute',
		top: 4,
		right: 8,
	},
	container: {
		flex: 1,
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
	flexRow: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
	flexEnd: { justifyContent: 'flex-end' },
	flexCenter: { justifyContent: 'center', alignItems: 'center' },
	centerText: {
		textAlign: 'center',
	},
	flexItem: {
		paddingTop: '2%',
		flexBasis: '49%',
	},
	opacityButton: {
		flex: 1,
		// borderColor: '#797979b5',
		// borderWidth: 1,
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
	hide: {
		display: 'none',
	},
	next: {
		padding: 4,
		// borderColor: '#797979b5',
		// borderWidth: 1,
		// backgroundColor: '#48d02f',
		borderRadius: 8,
		marginRight: 16,
		// marginLeft: 16,
		marginVertical: 8,
	},
	topBtns: {
		height: 62,
	},
	nextText: {
		paddingRight: 4,
		paddingLeft: 4,
		fontSize: 24,
		// color: '#119016',
		color: 'white',
		fontWeight: 'bold',
	},
});

export default SelectCrops;
