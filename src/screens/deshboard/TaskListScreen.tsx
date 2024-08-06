// TaskListScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type Task = {
  id: number;
  title: string;
  description?: string;
  time?: string;
  completed?: boolean;
};

type TaskListScreenProps = {
  route: RouteProp<{ params: { tasks: Task[]; title: string } }, 'params'>;
};

const TaskList: React.FC<TaskListScreenProps> = ({ route }) => {
  const { tasks, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <Text style={styles.taskTime}>{item.time}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  taskTime: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 5,
  },
});

export default TaskList;
