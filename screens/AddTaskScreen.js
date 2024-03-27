import { StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity, Pressable, View, ToastAndroid, StatusBar } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

export const AddTaskScreen = ({ navigation }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [category, setCategory] = useState("work"); // ["work", "personal", "shopping"]
  const [priority, setPriority] = useState("low"); // ["low", "medium", "high"]
  const [date, setDate] = useState(new Date());

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const [errors, setErrors] = useState(); // ["taskName", "taskTime"]

  const handleTaskNameChange = (newTaskName) => {
    setTaskName(newTaskName);
  };
  const handleTaskDescriptionChange = (newTaskDescription) => {
    setTaskDescription(newTaskDescription);
  };
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setDatePickerVisibility(false);
  };
  const handleTimeChange = (newTime) => {
    const hour = newTime.getHours();
    const minute = newTime.getMinutes();
    const newDate = date;
    newDate.setHours(hour);
    newDate.setMinutes(minute);
    setDate(newDate);
    setTimePickerVisibility(false);
  };

  const resetInputs = () => {
    setTaskName("");
    setTaskDescription("");
    setCategory("work");
    setPriority("low");
    const nowDate = new Date();
    if (nowDate.getMinutes() >= 30) nowDate.setHours(nowDate.getHours() + 1);
    else nowDate.setMinutes(30);
    setDate(nowDate);
    setErrors(null);
  };

  const handleSubmitAddingTask = () => {
    console.log("Task added - " + taskName + " " + taskDescription + " " + category + " " + priority + " " + date);
    if (taskName === "") {
      ToastAndroid.show("Task name cannot be empty", ToastAndroid.SHORT);
      setErrors("taskName");
      return;
    }
    if (date < new Date()) {
      ToastAndroid.show("Task date cannot be in the past", ToastAndroid.SHORT);
      setErrors("taskTime");
      return;
    }

    //TODO - add task to the database
    resetInputs();
  };

  // on focus listener
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      resetInputs();
    });
    return unsubscribe;
  });

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.Header}>Adding new task</Text>
        <TextInput
          style={[styles.input, errors === "taskName" ? styles.errorBorder : ""]}
          defaultValue={taskName}
          onChangeText={handleTaskNameChange}
          placeholder="Task name"
          placeholderTextColor="rgba(0, 0, 0, 0.2)"
        />
        <TextInput style={styles.input} defaultValue={taskDescription} onChangeText={handleTaskDescriptionChange} placeholder="Short description" placeholderTextColor="rgba(0, 0, 0, 0.2)" />
        <View style={styles.row}>
          <View style={styles.categoryPicker}>
            <Text style={styles.label}>Category</Text>
            <Picker style={[styles.input, { marginTop: 0 }]} mode="dropdown" selectedValue={category} onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
              <Picker.Item fontFamily="Poppins-Bold" label="Work" value="work" />
              <Picker.Item fontFamily="Poppins-Bold" label="Personal" value="personal" />
              <Picker.Item fontFamily="Poppins-Bold" label="Shopping" value="shopping" />
            </Picker>
          </View>
          <View style={styles.priorityPicker}>
            <Text style={styles.label}>Priority</Text>
            <Picker style={[styles.input, { marginTop: 0 }]} mode="dropdown" selectedValue={priority} onValueChange={(itemValue, itemIndex) => setPriority(itemValue)}>
              <Picker.Item label="Low" value="low" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="High" value="high" />
            </Picker>
          </View>
        </View>
        <View style={styles.row}>
          <Pressable
            style={[styles.datePicker, errors === "taskTime" ? styles.errorBorder : ""]}
            onPress={() => {
              setDatePickerVisibility(true);
            }}>
            <Text style={styles.datePickerText}>{format(date, "dd MMMM yyyy")}</Text>
          </Pressable>
          <Pressable
            style={[styles.timePicker, errors === "taskTime" ? styles.errorBorder : ""]}
            onPress={() => {
              setTimePickerVisibility(true);
            }}>
            <Text style={styles.timePickerText}>{format(date, "HH:mm")}</Text>
          </Pressable>
        </View>
        {isDatePickerVisible && <RNDateTimePicker value={date} mode="date" display="spinner" onChange={(e, selectedDate) => handleDateChange(selectedDate)} />}
        {isTimePickerVisible && <RNDateTimePicker value={date} mode="time" display="clock" onChange={(e, selectedTime) => handleTimeChange(selectedTime)} />}
        <TouchableOpacity style={styles.button} onPress={() => handleSubmitAddingTask()}>
          <Text style={styles.buttonText}>Add task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  label: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "rgba(0,0,0,0.8)",
    marginLeft: 6,
    marginTop: 12,
  },
  button: {
    backgroundColor: "#FC69D3",
    padding: 12,
    borderRadius: 5,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#fff",
  },
  Header: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },
  input: {
    height: 45,
    marginVertical: 12,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#D9D9D9",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    justifyContent: "center",
    alignContent: "center",
    color: "#000",
  },
  categoryPicker: {
    width: "45%",
    justifyContent: "center",
  },
  priorityPicker: {
    width: "45%",
    justifyContent: "center",
  },
  datePicker: {
    height: 45,
    width: "60%",
    marginVertical: 12,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#D9D9D9",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    justifyContent: "center",
    alignContent: "center",
    color: "#000",
  },
  datePickerText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "rgba(0,0,0,0.8)",
  },
  timePicker: {
    height: 45,
    width: "35%",
    marginVertical: 12,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#D9D9D9",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    justifyContent: "center",
    alignContent: "center",
    color: "#000",
  },
  timePickerText: {
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "rgba(0,0,0,0.8)",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  errorBorder: {
    borderColor: "red",
    borderWidth: 2,
  },
  cancelButton: {
    backgroundColor: "#FFF",
    padding: 12,
    borderWidth: 3,
    borderColor: "#FC69D3",
    borderRadius: 5,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonText: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#FC69D3",
  },
});
