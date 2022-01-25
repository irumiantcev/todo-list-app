import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';
import { THEME } from '../theme';

export const MainScreen = ({ todos, addTodo, removeTodo, openTodo }) => {
	const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);

	useEffect(() => {
		const update = () => {
			const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
			setDeviceWidth(width);
		}

		const subscription = Dimensions.addEventListener('change', update);

		return () => subscription?.remove();
	});

	let content = (
		<View style={{...styles.todosWrap, width: deviceWidth}}>
			<FlatList
				data={todos}
				renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />}
				keyExtractor={item => item.id}
			/>
		</View>
	);

	if (!todos.length) {
		content = (
			<View style={styles.imgWrap}>
				<Image style={styles.img} source={require('../../assets/undraw_Blank_canvas.png')} />
			</View>
		);
	}

	return (
		<View style={styles.listWrap}>
			<AddTodo onSubmit={addTodo}/>
			{ content }
		</View>
	)
}

const styles = StyleSheet.create({
	listWrap: {
		flex: 1
	},
	todosWrap: {
		flex: 1
	},
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