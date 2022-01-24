import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

export default function App() {
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
        paddingHorizontal: 20,
        flex: 1
    }
});
