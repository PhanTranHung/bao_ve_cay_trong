import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from 'components/home';
import CaptureScreen from 'components/capture';
import PreviewImageScreen from 'components/previewImage';
import SelectCropsScreen from 'components/selectCrops';
import FeaturesScreen from 'components/features';
import Result from 'components/result';
import News from 'components/news'
import Screens from 'until/screens';
import Study from 'components/study';
import { defaultScreen } from 'components/screenManager';

const Stack = createStackNavigator();

const Navigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={defaultScreen()} headerMode='none'>
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
				<Stack.Screen name={Screens.FEATURES} component={FeaturesScreen} />
				<Stack.Screen name={Screens.CAPTURE} component={CaptureScreen} />
				<Stack.Screen name={Screens.RESULT} component={Result} />
				<Stack.Screen name={Screens.PREVIEW} component={PreviewImageScreen} />
				<Stack.Screen name={Screens.NEWS} component={News} />
				<Stack.Screen name={Screens.STUDY} component={Study} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigator;
