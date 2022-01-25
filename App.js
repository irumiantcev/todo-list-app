import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';
import { THEME } from './src/theme';

export default function App() {
    let [fontsLoaded] = useFonts({
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    });

    const [todoId, setTodoId] = useState(null);
    const [todos, setTodos] = useState([]);

    const addTodo = title => {
        const newTodo = {
            id: Date.now().toString(),
            title
        };

        setTodos(prev => [...prev, newTodo]);
    }

    const removeTodo = id => {
        const todo = todos.find(t => t.id === id);

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
                    onPress: () => {
                        setTodoId(null);
                        setTodos(prev => prev.filter(todo => todo.id !== id));
                    }
                }
            ],
            {
                cancelable: false
            }
        );
    }

    const updateTodo = (id, title) => {
        setTodos(prev => prev.map(todo => {
            if (todo.id === id) {
                todo.title = title;
            }
            return todo;
        }));
    }

    let content = <MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo} openTodo={setTodoId} />;

    if (todoId) {
        const todo = todos.find(item => item.id === todoId);
        content = <TodoScreen todo={todo} goBack={() => setTodoId(null)} onRemove={removeTodo} onSave={updateTodo} />;
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View style={styles.wrapper}>
            <Navbar title='Todo App'/>
            <View style={styles.container}>
                {content}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    },
    container: {
        paddingVertical: 30,
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        flex: 1
    }
});
