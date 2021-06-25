import { useNavigation } from '@react-navigation/core';
import Searchbar from 'components/features/searchbar';
import { Content, Icon, List, ListItem, Text } from 'native-base';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Screens from 'until/screens';

const data = require('src/sample-data.json');

const Study = () => {
	const navigation = useNavigation();
	const moveto = (screen, data) => {
		navigation.navigate(screen, data);
	};

	const renderListItem = ({ id, title, describe, name }, index) => {
		return (
			<TouchableOpacity
				key={index}
				onPress={() => {
					moveto(Screens.RESULT, { html: describe });
				}}>
				<ListItem>
					<View style={styles.flex}>
						<View style={styles.title}>
							<Text style={styles.titleText}>{title}</Text>
						</View>
						<View>
							<Icon
								style={styles.icon}
								name='chevron-forward-outline'
								color='#5cb85c'
							/>
						</View>
					</View>
				</ListItem>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style={[styles.fullScreen]}>
			<View style={[styles.fullScreen]}>
				<View style={styles.searchBar}>
					<Searchbar />
				</View>
				<Content style={styles.flastListContainer}>
					<List>{data?.study.map(renderListItem)}</List>
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
		alignItems: 'center',
		justifyContent: 'space-between',
		flex: 1,
		// flexWrap: 'wrap',
		flexDirection: 'row',
	},
	title: {
		maxWidth: '90%',
		// alignItems: 'flex-start',
		// justifyContent: 'flex-start',
	},
	titleText: {
		// textAlign: 'left',
		// alignItems: 'flex-start',
		// justifyContent: 'flex-start',
		color: '#5cb85c',
	},
	icon: { color: '#5cb85c' },
	flastListContainer: {
		// paddingHorizontal: '2%',
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
	listItemFlex: {},
});

export default Study;
