import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar, Platform } from "react-native";
import DriverStandings from "./DriverStandings";
import ConstructorStandings from "./ConstructorStandings";

function Standings(props) {
  const [isDriverStandings, setIsDriverStandings] = useState(true);

  return (
    <>
      {/* StatusBar untuk menyesuaikan posisi konten */}
      <StatusBar barStyle="light-content" backgroundColor="#e10600" translucent />

      {/* SafeAreaView untuk mencegah konten terpotong oleh status bar */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.standings}>STANDINGS</Text>
          <View style={styles.switchContainer}>
            <TouchableOpacity
              style={[
                styles.switchButton,
                isDriverStandings && styles.activeButton,
              ]}
              onPress={() => setIsDriverStandings(true)}
            >
              <Text
                style={[
                  styles.switchText,
                  isDriverStandings && styles.activeText,
                ]}
              >
                Drivers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.switchButton,
                !isDriverStandings && styles.activeButton,
              ]}
              onPress={() => setIsDriverStandings(false)}
            >
              <Text
                style={[
                  styles.switchText,
                  !isDriverStandings && styles.activeText,
                ]}
              >
                Constructors
              </Text>
            </TouchableOpacity>
          </View>

          {/* Render konten berdasarkan switch */}
          {isDriverStandings ? (
            <DriverStandings navigation={props.navigation} />
          ) : (
            <ConstructorStandings navigation={props.navigation} />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  standings: {
    fontFamily: "F1Font",
    color: "#ffffff",
    fontSize: 30,
    padding: 10,
    backgroundColor: "#e10600",
  },
  switchContainer: {
    flexDirection: "row",
    backgroundColor: "#e10600",
    justifyContent: "center",
    paddingVertical: 10,
  },
  switchButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  switchText: {
    fontFamily: "F1Font",
    fontSize: 18,
    color: "#b0b0b0",
  },
  activeButton: {
    borderBottomWidth: 3,
    borderBottomColor: "#ffffff",
  },
  activeText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontFamily: "F1Font"
  },
});

export default Standings;
