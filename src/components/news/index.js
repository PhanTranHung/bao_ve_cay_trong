import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Searchbar from 'components/features/searchbar';
import { Body, Card, CardItem, Content, Header, Right } from 'native-base';

import data from 'src/sample-data.json';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/core';
import Screens from 'until/screens';

console.log(Object.keys(data));

const News = () => {
	const navigation = useNavigation();
	const moveto = (screen, data) => {
		navigation.navigate(screen, data);
	};
	const renderListItem = (item, index) => {
		const { describe, summary, title, view, createAt } = item;
		return (
			<Card style={styles.card} key={index}>
				<TouchableOpacity
					onPress={() => moveto(Screens.RESULT, { html: describe })}>
					<CardItem>
						<View style={{ width: '80%' }}>
							<Text style={styles.cardTitle}>{title}</Text>
						</View>
						<View
							style={{
								width: '20%',
								display: 'flex',
								alignItems: 'flex-end',
							}}>
							<View style={styles.row}>
								<FAIcon name='eye' color='#8e908c' />
								<Text note>{view}</Text>
							</View>
							<View>
								<Text note>{createAt}</Text>
							</View>
						</View>
					</CardItem>
					<CardItem>
						<Body>
							<Text>{summary}</Text>
						</Body>
					</CardItem>
				</TouchableOpacity>
			</Card>
		);
	};
	return (
		<SafeAreaView style={[styles.fullScreen, styles.flex1]}>
			<View style={[styles.fullScreen, styles.flex]}>
				<View style={styles.searchBar}>
					<Searchbar />
				</View>
				<Content style={styles.flastListContainer}>
					{data?.news.map(renderListItem)}
				</Content>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	fullScreen: {
		width: '100%',
		height: '100%',
		// backgroundColor: 'white',
	},
	flex: {
		display: 'flex',
		// flexWrap: 'wrap',
		// flexDirection: 'column',
	},
	flex1: {
		// flex: 1,
	},
	flastListContainer: {
		paddingHorizontal: '2%',
	},
	flastList: {
		// height: '100%',
	},
	searchBar: {
		// height: 80,
		// display: 'flex',
	},
	cardTitle: {
		fontSize: 20,
		color: '#5cb85c',
	},
	card: {
		borderRadius: 8,
		overflow: 'hidden',
	},
	row: {
		display: 'flex',
		// justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export default News;
