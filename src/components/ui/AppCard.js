import React from 'react';
import { View, StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const AppCard = props => <View style={{...styles.default, ...props.style}}>{props.children}</View>

const styles = StyleSheet.create({
	default: {
		padding: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		shadowColor: THEME.MAIN_COLOR,
		shadowRadius: 2,
		shadowOpacity: 0.3,
		shadowOffset: { width: 2, height: 2 },
		elevation: 8,
		backgroundColor: '#fff',
		borderRadius: 10
	}
})