import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import axios from "axios";
import { ScrollView } from "react-native-web";

function ConstructorDetail({ route }) {
  const { teamId } = route.params;
  const [constructorData, setConstructorData] = useState(null);
  const currentYear = new Date().getFullYear(); // Ambil tahun saat ini

  useEffect(() => {
    const fetchConstructorData = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://f1-motorsport-data.p.rapidapi.com/standings-controllers",
          params: { year: currentYear.toString() }, // Gunakan tahun saat ini
          headers: {
            "x-rapidapi-key": "APIKEY",
            "x-rapidapi-host": "f1-motorsport-data.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const selectedConstructor = response.data.standings.entries.find(entry => entry.team.id === teamId);
        setConstructorData(selectedConstructor);
      } catch (error) {
        console.error("Error fetching constructor data:", error);
      }
    };

    fetchConstructorData();
  }, [teamId, currentYear]);

  if (!constructorData) {
    return <Text>Loading...</Text>;
  }

  const { team, stats } = constructorData;
  const standingPosition = stats.find(stat => stat.name === "rank")?.displayValue;
  const currentPoints = stats.find(stat => stat.name === "points")?.displayValue;
  const raceStats = stats.filter(stat => stat.shortName && stat.value).map(race => ({
    name: race.displayName,
    points: race.displayValue,
  }));

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.rect, { backgroundColor: `#${team.color}` }]}>
        <Text style={styles.name}>{team.displayName}</Text>
      </View>
      <Text style={styles.championshipStanding}>Championship Standings</Text>
      <View style={styles.rect4}>
        <View style={styles.rect5}>
          <Text style={styles.standings}>{standingPosition}</Text>
          <Text style={styles.Season}>{currentYear} Season</Text> {/* Tampilkan tahun saat ini */}
        </View>
        <View style={styles.rect6}>
          <Text style={styles.points}>{currentPoints}</Text>
          <Text style={styles.pointsInfo}>Points</Text>
        </View>
      </View>
      <Text style={styles.pointsPerRace}>Points Per Race</Text>
      {raceStats.map((race, index) => (
        <View key={index} style={styles.rect10}>
          <View style={styles.rect11}>
            <Text style={styles.gPName}>{race.name}</Text>
          </View>
          <View style={styles.rect12}>
            <Text style={styles.perRacePoints}>{race.points}</Text>
            <Text style={styles.perRacePointsInfo}>Points</Text>
          </View>
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
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingTop: 10,
      paddingBottom: 5,
      paddingRight: 5,
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
      color: "#121212"
    },
    rect12: {
      flex: 0.5,
      alignItems: "flex-end"
    },
    perRacePoints: {
      fontFamily: "F1Font",
      color: "#121212",
      fontSize: 18
    },
    perRacePointsInfo: {
      fontFamily: "F1Font",
      color: "#121212",
      fontSize: 12
    }
  });

export default ConstructorDetail;
