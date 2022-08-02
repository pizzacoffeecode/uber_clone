<script src="http://localhost:8097"></script>;
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setDestination, setOrigin, setHome, setWork } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import NavFavourites from './../components/NavFavourites';



const HomeScreen = () => {
    const dispatch = useDispatch();

    const navigation = useNavigation();

    return (
        <SafeAreaView style={ tw`bg-white h-full` }>
            <View style={ tw`p-5` }>
                <Image
                    style={ {
                        width: 100, height: 100, resizeMode: "contain",
                    } }
                    source={ {
                        uri: "https://links.papareact.com/gzs",
                    } }
                />
                <GooglePlacesAutocomplete
                    placeholder="Where From?"
                    styles={ {
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        },
                    } }

                    onPress={ (data, details = null) => {
                        dispatch(
                            setOrigin({
                                location: details.geometry.location,
                                description: data.description
                            })
                        );

                        dispatch(setDestination(null));
                    } }
                    fetchDetails={ true }
                    returnKeyType={ "search" }
                    enablePoweredByContainer={ false }
                    minLength={ 2 }

                    query={ {
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en', // language of the results
                    } }
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={ 400 }
                    onFail={ (error) => console.error(error) }

                />
                <NavOptions nav={ navigation } />
                <NavFavourites nav={ navigation } />
            </View>
        </SafeAreaView >
    );
};

export default HomeScreen;

// const styles = StyleSheet.create({
//     text: {
//         color: 'blue',
//     }
// });


/*
mix tailwind with regular css styling
    <Text style={ [
        tw`text-red-500 p-20`,
        {
            fontStyle: "italic",
        }
    ] }>I am the home screen</Text>
*/


