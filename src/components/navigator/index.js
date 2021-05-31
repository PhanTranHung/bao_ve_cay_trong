import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from 'components/home';
import CaptureScreen from 'components/capture';
import PreviewImageScreen from 'components/previewImage';
import SelectCropsScreen from 'components/selectCrops';
import FeaturesScreen from 'components/features';
import Screens from 'until/screens';
import { defaultScreen } from 'components/screenManager';

const Stack = createStackNavigator();

const Navigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={defaultScreen()}
				headerMode='none'>
				<Stack.Screen
					name={Screens.SELECTCROPS}
					component={SelectCropsScreen}
					options={{ title: 'Select Crops Screen' }}
				/>
				<Stack.Screen
					name={Screens.HOME}
					component={HomeScreen}
					options={{ title: 'Home Screen' }}
				/>
				<Stack.Screen
					name={Screens.FEATURES}
					component={FeaturesScreen}
				/>
				<Stack.Screen
					name={Screens.CAPTURE}
					component={CaptureScreen}
				/>
				<Stack.Screen
					name={Screens.PREVIEW}
					component={PreviewImageScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigator;
