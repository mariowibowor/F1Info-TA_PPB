import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

function CupertinoFooter11(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity style={styles.btnWrapper1}>
        <MaterialCommunityIconsIcon
          name="home"
          style={[
            styles.icon,
            {
              color: props.active ? "#007AFF" : "#616161"
            }
          ]}
        ></MaterialCommunityIconsIcon>
        <Text
          style={[
            styles.home,
            {
              color: props.active ? "#007AFF" : "#9E9E9E"
            }
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrapper2}>
        <MaterialCommunityIconsIcon
          name="library-books"
          style={styles.icon1}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.news}>News</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrapper3}>
        <MaterialCommunityIconsIcon
          name="poll"
          style={styles.icon2}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.btn3Caption}>Stats</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnWrapper4}>
        <MaterialCommunityIconsIcon
          name="calendar-multiselect"
          style={styles.icon3}
        ></MaterialCommunityIconsIcon>
        <Text style={styles.calendar}>Calendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    flexDirection: "row",
    width: "100%"
  },
  btnWrapper1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    backgroundColor: "transparent",
    fontSize: 24,
    opacity: 0.8
  },
  home: {
    fontSize: 12,
    backgroundColor: "transparent",
    paddingTop: 4
  },
  btnWrapper2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon1: {
    backgroundColor: "transparent",
    color: "#616161",
    fontSize: 24,
    opacity: 0.8
  },
  news: {
    fontSize: 12,
    color: "#9E9E9E",
    backgroundColor: "transparent",
    paddingTop: 4
  },
  btnWrapper3: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon2: {
    backgroundColor: "transparent",
    color: "#616161",
    fontSize: 24,
    opacity: 0.8
  },
  btn3Caption: {
    fontSize: 12,
    color: "#9E9E9E",
    backgroundColor: "transparent",
    paddingTop: 4
  },
  btnWrapper4: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  icon3: {
    backgroundColor: "transparent",
    color: "#616161",
    fontSize: 24,
    opacity: 0.8
  },
  calendar: {
    fontSize: 12,
    color: "#9E9E9E",
    backgroundColor: "transparent",
    paddingTop: 4
  }
});

export default CupertinoFooter11;
