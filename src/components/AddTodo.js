import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { THEME } from '../theme';

export const AddTodo = ({ onSubmit }) => {
	const [value, setValue] = useState('');

	const pressHandler = () => {
		if (value.trim()) {
			onSubmit(value);
			setValue('');
			Keyboard.dismiss();
		} else {
			Alert.alert('Todo title cannot be empty');
		}
	}

	return (
		<View style={styles.block}>
			<TextInput
				style={styles.input}
				value={value}
				onChangeText={setValue}
				placeholder='Add todo...'
				autoCorrect={false}
				autoCapitalize='none'
			/>

			<Feather name="plus-circle" size={30} color={THEME.MAIN_COLOR} onPress={pressHandler}/>
		</View>
	)
}

const styles = StyleSheet.create({
	block: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15
	},
	input: {
		width: '80%',
		borderBottomWidth: 2,
		borderBottomColor: THEME.MAIN_COLOR,
		borderStyle: 'solid',
		padding: 10
	}
});