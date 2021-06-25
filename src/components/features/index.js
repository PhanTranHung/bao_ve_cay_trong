import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Image, View } from 'react-native';

import Screens from 'until/screens';
import { useRoute } from '@react-navigation/core';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import {
	Body,
	Button,
	Card,
	CardItem,
	Container,
	Content,
	Grid,
	Icon,
	ListItem,
	Right,
	Text,
} from 'native-base';
import HTML from 'react-native-render-html';
import Searchbar from './searchbar';

const listItem = [
	{
		id: '',
		name: 'Bản tin cây lúa',
		route: Screens.NEWS,
		icon: 'desktop-outline',
		iconPostion: '',
		color: '',
	},
	{
		id: '',
		name: 'Quét bệnh',
		route: Screens.CAPTURE,
		icon: 'scan-outline',
		iconPostion: '',
		color: '',
	},
	{
		id: '',
		name: 'Tìm hiểu',
		route: Screens.STUDY,
		icon: 'library-outline',
		iconPostion: '',
		color: '',
	},
	{
		id: '',
		name: 'Thời tiết',
		route: '',
		icon: 'partly-sunny-outline',
		iconPostion: '',
		color: '',
	},
	{
		id: '',
		name: 'Lịch sử',
		route: '',
		icon: 'git-network-sharp',
		iconPostion: '',
		color: '',
	},
];

const Features = ({ navigation, route, ...props }) => {
	console.log(route.params);

	const moveto = screen => {
		if (!screen) return;
		navigation.navigate(screen, { crop: 'Rice' });
	};

	return (
		<SafeAreaView style={[styles.fullScreen]}>
			<Container>
				<Content>
					<Searchbar />
					<Content style={styles.cardBounding}>
						<Card style={styles.cardStyle}>
							<CardItem>
								<Body>
									<Text>
										Đạo ôn cổ bông nguy hại như thế nào
									</Text>
									<Text note>
										Viện giống cây trồng Việt Nam
									</Text>
								</Body>
								<Right>
									<View style={styles.row}>
										<Text style={styles.focus} note>
											mới
										</Text>
									</View>
									<View style={styles.row}>
										<FAIcon name='eye' color='#8e908c' />
										<Text note> 186</Text>
									</View>
									<View>
										<Text note>11 giờ</Text>
									</View>
								</Right>
							</CardItem>
							<CardItem cardBody>
								<Image
									source={{
										uri: 'https://www.daibieunhandan.vn/media/19/05/190508074746234/05-ngan-chan12819-489.jpg',
									}}
									style={styles.cardImageImage}
								/>
							</CardItem>
						</Card>
					</Content>
					<Body style={styles.actions}>
						<View style={styles.width90}>
							<View style={[styles.flexBox]}>
								{listItem.map((a, i) => {
									const iconPostionLeft = i % 2 != 0;
									return (
										<View
											key={a.name}
											style={styles.flexItem}>
											<Button
												onPress={() => moveto(a.route)}
												style={styles.button}
												iconLeft={iconPostionLeft}
												iconRight={!iconPostionLeft}
												light
												success
												rounded
												bordered
												block>
												{iconPostionLeft && (
													<Icon name={a.icon} />
												)}
												<Text>{a.name}</Text>
												{!iconPostionLeft && (
													<Icon name={a.icon} />
												)}
											</Button>
										</View>
									);
								})}
							</View>
						</View>
						{/* <Body style={styles.htmlcontainer}>
						<HTML source={{ html }} />
					</Body> */}
					</Body>
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
	cardImageImage: {
		width: '100%',
		height: 250,
		flex: 1,
	},
	focus: {
		borderColor: '#5cb85c',
		borderWidth: 1,
		borderStyle: 'solid',
		borderRadius: 50,
		paddingLeft: 8,
		paddingRight: 6,
		color: '#5cb85c',
	},
	cardStyle: {
		// width: '96%',
		// marginHorizontal: '2%',
	},
	cardBounding: {
		paddingHorizontal: '2%',
	},
	actions: {
		paddingTop: 30,
	},
	htmlcontainer: {
		width: '80%',
	},
	width90: {
		// width: '90%',
		paddingHorizontal: '2%',
	},
	button: {
		// width: '100%',
		// display: 'flex',
		// flexDirection: 'row',
		// justifyContent: 'space-between',
		paddingVertical: 30,
	},
	flexBox: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	flexItem: {
		// width: '50%',
		flexBasis: '49%',
		paddingVertical: '1%',
	},
	row: {
		display: 'flex',
		// justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
	},
});

const html = ``;

export default Features;
