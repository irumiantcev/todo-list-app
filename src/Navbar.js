import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const Navbar = ({ title }) => {
	return (
		<View style={styles.navbar}>
			<Text style={styles.text}>{title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	navbar: {
		height: 80,
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: '#6C63FF',
		paddingBottom: 10

	},
	text: {
		fontSize: 20,
		color: '#fff'
	}
});
