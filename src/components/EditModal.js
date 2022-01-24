import React, { useState } from 'react';
import { Button, Modal, View, StyleSheet, TextInput, Alert } from 'react-native';
import { THEME } from '../theme';

export const EditModal = ({ visible, onCancel, value = '', onSave}) => {
	const [title, setTitle] = useState(value);

	const saveHandler = () => {
		if (title.trim().length < 3) {
			Alert.alert('Error', `Minimum length must be 3 characters. Now length is ${title.trim().length} characters`);
		} else {
			onSave(title);
		}
	}

	return (
		<Modal
			visible={visible}
			animationType='slide'
			transparent={false}
		>
			<View style={styles.wrap}>
				<TextInput
					style={styles.input}
					placeholder='Text here...'
					autoCapitalize='none'
					autoCorrect={false}
					maxLength={64}
					value={title}
					onChangeText={setTitle}
				/>
				<View style={styles.buttons}>
					<Button title='Cancel' onPress={onCancel} color={THEME.DANGER_COLOR} />
					<Button title='Save' onPress={saveHandler} />
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	wrap: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	input: {
		padding: 10,
		borderBottomColor: THEME.MAIN_COLOR,
		borderBottomWidth: 2,
		width: '80%',
		fontSize: 18
	},
	buttons: {
		width: '100%',
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
});