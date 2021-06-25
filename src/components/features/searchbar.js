import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Item, Input, Icon, Body } from 'native-base';

const Searchbar = () => {
	const [textSearch, setTextSearch] = useState('');

	const handleSearch = () => {
		console.log(textSearch);
	};

	return (
		<View style={styles.container}>
			<View style={styles.body}>
				<Item style={styles.item} underline={false} b>
					<Input
						style={styles.input}
						placeholder='Search'
						returnKeyType='search'
						value={textSearch}
						onChangeText={setTextSearch}
						onSubmitEditing={handleSearch}
					/>
					<Icon
						style={styles.icon}
						name='ios-search'
						color='#5cb85c'
						onPress={handleSearch}
					/>
				</Item>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// backgroundColor: 'white',
		// padding: 8,
		paddingHorizontal: '2%',
		paddingVertical: 8,
	},
	body: {
		borderRadius: 50,
		// borderStyle: 'solid',
		// borderColor: '#8c8c8c',
		// borderWidth: 1,
		backgroundColor: 'white',

		shadowColor: '#000',
		shadowOffset: {
			width: 10,
			height: 10,
		},
		shadowOpacity: 1,
		shadowRadius: 2,
		elevation: 4,
	},
	icon: {
		paddingRight: 16,
		paddingLeft: 8,
		paddingTop: 2,
		color: '#5cb85c',
	},
	item: {
		borderColor: 'transparent',
	},
	input: {
		paddingLeft: 24,
		// backgroundColor: 'red',
	},
});

export default Searchbar;
