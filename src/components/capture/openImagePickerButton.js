import React, { useState } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/core';
import Screens from 'until/screens';

const openPicker = () => {
	return new Promise((res, rej) => {
		launchImageLibrary(
			{
				mediaType: 'photo',
				quality: 1,
				selectionLimit: 9,
			},
			response => {
				// console.log('Response = ', response);

				if (response.didCancel) {
					rej('User cancelled image picker');
				} else if (response.error) {
					rej('ImagePicker Error: ', response.error);
				} else if (response.customButton) {
					rej('User tapped custom button: ', response.customButton);
					alert(response.customButton);
				} else {
					// console.log('response', JSON.stringify(response));
					res(response);
				}
			},
		);
	});
};

const OpenImagePickerButton = ({
	size = 16,
	color = 'white',
	style = {},
	onPress,
	disabled = false,
	hide = false,
	...props
}) => {
	const navigation = useNavigation();

	if (hide) return null;

	if (!onPress)
		onPress = () =>
			openPicker()
				.then(res => {
					const listImage = res.assets;
					if (listImage.length >= 1)
						navigation.navigate(Screens.PREVIEW, { listImage });
				})
				.catch(console.log);

	return (
		<View style={[styles.container, style]}>
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={onPress}
				disabled={disabled}>
				<View>
					<Icon name='folder-open' size={size} color={color} solid />
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// position: 'absolute',
		// top: 100,
		// right: 100,
	},
});

export default OpenImagePickerButton;
