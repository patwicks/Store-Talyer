import React, { useEffect, useState } from 'react';
import { 
    Text, 
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    ImageBackground,
    Alert,
    BackHandler
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MapView, { Callout, Marker } from 'react-native-maps';

// local imports
import HandleBackAction from '../../utils/HandleBackAction';
import Styles from '../../components/styles/style.profile';

// icons
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function StoreProfileScreen({navigation}) {
    // State Variables
    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [id, setId] = useState();
    const [token, setToken] = useState();

    const [isLoading, setIsLoading] = useState(true);



    // Userdata
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [middlename, setMiddlename] = useState();
    const [gender, setGender] = useState();
    const [age, setAge] = useState();
    const [email, setEmail] = useState();
    const [contactNo, setContactNo] = useState();
    const [accountType, setAccountType] = useState();
    const [profileUrl, setProfileUrl] = useState();
    const [coverUrl, setCoverUrl] = useState();
    const [storeName, setStoreName] = useState();
    const [storeAddress, setStoreAddress] = useState();
    const [storeLat, setStoreLat] = useState();
    const [storeLong, setStoreLong] = useState();


    // Pick image profile
    const profilePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }

            if (status === 'granted') {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                });

                if (!result.cancelled) {
                    setProfileImage(result.uri);
                }
            }    
    }
    // Upload image Profile
    const uploadImageProfile = () => {
        const formData = new FormData();
        formData.append('profile', {
            // temporary data, it will change it backend
            name: new Date() + '_profile',
            uri: profileImage,
            type: 'image/png'
        })

        axios
            .post('https://api-find-talyer.herokuapp.com/api/store/upload', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    authtoken: token
                }
            })
            .then(response => {
                // console.log(response.data.message);
                return fetchUserData();
            })
            .catch(error => {
                console.log(error.response.data.error);
            })
    }

    // Pick image Cover
    const coverPicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }

            if (status === 'granted') {
                let resultCover = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                });

                if (!resultCover.cancelled) {
                    setCoverImage(resultCover.uri);
                }
            }    
    }
    // Upload image Profile
    const uploadCoverPhoto = () => {
        const formData = new FormData();
        formData.append('cover', {
            // temporary data, it will change it backend
            name: new Date() + '_cover',
            uri: coverImage,
            type: 'image/png'
        })

        axios
            .post('https://api-find-talyer.herokuapp.com/api/store/upload/cover', formData, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    authtoken: token
                }
            })
            .then(response => {
                return fetchUserData();
            })
            .catch(error => {
                console.log(error.response.data.error);
            })
    }

    const getData = async () => {
        try {
          const data = await AsyncStorage.getItem('findLoginCredential');
          const parsedData = JSON.parse(data);
          const { userID, userToken, storeLatitude, storeLongitude} = parsedData;
            setId(userID);
            setToken(userToken);
            setStoreLong(storeLongitude)
            setStoreLat(storeLatitude)
        } catch(e) {
          console.log(e)
        }
      }

    //   Fetch user data
    const fetchUserData = async () => {
       await axios
            .get(`https://api-find-talyer.herokuapp.com/api/store/${id}`)
            .then(response => {
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
                setMiddlename(response.data.middlename);
                setGender(response.data.gender);
                setAge(response.data.age);
                setEmail(response.data.email);
                setContactNo(response.data.contactNo);
                setProfileUrl(response.data.profileURL);
                setAccountType(response.data.accountType);
                setCoverUrl(response.data.coverPhotoURL);
                setStoreName(response.data.storeName);
                setStoreAddress(response.data.storeAddress);
                setIsLoading(false);
            })
            .catch(error => {
                // console.log(error)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    // Logout User
    const logoutuser = async() => {
        try {
            await AsyncStorage.removeItem('findLoginCredential');
            console.log('Removed Credentials');
            }
        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        let mounted = false;
        if(!mounted) {
            getData();
            fetchUserData();
            HandleBackAction();
        }
        return(() => {mounted = true});
        
    }, [fetchUserData, getData, HandleBackAction])
    return (
        <View style={Styles.mainContainer}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
             <View style={Styles.topProfile}>
                { coverImage ? <ImageBackground source={{uri: coverImage }} style={Styles.coverPhoto} /> : <ImageBackground source={{uri: coverUrl }} style={Styles.coverPhoto} blurRadius={2}>
                    <View style={Styles.circleContainer}>
                        {profileImage ? <Image style={Styles.profileImage} source={{uri: profileImage}} /> : <Image style={Styles.profileImage} source={{uri: profileUrl}} />}
                        <TouchableOpacity style={Styles.editProfile} onPress={profilePicker}>
                            <MaterialIcons name="mode-edit" size={20} color="#f2f2f2" />
                        </TouchableOpacity> 
                    </View>                    
                    {/* Fetch loding indicator */}
                    {isLoading ? <ActivityIndicator size='large' color='#ffffff' /> : null}
                    <Text style={Styles.topName}>{storeName}</Text>
                </ImageBackground> }

                <TouchableOpacity style={Styles.editCover} onPress={coverPicker}>
                    <MaterialIcons name="mode-edit" size={20} color="#f2f2f2" />
                </TouchableOpacity> 
             </View>

             {
                        profileImage?
                        ( <TouchableOpacity
                            style={Styles.btnUpload}
                            onPress={() => {uploadImageProfile(); setProfileImage(null);}}
                        >
                            <Text style={{
                                color: '#ffffff',
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                fontFamily: 'Poppins-SemiBold'
                            }}>Upload</Text>
                        </TouchableOpacity>)
                        : null
                    }

                    {
                        coverImage ?
                        ( <TouchableOpacity
                            style={Styles.btnUploadCover}
                            onPress={() => {uploadCoverPhoto(); setCoverImage(null);}}
                        >
                            <Text style={{
                                color: '#ffffff',
                                textTransform: 'uppercase',
                                textAlign: 'center',
                                fontFamily: 'Poppins-SemiBold'
                            }}>Upload Cover Photo</Text>
                        </TouchableOpacity>)
                        : null
                    }
             {/* +++++++++++++++++++++++++ Store Infomation ++++++++++++++++++++++++++++ */}
             <View style={Styles.infoContainer}>
                    <View style={Styles.infoHeadTextContainer}>
                        <Text style={{fontSize: 15, color: '#ffffff', textTransform: 'uppercase'}}>Store Information</Text>
                    </View>
                    <View style={Styles.detailsContainer}>
                        <View style={Styles.mapContainer}>
                            { isLoading ? <ActivityIndicator color='#0073e6' size='large' /> 
                            : <MapView 
                                style={Styles.mapStore}
                                initialRegion={{
                                    latitude: storeLat,
                                    longitude: storeLong,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker
                                    coordinate={{ latitude : storeLat , longitude : storeLong }}
                                    pinColor='red'
                                >
                                    <Callout>
                                        <Text>{storeName}</Text>
                                    </Callout>
                                </Marker>
                            </MapView>
                            
                            }
                        </View>
                        <View style={Styles.infContainer}>
                            <MaterialIcons 
                                name="store" 
                                size={27} 
                                color="black" 
                                color="#FE5F55" 
                                style={{paddingRight: 20}}
                            />
                            <Text style={Styles.info}><Text>Store name: </Text> {storeName}</Text>
                        </View>
                        <View style={Styles.infContainer}>
                            <MaterialIcons 
                                name="location-pin" 
                                size={30} 
                                color="black" 
                                color="#FE5F55" 
                                style={{paddingRight: 20}}
                            />
                            <Text style={Styles.info}><Text>Store Address: </Text> {storeAddress}</Text>
                        </View>
                        <View style={Styles.nameContainer}>
                            <FontAwesome 
                            name="user-circle" 
                            size={24} 
                            color="#FE5F55" 
                            style={{paddingRight: 20}}
                            />
                            <View>
                            <Text style={Styles.info}><Text>Owner: </Text> {firstname} {middlename} {lastname}</Text>
                            <Text style={Styles.info}><Text>Gender: </Text> {gender}</Text>
                            <Text style={Styles.info}><Text>Age: </Text> {age}</Text>
                            </View>
                        </View>

                        <View style={Styles.infContainer}>
                            <MaterialCommunityIcons name="email" size={24} color="#FE5F55" style={{paddingRight: 20}}/>
                            <Text style={Styles.info}>{ email }</Text>
                        </View>

                        <View style={Styles.infContainer}>
                            <FontAwesome name="phone" size={24} color="#FE5F55" style={{paddingRight: 20}}/>
                            <Text style={Styles.info}>(+63){ contactNo }</Text>
                        </View>
                       
                       
                        <TouchableOpacity style={Styles.btnLogout} onPress={() => {
                            logoutuser();
                            Alert.alert(
                                "Logout",
                                "Fully restart and remove the application on task list to Login again!",
                                [
                                    { text: "OK", onPress: () => BackHandler.exitApp()}
                                ]
                                );
                        }}>
                            <Text style={{
                                fontSize: 16,
                                textTransform: 'uppercase',
                                color: '#ffffff'
                            }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
             </View>
             </ScrollView>
        </View>
    )
}
