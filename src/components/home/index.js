import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	ScrollView,
	Image,
	Dimensions,
	Platform,
	TouchableOpacity,
} from 'react-native';

import Banner from './banner';
import Crops from './crops';
import Screens from 'until/screens';
import { useRoute } from '@react-navigation/core';

const Home = ({ navigation, route, ...props }) => {
	console.log(route.params);

	const [crops, setCrops] = useState(route.params.selectedCrops);
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		navigation.navigate(Screens.CAPTURE, {
	// 			name: 'Home',
	// 			crop: 'rice',
	// 		});
	// 		console.log('Navigating');
	// 	}, 5000);
	// }, []);

	return (
		<SafeAreaView style={[styles.fullScreen]}>
			<ScrollView>
				<View style={styles.fullScreen}>
					<Banner />
					<Crops crops={crops} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	fullScreen: {
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
	},
});

export default Home;
