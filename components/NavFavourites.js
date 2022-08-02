import React, { useRef, useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, TextInput } from 'react-native';
import { Icon } from "react-native-elements";
import tw from 'twrnc';
import { selectHome, selectWork } from './../slices/navSlice';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setDestination, setOrigin, setHome, setWork } from '../slices/navSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function NavFavourites(props) {
    const dispatch = useDispatch();

    const refHome = useRef(null);
    const refWork = useRef(null);

    const home = useSelector(selectHome);
    const work = useSelector(selectWork);

    const [ originTempState, setOriginTempState ] = useState(null);

    useEffect(() => {
        if (home !== null) refHome?.current.setAddressText(home.location);
        return;
    }, [ home ]);

    useEffect(() => {
        if (work !== null) refWork?.current.setAddressText(work.location);
        return;
    }, [ work ]);

    const handleHomePress = () => {
        if (home !== null) {
            dispatch(
                setOrigin(originTempState)
            );
            { props.nav.navigate("MapScreen"); }
        }
        return;
    };
    const handleWorkPress = () => {
        if (work !== null) {
            dispatch(
                setOrigin(originTempState)
            );
            { props.nav.navigate("MapScreen"); }
        }
        return;
    };

    return (
        <View>
            <TouchableOpacity style={ tw`flex-row items-center p-5 ` } onPress={ handleHomePress }>
                <Icon
                    style={ tw`mr-4 rounded-full bg-gray-300 p-3` }
                    name="home"
                    type="ionicon"
                    color="white"
                    size={ 18 }
                />
                <View style={ tw` w-full` }>
                    <Text style={ tw`font-semibold text-lg pl-2 pb-0` }>Home</Text>
                    <GooglePlacesAutocomplete
                        ref={ refHome }
                        placeholder={ home === null ? "Enter Home Location" : home.location }
                        styles={ {
                            container: {
                                flex: 0,
                            },
                            textInput: {
                                fontSize: 14,
                            },
                        } }
                        disabled={ home === null ? false : true }
                        fetchDetails={ true }
                        onPress={ (data, details = null) => {
                            dispatch(
                                setHome({
                                    location: data.description
                                })
                            );
                            setOriginTempState({
                                location: details.geometry.location,
                                description: data.description
                            });
                        } }

                        returnKeyType={ "search" }
                        enablePoweredByContainer={ false }
                        minLength={ 2 }

                        query={ {
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'en',
                        } }
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={ 400 }
                        onFail={ (error) => console.error(error) }
                    />
                </View>
            </TouchableOpacity>
            <View
                style={ {
                    borderBottomColor: '#edf2f7',
                    borderBottomWidth: 0.5,
                } }
            />
            <TouchableOpacity style={ tw`flex-row items-center p-5 ` } onPress={ handleWorkPress }>
                <Icon
                    style={ tw`mr-4 rounded-full bg-gray-300 p-3` }
                    name="briefcase"
                    type="ionicon"
                    color="white"
                    size={ 18 }
                />
                <View style={ tw` w-full` }>
                    <Text style={ tw`font-semibold text-lg pl-2 pb-0` }>Work</Text>
                    <GooglePlacesAutocomplete
                        ref={ refWork }
                        placeholder={ work === null ? "Enter Work Location" : work.location }
                        styles={ {
                            container: {
                                flex: 0,
                            },
                            textInput: {
                                fontSize: 14,
                            },
                        } }
                        disabled={ work === null ? false : true }
                        fetchDetails={ true }
                        onPress={ (data, details = null) => {
                            dispatch(
                                setWork({
                                    location: data.description
                                })
                            );
                            setOriginTempState({
                                location: details.geometry.location,
                                description: data.description
                            });
                        } }

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
                </View>
            </TouchableOpacity>
        </View>
        // ) } />
    );
};

const styles = StyleSheet.create({});
