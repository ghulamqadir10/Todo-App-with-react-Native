import { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [input, setInput] = useState(``);
  const [todo, setTodo] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateInput, setUpdateInput] = useState(``);
  const [index, setIndex] = useState(0);

  // addTodo
  const addTodo = () => {
    todo.push(input);
    setTodo([...todo]);
    setInput(``);
  };

  // deleteTodo
  const deleteTodo = () => {
    todo.splice(index, 1);
    setTodo([...todo]);
  };

  // editTodo
  const editTodo = () => {
    console.log(updateInput, index);
    todo.splice(index, 1, updateInput);
    setTodo([...todo]);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: 700,
          textAlign: `center`,
          marginVertical: 10,
          textDecorationLine: "underline",
        }}
      >
        Todo App
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={input}
        placeholder="enter todo"
      />
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text>Add Todo</Text>
      </TouchableOpacity>

      {todo.length > 0 ? 
      <FlatList
        style={{ marginTop: 20 }}
        data={todo}
          renderItem={({ item, index }) => {
            return <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
                <TouchableOpacity
                  style={styles.listbtn}
                  onPress={() => {
                    setIndex(index);
                    setModalVisible(true);
                  }}
                  activeOpacity={0.5}
                >
                  <Text>edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listbtn} onPress={() => deleteTodo(index)}
              activeOpacity={0.5}
            >
              <Text>delete</Text>
            </TouchableOpacity>
              </View>
            // );
          }}
          keyExtractor={(item, index) => index.toString()}
        />:
      // ) : (
        <Text style={{ ...styles.title, color: `black`, margin: 20 }}>
          No Todo Found...
        </Text>
      }
      {/* update input functionality */}

      <View style={styles.centeredView}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert(`Modal has been closed`);
          setModalVisible(!modalVisible);
        }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Todo</Text>
            <TextInput
              style={styles.updateInput}
              onChangeText={setUpdateInput}
              value={updateInput}
              placeholder="enter todo"
              />
            <Pressable
              style={[styles.modalBtn, styles.buttonClose]}
              onPress={() => editTodo(index)}
              >
              <Text style={styles.textStyle}>Update Todo</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    marginHorizontal: 40,
    marginVertical: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12
  },
  button: {
    alignItems: `center`,
    padding: 10,
    backgroundColor: "lightgrey",
    marginHorizontal: 120,
    // border: `7px solid black`,
    borderRadius: 14,
  },
  item: {
    backgroundColor: "#000000",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 14
  },
  title: {
    fontSize: 32,
    padding: 4,
    color: "white",
    textAlign: "center",
  },
  listbtn: {
    flex: 1,
    marginHorizontal: 100,
     borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  updateInput: {
    padding: 12,
    width: 100,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  modalBtn: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: { backgroundColor: "#2196F3" },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
