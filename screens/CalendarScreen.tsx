import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  eachDayOfInterval,
  format,
  getDay,
  getDaysInMonth,
  getISODay,
  getMonth,
  getYear,
  isEqual,
  set,
} from "date-fns";
import { Daybox } from "../components/Daybox";
import { Dayname } from "../components/Dayname";
import { connectToDatabase, getTasks } from "../database/database";
import { taskType } from "../types";
import { Task } from "../components/Task";
import { SmallTask } from "../components/SmallTask";
import GestureRecognizer from "react-native-swipe-gestures";

const daysName = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const dateNow = new Date();

export const CalendarScreen = () => {
  const [year, setYear] = useState<number>(getYear(dateNow));
  const [month, setMonth] = useState<number>(getMonth(dateNow));
  const [days, setDays] = useState<Date[]>([]);
  const [tasks, setTasks] = useState<taskType[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date>(dateNow);

  const [isLoading, setIsLoading] = useState(true);

  const getAllMonthDays = (year: number, month: number) => {
    return eachDayOfInterval({
      start: new Date(year, month, 2 - getISODay(new Date(year, month, 1))),
      end: new Date(year, month, getDaysInMonth(new Date(year, month, 1))),
    });
  };

  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await getTasks(db, selectedDay, "todo", setTasks);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const days = getAllMonthDays(year, month);
    setDays(days);
  }, []);

  useEffect(() => {
    const days = getAllMonthDays(year, month);
    setDays(days);
  }, [month, year]);

  const handleDeleteTask = async (taskID: number) => {};
  const handleEditTask = async (taskID: number) => {};
  const handleTaskStatus = async (taskID: number) => {};

  const handleNextMonth = () => {
    const newMonth = month + 1;
    if (newMonth > 11) {
      setMonth(0);
      setYear((prevYear) => prevYear + 1);
    } else {
      setMonth(newMonth);
    }
  };

  const handlePrevMonth = () => {
    const newMonth = month - 1;
    if (newMonth < 0) {
      setMonth(11);
      setYear((prevYear) => prevYear - 1);
    } else {
      setMonth(newMonth);
    }
  };

  const handleDaySelect = async (day: Date) => {
    setIsLoading(true);
    setSelectedDay(day);
    const db = await connectToDatabase();
    await getTasks(db, day, "todo", setTasks);
    setIsLoading(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <Text style={styles.dateText}>
            {format(dateNow, "dd MMMM, yyyy")}
          </Text>
          <Text style={styles.date}>
            {year}
            {format(new Date(year, month, 1), " MMMM")}
          </Text>
        </View>
        <View style={styles.content}>
          <GestureRecognizer
            style={styles.calendar}
            onSwipeRight={handlePrevMonth}
            onSwipeLeft={handleNextMonth}>
            {daysName.map((day, index) => (
              <Dayname key={index} day={day} />
            ))}
            {days.map((day, index) => (
              <Daybox
                key={index}
                day={day}
                selected={isEqual(day, selectedDay)}
                onPress={() => handleDaySelect(day)}
              />
            ))}
          </GestureRecognizer>
        </View>
        <View style={styles.section}>
          <View style={styles.line} />
          <Text style={styles.selectedDayTasks}>
            Tasks for {format(selectedDay, "dd MMMM, yyyy")}
          </Text>
          <View style={styles.line} />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#FC69D3" />
        ) : tasks.length > 0 ? (
          <FlatList
            style={styles.currentDayTasks}
            data={tasks}
            renderItem={({ item }) => (
              <SmallTask
                task={item}
                category="test"
                onDelete={() => handleDeleteTask}
                onEdit={() => handleEditTask}
                onStatusChange={() => handleTaskStatus}
              />
            )}
            keyExtractor={(item) => item!.id!.toString()}
          />
        ) : (
          <Text style={styles.noTasks}>There is no tasks for this day</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  headerWrapper: {
    display: "flex",
    width: "90%",
    marginTop: 32,
  },
  date: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },
  dateText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#A0A0A0",
  },
  content: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  calendar: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
    gap: 6,
  },
  section: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  line: {
    backgroundColor: "rgba(0,0,0,0.1)",
    width: "20%",
    height: 2,
  },
  selectedDayTasks: {
    textAlign: "center",
    width: "40%",
    fontFamily: "Poppins-Bold",
    fontSize: 12,
    color: "rgba(0,0,0, 0.4)",
  },
  currentDayTasks: {
    width: "100%",
  },
  noTasks: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "rgba(0,0,0, 0.4)",
  },
});
