import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import CupertinoFooter11 from "./CupertinoFooter1";

function Footer(props) {
  return (
    <View style={styles.container}>
      <View style={styles.cupertinoFooter11Filler}></View>
      <CupertinoFooter11 style={styles.cupertinoFooter11}></CupertinoFooter11>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cupertinoFooter11Filler: {
    flex: 1
  },
  cupertinoFooter11: {
    height: 49,
    width: 375,
    alignSelf: "center"
  }
});

export default Footer;
