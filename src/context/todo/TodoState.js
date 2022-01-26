import React, { useContext, useReducer } from 'react';
import { Alert } from 'react-native';

import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import {
	ADD_TODO,
	CLEAR_ERROR,
	FETCH_TODOS,
	HIDE_LOADER,
	REMOVE_TODO,
	SHOW_ERROR,
	SHOW_LOADER,
	UPDATE_TODO
} from '../types';
import { ScreenContext } from '../screen/screenContext';
import { Http } from '../../http';

export const TodoState = ({ children }) => {
	const initialState = {
		todos: [],
		loading: false,
		error: null
	}

	const {changeScreen} = useContext(ScreenContext);

	const [state, dispatch] = useReducer(todoReducer, initialState);

	const addTodo = async title => {
		clearError();

		try {
			const data = await Http.post(
				'https://todo-list-app-b9e76-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
				{ title }
			);

			dispatch({ type: ADD_TODO, title, id: data.name });
		} catch (e) {
			showError('Something wrong :( ');
		}
	}

	const fetchTodos = async () => {
		showLoader();
		clearError();
		try {
			const data = await Http.get('https://todo-list-app-b9e76-default-rtdb.europe-west1.firebasedatabase.app/todos.json');

			const todos = Object.keys(data).map(key => ({...data[key], id: key}));
			dispatch({ type: FETCH_TODOS, todos });
		} catch (e) {
			showError('Something wrong :( ');
		} finally {
			hideLoader();
		}
	};

	const removeTodo = id => {
		const todo = state.todos.find(t => t.id === id);
		Alert.alert(
			'Remove element',
			`You want to remove element "${todo.title}". Are you sure?`,
			[
				{
					text: 'Cancel',
					style: 'cancel'
				},
				{
					text: 'Yes',
					style: 'destructive',
					onPress: async () => {
						changeScreen(null);
						await Http.delete(`https://todo-list-app-b9e76-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`);
						dispatch({ type: REMOVE_TODO, id });
					}
				}
			],
			{
				cancelable: false
			}
		);
	};

	const updateTodo = async (id, title) => {
		clearError();

		try {
			await Http.patch(
				`https://todo-list-app-b9e76-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
				{ title }
			)
			dispatch({ type: UPDATE_TODO, id, title });
		} catch (e) {
			showError('Something wrong :( ');
		}
	}

	const showLoader = () => dispatch({ type: SHOW_LOADER });
	const hideLoader = () => dispatch({ type: HIDE_LOADER });

	const showError = error => dispatch({ type: SHOW_ERROR, error });
	const clearError = () => dispatch({ type: CLEAR_ERROR });

	return (
		<TodoContext.Provider
			value={{
				todos: state.todos,
				loading: state.loading,
				error: state.error,
				addTodo,
				removeTodo,
				updateTodo,
				fetchTodos
			}}
		>
			{children}
		</TodoContext.Provider>
	);
}