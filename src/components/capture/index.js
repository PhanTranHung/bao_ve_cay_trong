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

const Capture = ({ navigation, route, ...props }) => {
	return (
		<SafeAreaView style={[styles.fullScreen]}>
			<View>
				<Text>this is Capture screen</Text>

				<Text>from {route.params.name} screen</Text>
			</View>
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

export default Capture;
