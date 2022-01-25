import React, { useState } from 'react';
import { View, Modal, TextInput, Alert, StyleSheet } from 'react-native';

import { THEME } from '../theme';
import { AppButton } from './ui/AppButton';

export const EditModal = ({ visible, onCancel, value = '', onSave}) => {
	const [title, setTitle] = useState(value);

	const saveHandler = () => {
		if (title.trim().length < 3) {
			Alert.alert('Error', `Minimum length must be 3 characters. Now length is ${title.trim().length} characters`);
		} else {
			onSave(title);
		}
	}

	const cancelHandler = () => {
		onCancel();
		setTitle(value);
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
					<AppButton onPress={cancelHandler} color={THEME.DANGER_COLOR}>Cancel</AppButton>
					<AppButton onPress={saveHandler}>Save</AppButton>
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