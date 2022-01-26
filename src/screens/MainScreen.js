import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';
import { THEME } from '../theme';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';
import { AppLoader } from '../components/ui/AppLoader';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';

export const MainScreen = () => {
	const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);
	const { todos, addTodo, removeTodo, fetchTodos, loading, error } = useContext(TodoContext);
	const { changeScreen } = useContext(ScreenContext);

	const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

	useEffect(async() => {
		await loadTodos();
	}, []);

	useEffect(() => {
		const update = () => {
			const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
			setDeviceWidth(width);
		}
		const subscription = Dimensions.addEventListener('change', update);

		return () => subscription?.remove();
	});

	if (loading) {
		return <AppLoader/>
	}

	if (error) {
		return (
			<View style={styles.center}>
				<AppText style={styles.error}>{error}</AppText>
				<AppButton onPress={loadTodos}>Try again</AppButton>
			</View>
		);
	}

	let content = (
		<View style={{...styles.todosWrap, width: deviceWidth}}>
			<FlatList
				data={todos}
				renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />}
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
	},
	center: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	error: {
		color: THEME.DANGER_COLOR,
		fontSize: 22,
		marginBottom: 15
	}
});