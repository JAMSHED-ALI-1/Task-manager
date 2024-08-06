// Deshboard.tsx
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, } from '../auth/types'; 

type NavigationProp = StackNavigationProp<RootStackParamList, 'Deshboard'>;
const data = [
  { id: 1, icon: 'clock-o', text: 'Completed' },
  { id: 2, icon: 'calendar', text: 'Today' },
  { id: 3, icon: 'exclamation-triangle', text: 'Pending' },
  { id: 4, icon: 'calendar-check-o', text: 'All' },
];

interface Task {
  id: number;
  title: string;
  description?: string;
  time?: string;
  completed?: boolean;
}

const TaskItem: React.FC<{
  task: Task;
  handleToggleTask: (id: number) => void;
  handleDeleteTask: (id: number) => void;
}> = ({ task, handleToggleTask, handleDeleteTask }) => (

<View style={styles.taskItem}>
    <TouchableOpacity onPress={() => handleToggleTask(task.id)}>
      <View style={[styles.taskCircle, task.completed && styles.completed]}>
        {task.completed ? <Icon name="check" size={16} color="white" /> : null}
      </View>
    </TouchableOpacity>
    <View style={{right:50}}>

    <Text style={[styles.taskText, task.completed && styles.completedText]}>
      {task.title} 
      {/* {task.time && `(${task.time})`} */}
    </Text>
    <Text style={[styles.taskText, task.completed && styles.completedText]}>{task.description}</Text>
    <Text style={[styles.taskText, task.completed && styles.completedText]}>{task.time}</Text>
    </View>
    <TouchableOpacity onPress={() => handleDeleteTask(task.id)}>
      <Icon name="trash" size={20} color="red" />
    </TouchableOpacity>
  </View>
 

);

const Deshboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState<Task>({
    id: Date.now(),
    title: '',
    description: '',
    time: '',
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    // Load tasks from AsyncStorage when the component mounts
    const loadTasks = async () => {
      try {
        const tasksJSON = await AsyncStorage.getItem('tasks');
        if (tasksJSON) {
          setTasks(JSON.parse(tasksJSON));
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    // Save tasks to AsyncStorage whenever tasks state changes
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Failed to save tasks:', error);
      }
    };
    saveTasks();
  }, [tasks]);

  const handleToggleTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleSaveTask = () => {
    if (newTask.title.trim()) {
      setTasks([
        ...tasks,
        { ...newTask, time: selectedDate ? selectedDate.toLocaleString() : '' },
      ]);
      setModalVisible(false);
      setNewTask({ id: Date.now(), title: '', description: '', time: '' });
      setSelectedDate(null);
    } else {
      alert('Task title is required');
    }
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };

  const filterTasks = (completed: boolean | null) => {
    if (completed === null) return tasks;
    return tasks.filter((task) => task.completed === completed);
  };

  const handleCardPress = (itemText: string) => {
    let filteredTasks: Task[];
    let title: string;

    switch (itemText) {
      case 'Completed':
        filteredTasks = tasks.filter((task) => task.completed);
        title = 'Completed Tasks';
        break;
      case 'Pending':
        filteredTasks = tasks.filter((task) => !task.completed);
        title = 'Pending Tasks';
        break;
      case 'All':
        filteredTasks = tasks;
        title = 'All Tasks';
        break;
      default:
        filteredTasks = [];
        title = 'Tasks';
    }

    navigation.navigate('TaskList', { tasks: filteredTasks, title });
  };

  const renderCard = ({ item }: { item: typeof data[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleCardPress(item.text)}
    >
      <Icon name={item.icon} size={30} color="#000" style={styles.cardIcon} />
      <Text style={styles.cardText}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.greetingText}>Hi! Jamshed</Text>
        <TouchableOpacity>
          <Icon name="bars" size={30} color="#000" style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatList}
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
      />
      <Text style={styles.sectionTitle}>Today's Tasks</Text>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            handleToggleTask={handleToggleTask}
            handleDeleteTask={handleDeleteTask}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.taskList}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Task Title"
              value={newTask.title}
              onChangeText={(text) =>
                setNewTask({ ...newTask, title: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newTask.description}
              onChangeText={(text) =>
                setNewTask({ ...newTask, description: text })
              }
            />
            <TouchableOpacity
              style={styles.input}
              onPress={() => setDatePickerVisibility(true)}
            >
              <Text style={styles.inputText}>
                {selectedDate
                  ? selectedDate.toLocaleString()
                  : 'Select Date & Time'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={() => setDatePickerVisibility(false)}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveTask}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuIcon: {
    marginRight: 10,
  },
  flatList: {
    marginTop: 10,
    // marginHorizontal: 10,
    // backgroundColor:'red',
   height:0
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIcon: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
  },
  taskList: {
    paddingHorizontal: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  taskCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  completed: {
    borderColor: '#6c63ff',
    backgroundColor: '#6c63ff',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6c63ff',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#6c63ff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  inputText: {
    fontSize: 16,
    color: '#888',
  },
  saveButton: {
    backgroundColor: '#6c63ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Deshboard;
