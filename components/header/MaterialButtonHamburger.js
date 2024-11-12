import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialButtonHamburger(props) {
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={props.onPress} // Tambahkan fungsi onPress di sini
    >
      <Icon name="account" style={styles.caption}></Icon>
      <View
        style={[
          styles.rect,
          {
            backgroundColor: props.rect || undefined
          }
        ]}
      ></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2
  },
  caption: {
    color: "#fff",
    fontSize: 24
  },
  rect: {}
});

export default MaterialButtonHamburger;
