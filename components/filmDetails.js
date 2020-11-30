import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ActivityIndicator, ScrollView, Image, Text } from 'react-native';
import moment from 'moment';
import numeral from 'numeral';

import { getFilmsDetailsFromApi, getImageFromApi } from "../API/TMDBApi";


export default function filmDetails({route}) {
    
    //From Search.js Navigation Route to API call
    const filmId = route.params.idFilm;

    const [isLoading, setIsLoading] = useState(true);
    const [dataDetailsFilm, setDataDetailsFilm] = useState();

    useEffect ( () => {
        async function loadDetails() {
            var result = await getFilmsDetailsFromApi(filmId).then(data =>{
                // console.log("@@@@@@@@@"+data.genres+"@@@@@@@@@@");
                setDataDetailsFilm(data);
                setIsLoading(false);
            });
        }
        loadDetails()
    },[]);

    var displayLoading = () => {
        if(isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" color="#3c40c6" />
                </View>
            )
        }
    }

    var displayFilms = () => {
        if(dataDetailsFilm != undefined) {
            console.log("@@@"+dataDetailsFilm.genres+"@@@");
            return(
                <ScrollView style={styles.scroll_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(dataDetailsFilm.backdrop_path)}}
                    />
                    <Text style={styles.title}>{dataDetailsFilm.title}</Text>
                    <Text style={styles.overview}>{dataDetailsFilm.overview}</Text>
                    <Text style={styles.details}>Sorti le : {moment(dataDetailsFilm.release_date).format("DD/MM/YYYY")}</Text>
                    <Text style={styles.details}>Note : {dataDetailsFilm.vote_average} /10</Text>
                    <Text style={styles.details}>Nombre de votes : {dataDetailsFilm.vote_count}</Text>
                    <Text style={styles.details}>Budget : {numeral(dataDetailsFilm.budget).format("0,0[.]00 $")}</Text>
                    <Text style={styles.details}>Genres : {dataDetailsFilm.genres.map(function(genre){return genre.name;}).join(" / ")}</Text>
                    <Text style={styles.details}>Distribution : {dataDetailsFilm.production_companies.map(function(brand){return brand.name;}).join(" / ")}</Text>
                </ScrollView>
            )
        }
    }

    //Main view screen
    return(
        <View style={styles.main_container}>
            {displayLoading()}
            {displayFilms()}
        </View>
    )
}



const styles = StyleSheet.create({
    main_container: {
      flex: 1,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scroll_container: {
        flex: 1,
    },
    title: {
        flex: 1,
        fontWeight: "bold",
        fontSize: 35,
        color: "#3c40c6",
        textAlign: "center",
        margin: 10
    },
    image: {
        height: 200,
        margin: 5,
      },
      overview: {
          flex: 1,
          fontSize: 16,
          textAlign:"justify",
          lineHeight: 25,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 20
      },
      details: {
        flex: 1,
        fontSize: 14,
        fontStyle: "italic",
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
  })