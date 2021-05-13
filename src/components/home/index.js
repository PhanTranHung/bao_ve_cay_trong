import React from 'react';
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

const Home = () => {
	return (
		<SafeAreaView style={[styles.fullScreen]}>
			<ScrollView>
				<View style={styles.fullScreen}>
					<Banner />
					<Crops />
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
