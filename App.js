import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Navbar } from './src/Navbar';
import { AddTodo } from './src/AddTodo';
import { Todo } from './src/Todo';

export default function App() {
    const [todos, setTodos] = useState([]);

    const addTodo = (title) => {
        const newTodo = {
            id: Date.now().toString(),
            title
        };

        setTodos(prev => [...prev, newTodo]);
    }

    const removeTodo = id => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }

    return (
        <View style={styles.wrapper}>
            <Navbar title='Todo App'/>
            <View style={styles.container}>
                <AddTodo onSubmit={addTodo}/>
                <FlatList
                    data={todos}
                    renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} />}
                    keyExtractor={item => item.id}
                />
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
