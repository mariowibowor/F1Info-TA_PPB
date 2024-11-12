import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView, StatusBar, Platform } from "react-native";
import axios from "axios";

function Calendar() {
  const [races, setRaces] = useState([]);

  // Fungsi untuk mengambil data dari API
  const fetchRaces = async () => {
    try {
      const response = await axios.get("http://ergast.com/api/f1/current.json");
      const raceData = response.data.MRData.RaceTable.Races;
      setRaces(raceData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fungsi untuk memformat tanggal menjadi "dd MMMM yyyy"
  const formatDate = (dateString) => {
    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Mengambil data saat komponen dimuat
  useEffect(() => {
    fetchRaces();
  }, []);

  return (
    <>
      {/* StatusBar untuk menyesuaikan posisi konten */}
      <StatusBar barStyle="light-content" backgroundColor="#e10600" translucent />

      {/* SafeAreaView untuk mencegah konten terpotong oleh status bar */}
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <Text style={styles.calendarTitle}>CALENDAR</Text>
          {races.map((race, index) => (
            <View key={index} style={styles.rect}>
              {/* Bagian Round dan Date */}
              <View style={styles.rect2}>
                <View style={styles.rect4}>
                  <Text style={styles.round}>Round {race.round}</Text>
                </View>
                <View style={styles.rect5}>
                  <Text style={styles.date}>{formatDate(race.date)}</Text>
                </View>
              </View>
              {/* Bagian Event Name dan Circuit */}
              <View style={styles.rect3}>
                <Text style={styles.eventName}>{race.raceName}</Text>
                <Text style={styles.circuit}>{race.Circuit.circuitName}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
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
    backgroundColor: "#f5f5f5",
  },
  calendarTitle: {
    fontFamily: "F1Font",
    color: "#ffffff",
    fontSize: 30,
    padding: 10,
    backgroundColor: "#e10600",
  },
  rect: {
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  rect2: {
    flexDirection: "row",
    borderBottomColor: "#efefef",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  rect4: {
    flex: 0.5,
    justifyContent: "center",
  },
  round: {
    fontFamily: "F1Font",
    color: "#121212",
    fontSize: 16,
  },
  rect5: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  date: {
    fontFamily: "F1Font",
    color: "#121212",
    fontSize: 12,
  },
  rect3: {
    marginTop: 10,
  },
  eventName: {
    fontFamily: "F1Font",
    color: "#121212",
    fontSize: 20,
    marginBottom: 5,
  },
  circuit: {
    fontFamily: "F1Font",
    color: "#555555",
    fontSize: 10,
  },
});

export default Calendar;
