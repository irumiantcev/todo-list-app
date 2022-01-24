import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';

export const AddTodo = ({ onSubmit }) => {
	const [value, setValue] = useState('');

	const pressHandler = () => {
		if (value.trim()) {
			onSubmit(value);
			setValue('');
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
			<Button title='Add' onPress={pressHandler}/>
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
		width: '70%',
		borderBottomWidth: 2,
		borderBottomColor: '#6C63FF',
		borderStyle: 'solid',
		padding: 10
	}
});