import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';

// import Banner from './banner';
// import Crops from './crops';
// import Screens from 'until/screens';
import { useRoute } from '@react-navigation/core';
import HTML from 'react-native-render-html';
import { Container, Content } from 'native-base';

const result = ({ navigation, route, ...props }) => {
	console.log('PARAMS: ', route.params);
	const html = route.params.html;

	return (
		<SafeAreaView style={[styles.fullScreen]}>
			<Container>
				<Content>
					<HTML source={{ html }} />
				</Content>
			</Container>
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

export default result;
