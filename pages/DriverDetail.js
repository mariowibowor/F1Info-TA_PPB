import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import axios from "axios";

function DriverDetail({ route }) {
  const { driverId } = route.params;
  const [driverInfo, setDriverInfo] = useState(null);
  const [driverStanding, setDriverStanding] = useState(null);
  const currentYear = new Date().getFullYear(); // Ambil tahun saat ini

  useEffect(() => {
    // Fungsi untuk mengambil data pembalap dari API athlete-info
    const fetchDriverInfo = async () => {
      const options = {
        method: "GET",
        url: "https://f1-motorsport-data.p.rapidapi.com/athlete-info",
        params: { athleteId: driverId },
        headers: {
          "x-rapidapi-key": "APIKEY",
          "x-rapidapi-host": "f1-motorsport-data.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        setDriverInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Fungsi untuk mengambil data standing pembalap dari API standings-drivers
    const fetchDriverStanding = async () => {
      const options = {
        method: 'GET',
        url: 'https://f1-motorsport-data.p.rapidapi.com/standings-drivers',
        params: { year: currentYear.toString() }, // Gunakan tahun saat ini
        headers: {
          'x-rapidapi-key': 'APIKEY',
          'x-rapidapi-host': 'f1-motorsport-data.p.rapidapi.com',
        }
      };
      try {
        const response = await axios.request(options);
        const standing = response.data.standings.entries.find(entry => entry.athlete.id === driverId);
        setDriverStanding(standing);
      } catch (error) {
        console.error(error);
      }
    };

    // Panggil kedua fungsi fetch
    fetchDriverInfo();
    fetchDriverStanding();
  }, [driverId, currentYear]); // Tambahkan `currentYear` sebagai dependency

  if (!driverInfo || !driverStanding) {
    return <Text>Loading...</Text>;
  }

  // Data dari athlete-info
  const { fullName, vehicles, flag } = driverInfo;
  const racingNumber = vehicles[0].number;
  const teamName = vehicles[0].team;
  const countryName = flag.alt;
  const countryFlag = flag.href;

  // Data dari standings-drivers
  const rankStat = driverStanding.stats.find(stat => stat.name === "rank")?.displayValue;
  const pointsStat = driverStanding.stats.find(stat => stat.name === "championshipPts")?.displayValue;
  const races = driverStanding.stats.filter(stat => stat.name.length === 3 && stat.played);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.rect}>
        <View style={styles.rect2}>
          <Image source={{ uri: driverInfo.headshot }} style={styles.image} />
        </View>
        <View style={styles.rect3}>
          <Text style={styles.racingNo}>{racingNumber}</Text>
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.team}>{teamName}</Text>
        </View>
      </View>
      <Text style={styles.championshipStanding}>Championship Standings</Text>
      <View style={styles.rect4}>
        <View style={styles.rect5}>
          <Text style={styles.standings}>{rankStat}</Text>
          <Text style={styles.Season}>{currentYear} Season</Text> {/* Tampilkan tahun saat ini */}
        </View>
        <View style={styles.rect6}>
          <Text style={styles.points}>{pointsStat}</Text>
          <Text style={styles.pointsInfo}>Points</Text>
        </View>
      </View>
      <Text style={styles.teamTitle}>Team</Text>
      <Text style={styles.team2}>{teamName}</Text>
      <Text style={styles.countryTitle}>Country</Text>
      <View style={styles.rect7}>
        <View style={styles.rect8}>
          <Text style={styles.CountryName}>{countryName}</Text>
        </View>
        <View style={styles.rect9}>
          <Image source={{ uri: countryFlag }} style={styles.countryFlag} />
        </View>
      </View>
      <Text style={styles.pointsPerRace}>Points Per Race</Text>
      {races.map((race, index) => (
        <View key={index} style={styles.raceRow}>
          <Text style={styles.gPName}>{race.displayName}</Text>
          <Text style={styles.perRacePoints}>{race.displayValue} Points</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    backgroundColor: "#000000",
    flexDirection: "row",
    alignSelf: "stretch"
  },
  rect2: {
    flex: 1,
    alignSelf: "stretch",
    marginRight: 0
  },
  image: {
    width: 125,
    height: 129
  },
  rect3: {
    flex: 1,
    marginRight: 10,
    alignSelf: "flex-end",
    alignItems: "flex-end"
  },
  racingNo: {
    fontFamily: "F1Font",
    color: "#ffffff",
    fontSize: 40
  },
  name: {
    fontFamily: "F1Font",
    color: "#ffffff",
    fontSize: 20,
    marginTop: 10,
  },
  team: {
    fontFamily: "F1Font",
    color: "#ffffff",
    marginTop: 10,
  },
  championshipStanding: {
    fontFamily: "F1Font",
    color: "#000000",
    marginTop: 10,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderTopRightRadius: 10,
    borderColor: "#e10600",
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  rect4: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginLeft: 10,
    marginRight: 10,
  },
  rect5: {
    flex: 0.5,
    alignSelf: "flex-end"
  },
  standings: {
    fontFamily: "F1Font",
    color: "#000000",
    fontSize: 40
  },
  Season: {
    fontFamily: "F1Font",
    color: "#000000"
  },
  rect6: {
    flex: 0.5,
    alignItems: "flex-end",
    alignSelf: "flex-end"
  },
  points: {
    fontFamily: "F1Font",
    color: "#000000",
    fontSize: 20
  },
  pointsInfo: {
    fontFamily: "F1Font",
    color: "#000000"
  },
  teamTitle: {
    fontFamily: "F1Font",
    color: "#000000",
    marginTop: 10,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderTopRightRadius: 10,
    borderColor: "#e10600",
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  team2: {
    fontFamily: "F1Font",
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
    color: "#121212"
  },
  countryTitle: {
    fontFamily: "F1Font",
    color: "#000000",
    marginTop: 10,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderTopRightRadius: 10,
    borderColor: "#e10600",
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  rect7: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginLeft: 10,
    marginRight: 15,
  },
  rect8: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  CountryName: {
    fontFamily: "F1Font",
    color: "#121212"
  },
  rect9: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  countryFlag: {
    width: 28,
    height: 28
  },
  pointsPerRace: {
    fontFamily: "F1Font",
    color: "#000000",
    marginTop: 10,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderTopRightRadius: 10,
    borderColor: "#e10600",
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  rect10: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginLeft: 10,
    marginRight: 15,
    borderBottomWidth: 1,
    borderColor: "#000000"
  },
  rect11: {
    flex: 0.5,
    alignItems: "flex-start",
    alignSelf: "center"
  },
  gPName: {
    fontFamily: "F1Font",
    color: "#121212",
    textAlign: "left", // Pastikan teks menempel ke kiri
    flex: 1, // Membuatnya fleksibel untuk menempati sisi kiri
  },
  rect12: {
    flex: 0.5,
    alignItems: "flex-end"
  },
  perRacePoints: {
    fontFamily: "F1Font",
    color: "#121212",
    fontSize: 18,
    textAlign: "right", // Pastikan teks menempel ke kanan
    flex: 1, // Membuatnya fleksibel untuk menempati sisi kanan
  },
  perRacePointsInfo: {
    fontFamily: "F1Font",
    color: "#121212",
    fontSize: 12
  },
  raceRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Mengatur elemen ke kiri dan kanan
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default DriverDetail;
