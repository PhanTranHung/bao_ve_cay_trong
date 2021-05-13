import { useIsFocused } from '@react-navigation/core';
import React, { useRef, useState } from 'react';
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
import { RNCamera } from 'react-native-camera';
import CaptureButton from './captureButton';

const { width, height } = Dimensions.get('window');

const Capture = ({ navigation, route, ...props }) => {
	const camera = useRef(null);
	const [camIsReady, setCamReady] = useState(false);

	const handleCamReady = () => {
		setCamReady(true);
	};

	const isFoucused = useIsFocused();

	if (!isFoucused) return <View />;
	return (
		<SafeAreaView style={[styles.fullScreen]}>
			<View style={styles.container}>
				<View style={styles.cameraLayout}>
					<View style={styles.toolBar}></View>
					<View style={styles.cameraBox}>
						<RNCamera
							ref={camera}
							style={styles.cameraPreview}
							type={RNCamera.Constants.Type.back}
							useNativeZoom={true}
							flashMode={RNCamera.Constants.FlashMode.off}
							captureAudio={false}
							focusDepth={0.5}
							androidCameraPermissionOptions={{
								title: 'Cho phép ứng dụng này truy cập vào Camera của bạn?',
								message:
									'Ứng dụng cần quyền truy cập vào Camera để chụp ảnh',
								buttonPositive: 'Ok',
								buttonNegative: 'Cancel',
							}}
							onCameraReady={handleCamReady}
						/>
					</View>
					<CaptureButton
						size={100}
						color='white'
						disabled={!camIsReady}
						style={{
							...styles.captureButton,
							bottom: 100,
							left: width / 2 - 50,
						}}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	fullScreen: {
		width: '100%',
		height: '100%',
	},
	container: { position: 'relative' },
	cameraLayout: {
		position: 'relative',
	},
	cameraBox: { position: 'relative' },

	captureButton: {
		position: 'absolute',
		borderRadius: 50,
		overflow: 'hidden',
	},
	cameraPreview: {
		width: '100%',
		height: '100%',
	},
});

export default Capture;
