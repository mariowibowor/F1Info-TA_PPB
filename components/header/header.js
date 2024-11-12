import React from "react";
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Platform } from "react-native";
import MaterialButtonHamburger from "./MaterialButtonHamburger";

function Header({ navigation }) {
  return (
    <>
      {/* StatusBar untuk menyesuaikan warna dan posisi konten */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="#e10600"
        translucent
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.textWrapper}>
            <Text numberOfLines={1} style={styles.f1Info}>
              F1 Info
            </Text>
          </View>
          <MaterialButtonHamburger
            style={styles.materialButtonHamburger}
            onPress={() => navigation.navigate("Profile")}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#e10600",
    shadowColor: "#111",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 3,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  textWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  f1Info: {
    fontSize: 30,
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "F1Font",
  },
  materialButtonHamburger: {
    padding: 5,
  },
});

export default Header;
