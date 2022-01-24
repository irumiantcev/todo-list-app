import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { THEME } from '../theme';
import { AppCard } from '../components/ui/AppCard';
import { EditModal } from '../components/EditModal';

export const TodoScreen = ({ todo, goBack, onRemove, onSave }) => {
	const [modal, setModal] = useState(false);

	const saveHandler = title => {
		onSave(todo.id, title);
		setModal(false);
	}

	return (
		<View>
			<EditModal
				visible={modal}
				onCancel={() => setModal(false)}
				value={todo.title}
				onSave={saveHandler}
			/>

			<AppCard style={styles.card}>
				<Text style={styles.title}>{todo.title}</Text>
				<Button title='Edit' onPress={() => setModal(true)}/>
			</AppCard>

			<View style={styles.buttons}>
				<View style={styles.button}>
					<Button title='Back' color={THEME.GRAY_COLOR} onPress={goBack} />
				</View>
				<View style={styles.button}>
					<Button title='Delete' color={THEME.DANGER_COLOR} onPress={() => onRemove(todo.id)} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	button: {
		width: '40%'
	},
	title: {
		fontSize: 20
	},
	card: {
		marginBottom: 20,
		padding: 15
	}
});