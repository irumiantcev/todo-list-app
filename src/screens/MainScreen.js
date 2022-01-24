import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';

import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';

export const MainScreen = ({ todos, addTodo, removeTodo, openTodo }) => {
	let content = (
		<FlatList
			data={todos}
			renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />}
			keyExtractor={item => item.id}
		/>
	);

	if (!todos.length) {
		content = (
			<View style={styles.imgWrap}>
				<Image style={styles.img} source={require('../../assets/undraw_Blank_canvas.png')} />
			</View>
		);
	}

	return (
		<View>
			<AddTodo onSubmit={addTodo}/>
			{ content }
		</View>
	)
}

const styles = StyleSheet.create({
	imgWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		height: 300
	},
	img: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain'
	}
});