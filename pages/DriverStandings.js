import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";

function DriverStandings({ navigation }) {
  const [standings, setStandings] = useState([]);
  const currentYear = new Date().getFullYear(); // Ambil tahun saat ini

  // Fungsi untuk mengambil data dari API
  const fetchStandings = async () => {
    const options = {
      method: "GET",
      url: "https://f1-motorsport-data.p.rapidapi.com/standings-drivers",
      params: { year: currentYear.toString() }, // Gunakan tahun saat ini
      headers: {
        "x-rapidapi-key": "APIKEY",
        "x-rapidapi-host": "f1-motorsport-data.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setStandings(response.data.standings.entries);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, [currentYear]); // Tambahkan `currentYear` sebagai dependency

  return (
    <View style={styles.container}>
      <ScrollView>
        {standings.map((entry, index) => {
          const rankStat = entry.stats.find(stat => stat.name === "rank");
          const pointsStat = entry.stats.find(stat => stat.name === "championshipPts");

          return (
            <TouchableOpacity
              key={entry.athlete.id}
              onPress={() =>
                navigation.navigate("DriverDetail", {
                  driverId: entry.athlete.id,
                })
              }
              style={styles.button}
            >
              <View style={styles.rect2}>
                <Text style={styles.number}>{rankStat?.displayValue}</Text>
                <Text style={styles.name}>{entry.athlete.displayName}</Text>
              </View>
              <View style={styles.rect3}>
                <Text style={styles.points}>{pointsStat?.displayValue} Pts</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  button: {
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  rect2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  number: {
    fontFamily: "F1Font",
    color: "#121212",
    fontSize: 20,
    paddingRight: 10,
    borderRightColor: "#e10600",
    borderRightWidth: 5,
  },
  name: {
    fontFamily: "F1Font",
    color: "#121212",
    fontSize: 20,
    marginLeft: 10,
  },
  rect3: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  points: {
    fontFamily: "F1Font",
    color: "#121212",
    fontSize: 20,
  },
});

export default DriverStandings;
