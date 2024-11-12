import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Linking, ScrollView } from "react-native";
import axios from 'axios';
import Header from "../components/header/header";

function Home({ navigation }) {
  const [newsData, setNewsData] = useState([]);
  const [standingsData, setStandingsData] = useState([]);

  useEffect(() => {
    fetchNewsData();
    fetchStandingsData();
  }, []);

  const fetchStandingsData = async () => {
    const options = {
      method: 'GET',
      url: 'http://ergast.com/api/f1/current/driverStandings.json',
      headers: {}
    };

    try {
      const response = await axios.request(options);
      const driverStandings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      setStandingsData(driverStandings.slice(0, 3)); // Only take top 3 drivers
    } catch (error) {
      console.error("Error fetching standings data:", error);
    }
  };

  const fetchNewsData = async () => {
    try {
      const response = await fetch('https://f1-motorsport-data.p.rapidapi.com/news', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'APIKEY',
          'x-rapidapi-host': 'f1-motorsport-data.p.rapidapi.com'
        }
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setNewsData(data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  const renderStandingsItem = ({ item, index }) => (
    <View style={[styles.place, index === 0 ? styles.place1 : index === 1 ? styles.place2 : styles.place3]}>
      <Text style={styles.driverName}>{item.Driver.givenName} {item.Driver.familyName}</Text>
      <Text style={styles.positionNumber}>{item.position}</Text>
    </View>
  );

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
      <View style={styles.rect}>
        <Text style={styles.newsTitle}>{item.headline}</Text>
        <Text style={styles.detailNews}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Berikan prop navigation ke Header */}
      <Header navigation={navigation} />
  
      <Text style={styles.driverStandings}>Driver Standings</Text>
      <View style={styles.homestandings}>
        {standingsData[1] && (
          <View style={[styles.place, styles.place2]}>
            <Text style={styles.driverName}>{standingsData[1].Driver.givenName} {standingsData[1].Driver.familyName}</Text>
            <Text style={styles.positionNumber}>{standingsData[1].position}</Text>
          </View>
        )}
  
        {standingsData[0] && (
          <View style={[styles.place, styles.place1]}>
            <Text style={styles.driverName}>{standingsData[0].Driver.givenName} {standingsData[0].Driver.familyName}</Text>
            <Text style={[styles.positionNumber, styles.firstPosition]}>{standingsData[0].position}</Text>
          </View>
        )}
  
        {standingsData[2] && (
          <View style={[styles.place, styles.place3]}>
            <Text style={styles.driverName}>{standingsData[2].Driver.givenName} {standingsData[2].Driver.familyName}</Text>
            <Text style={styles.positionNumber}>{standingsData[2].position}</Text>
          </View>
        )}
      </View>
  
      <Text style={styles.recentNews}>RECENT NEWS</Text>
      <FlatList
        data={newsData}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.newsContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  driverStandings: {
    fontFamily: "F1Font",
    color: "#121212",
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
  },
  homestandings: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "90%",
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  place: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#F5F5F5",
    alignSelf: "stretch",
  },
   place1: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFBE6",
  },
  place2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#C0C0C0",
  },
  place3: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#CD7F32",
  },
  driverName: {
    fontFamily: "F1Font",
    color: "#121212",
    fontSize: 16,
    textAlign: "center",
  },
  positionNumber: {
    fontFamily: "F1Font",
    color: "#121212",
    fontSize: 24,
    textAlign: "center",
  },
  firstPosition: {
    fontSize: 40,
    color: "#FFD700",
  },
  recentNews: {
    fontFamily: "F1Font",
    color: "#121212",
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
  },
  newsContainer: {
    paddingBottom: 20,
  },
  rect: {
    backgroundColor: "#FFFFFF",
    marginTop: 18,
    marginHorizontal: 19,
    padding: 16,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 10,
    borderColor: "#E6E6E6",
  },
  newsTitle: {
    fontFamily: "F1Font",
    color: "#121212",
    fontSize: 25,
    marginBottom: 8,
  },
  detailNews: {
    fontFamily: "F1Font",
    color: "#121212",
    alignSelf: "flex-start",
  },
});

export default Home;
