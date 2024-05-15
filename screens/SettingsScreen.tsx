import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  connectToDatabase,
  createTables,
  deleteData,
} from "../database/database";
import { SQLiteDatabase } from "expo-sqlite";

export const SettingsScreen = () => {
  const [database, setDatabase] = useState<SQLiteDatabase | null>(null);
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      setDatabase(db);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDeleteBtn = async () => {
    if (database) {
      await deleteData(database);
    }
  };
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View>
        <Text>SettingsScreen</Text>
        <Button title="Delete all data" onPress={handleDeleteBtn} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
