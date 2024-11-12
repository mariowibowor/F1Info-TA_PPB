import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function Profile(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.f1Info}>F1 Info</Text>
      <Text style={styles.aplikasiSeputarF1}>Aplikasi Seputar F1</Text>
      <Text style={styles.dibuatOleh}>Dibuat oleh</Text>
      <Text style={styles.marioWibowoRoyro}>Mario Wibowo Royro</Text>
      <Text style={styles.loremIpsum2}>21120122130071</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  f1Info: {
    fontFamily: "F1Font",
    color: "#121212",
    fontSize: 30
  },
  aplikasiSeputarF1: {
    fontFamily: "F1Font",
    color: "#121212"
  },
  dibuatOleh: {
    fontFamily: "F1Font",
    color: "#121212",
    borderTopWidth: 2,
    borderTopColor: "#e10600",
    marginTop: 20,
  },
  marioWibowoRoyro: {
    fontFamily: "F1Font",
    color: "#121212"
  },
  loremIpsum2: {
    fontFamily: "F1Font",
    color: "#121212"
  }
});

export default Profile;
