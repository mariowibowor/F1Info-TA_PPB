import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Linking, ScrollView, SafeAreaView, StatusBar, Platform } from "react-native";

function News({ navigation }) {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetchNewsData();
  }, []);

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
      setNewsData(data.slice(0, 20));
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
      <View style={styles.rect}>
        <Text style={styles.newsTitle}>{item.headline}</Text>
        <Text style={styles.detailNews}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {/* Tambahkan StatusBar untuk menyesuaikan posisi konten */}
      <StatusBar barStyle="light-content" backgroundColor="#e10600" translucent />

      {/* Gunakan SafeAreaView agar konten tidak terpotong status bar */}
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
          <Text style={styles.newsheaderTitle}>NEWS</Text>
          <Text style={styles.recentNews}>RECENT NEWS</Text>
          <FlatList
            data={newsData}
            renderItem={renderNewsItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.newsContainer}
          />
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
  },
  newsheaderTitle: {
    fontFamily: "F1Font",
    color: "#ffffff",
    fontSize: 30,
    padding: 10,
    backgroundColor: "#e10600",
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

export default News;
