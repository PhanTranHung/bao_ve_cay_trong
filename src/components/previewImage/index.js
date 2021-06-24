import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	FlatList,
	ToastAndroid,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { hasReadExternalStoragePermission } from 'until/permission';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Screens from 'until/screens';
import CloseDuotone from 'assests/imgs/crops/svgs/close-duotone.svg';
import { SvgCss } from 'react-native-svg';

const send = (
	image,
	url = 'http://192.168.1.3:8080/predict',
	options = { method: 'POST', headers: {} },
) => {
	const { method, headers } = options;
	// console.warn(REACT_APP_ENV_POINT);

	const img = {
		uri: image,
		type: 'image/jpeg',
		name: 'disease.jpg',
	};

	const body = new FormData();
	body.append('img', img);
	// body.append('img2', img);
	body.append('disease', 'aaaaaaaaaaaaaaaa');
	console.log(body, image);

	return axios({
		url: url,
		data: body,
		method: method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data',
			...headers,
		},
	})
		.then(rs => rs.data)
		.catch(e => console.error(e));
};

const PreviewImage = ({ navigation, route, ...props }) => {
	const [listImage, setListImage] = useState(route.params.listImage || []);

	hasReadExternalStoragePermission()
		// .then(() => console.log('hasReadExternalStoragePermission'))
		.catch(e => console.warn(e));

	// console.log(`list image ................`, listImage);

	const predictImage = () => {
		if (listImage.length <= 0)
			return ToastAndroid.show('Không có ảnh nào', ToastAndroid.SHORT);

		listImage.map(img => {
			send(img.uri)
				.then(rs => {
					console.log('Success:::', rs);
					navigateToResultScreen(rs.data.describe);
				})
				.catch(rs => navigateToResultScreen(rs.data.describe));
		});
	};

	const navigateToResultScreen = html => {
		// Pass html here
		navigation.navigate(Screens.RESULT, { html });
	};

	const handleBack = () => navigation.goBack();

	const removeImageAt = index => {
		listImage.splice(index, 1);
		// console.log('removeImageAt: ', index, listImage.length);
		if (listImage.length <= 0) return navigation.goBack();
		setListImage([...listImage]);
	};

	const renderImageItem = ({ item, index, separators }) => {
		return (
			<View key={item.uri} style={styles.boudingBox}>
				<Image
					style={[
						styles.image,
						{ aspectRatio: item.width / item.height },
					]}
					source={{ uri: item.uri }}
				/>
				<View style={styles.removeButton}>
					<TouchableOpacity onPress={() => removeImageAt(index)}>
						<View>
							<SvgCss
								width={40}
								height={40}
								color='white'
								xml={CloseDuotone}
							/>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	console.log('render...........................................');
	return (
		<SafeAreaView style={[styles.fullScreen]}>
			<View style={styles.fullScreen}>
				<View style={styles.navbar}>
					<TouchableOpacity
						style={styles.backButton}
						onPress={handleBack}>
						<Icon name='chevron-left' size={30} color='#484848' />
					</TouchableOpacity>
				</View>
				<FlatList
					data={listImage}
					renderItem={renderImageItem}
					keyExtractor={item => item.uri}
				/>
				<View style={styles.bottomActions}>
					<TouchableOpacity
						onPress={predictImage}
						style={styles.scanButton}>
						<Text style={styles.text}>Chuẩn đoán</Text>
					</TouchableOpacity>
				</View>
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
	navbar: {
		width: '100%',
		height: 56,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: 'white',
		borderBottomColor: '#e4e4e4',
		borderBottomWidth: 1,
	},
	image: {
		width: '100%',
	},
	removeButton: {
		position: 'absolute',
		top: 10,
		right: 10,
	},
	backButton: {
		width: 50,
		height: '100%',
		// borderColor: 'red',
		// borderWidth: 2,
		// borderStyle: 'solid',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	boudingBox: {
		position: 'relative',
		paddingVertical: 16,
		paddingHorizontal: 16,
	},
	bottomActions: {
		width: '100%',
		height: 64,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		borderTopColor: '#e4e4e4',
		borderTopWidth: 1,
	},
	scanButton: {
		width: '50%',
		height: '90%',
		// borderColor: '#d2ffd0',
		// borderWidth: 1,
		// borderStyle: 'solid',

		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		backgroundColor: '#28a745',
	},
	text: {
		fontSize: 24,
		color: 'white',
	},
});

export default PreviewImage;
