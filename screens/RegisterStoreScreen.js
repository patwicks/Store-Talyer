import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Picker, TouchableOpacity, CheckBox, ActivityIndicator, Alert} from 'react-native'
// Form and Validation
import { Formik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'


import * as Location from 'expo-location';
// icons
import { Ionicons } from '@expo/vector-icons';
// local imports
import styles from '../components/styles/style.register';
import KeyboardWrapper from '../utils/KeyboardWrapper';

// Register from validation
const RegisterSchema = yup.object({
    firstname: 
        yup.string()
        .required('Firstname is Required')
        .min(2, 'Firstname is too short')
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        .trim(),
    lastname: 
        yup.string()
        .required('Lastname is Required')
        .min(2, 'Lastname is too short')
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        .trim(),
    middlename: 
        yup.string()
        .required('Middlename is Required')
        .min(2, 'Middlename seems too short')
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        .trim(),
   age:
        yup.string()
        .required('Age is required')
        .min(2, 'Age is not accepted')
        .max(2, 'Age is not accepted')
        .test('Accepted', 'Age must be atleast 18 years and up', (val) => {
            return parseInt(val) >= 18
        }),
    storeName: yup.string()
        .required('Name of the Store is Required')
        .min(5, 'Name of the Store is too short')
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        .trim(),
    storeAddress:  yup.string()
        .required('Store Address is Required')
        .min(10, 'Store Address is too short')
        .trim(),
    email: 
        yup.string()
        .email('Invalid email Address')
        .required('Email is Required')
        .min(15, 'Please check your email'),
    password: 
        yup.string()
        .required('Password is required')
        .min(8, 'Password is too short')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            "Password is weak, must contain the following(0-9/a-z/A-Z)"
          ),
    contactNo: 
        yup.string()
        .required('Contact number is required')
        .min(10, 'Invalid contact number')
        .max(10, 'Invalid contact number'),
    profileURL: yup.string(),
    coverPhotoURL: yup.string(),
    latitude: yup.number().required('latitude is required'),
    longitude: yup.number().required('Longitude is required')
})

export default function RegisterStoreScreen({navigation}) {
   const [secureText,setSecureText] = useState(true);
   const [isSelected, setIsSelected] = useState(false);
   const [error, setError] = useState();

    // Current location
    let [currentLat, setCurrentLat] = useState();
    let [currentLong, setCurrentLong] = useState();

    // handle registration for store
    const handleRegisterStore = async(storeData) => {
        const url = 'https://api-find-talyer.herokuapp.com/api/store/register';
        await axios
            .post(url, storeData)
            .then(response => {
                const { email, _id } = response.data;
                navigation.navigate('OtpScreen', {
                 user_email: email,
                 user_id: _id
                });
            })
            .catch(err => {
                setError(err.response.data.error);
            })
    }

    const getCurrentLocation = async() => {
        const { status } =  await Location.requestForegroundPermissionsAsync();
        try {
            if( status !== 'granted') {
                console.log('Location not granted');
                return
            }
            else {
                 const myLocation = await Location.getCurrentPositionAsync();
                const jsonLocation = JSON.stringify(myLocation);
                const jsonParsed = JSON.parse(jsonLocation);
                console.log(jsonParsed);
                setCurrentLat(jsonParsed.coords.latitude)
                setCurrentLong(jsonParsed.coords.longitude)
             } 
            
        } catch (error) {
            console.log('There was an error on finding current Location!')
        }
        }

        

    const reminderForUser = () => {
        Alert.alert(
        "Reminder",
        "Upon Regsitration make sure that you are on the exact location of the store. Your current location will be your store address.Thank you!",
        [
            { text: "OK" }
        ]
        );
    }

    useEffect(() => {
        getCurrentLocation();
        reminderForUser();
    },[]);

    return (
        <KeyboardWrapper>
            <View style={styles.formContainer}>
                <Text style={styles.headerText}>Store Register</Text>
                <Text style={styles.personalText}>Owner Information:</Text>
                <View style={styles.line}></View>
                {/* Form container */}
                <View style={styles.form}>
                    {/* Formik form */}
                    <Formik
                        initialValues={{
                            firstname: '',
                            lastname: '',
                            middlename: '',
                            gender: 'Male',
                            age: '',
                            storeName: '',
                            storeAddress: '',
                            email: '',
                            password: '',
                            contactNo: '',
                            isValidated: false,
                            profileURL: 'https://res.cloudinary.com/dxcbmlxoe/image/upload/v1630030578/driver_profile/default-profile_o7dena.png',
                            coverPhotoURL: 'https://res.cloudinary.com/dxcbmlxoe/image/upload/v1630306438/store_cover_photo/default-cover-photo_zb6vzv.jpg',
                            latitude: '',
                            longitude: '',
                        }}
                        validationSchema={RegisterSchema}
                        onSubmit={(values, actions) => {
                            handleRegisterStore(values);
                            setError(null);
                           setTimeout(() => {
                               actions.setSubmitting(false);
                               actions.resetForm();
                           }, 3000);
                        }}
                    >
                    {(props)=> {
                        return(
                            <>
                                <TextInput
                                    name='firstname'
                                    style = {styles.input}
                                    placeholder='Firtname'
                                    keyboardType='ascii-capable'
                                    onChangeText={props.handleChange('firstname')}
                                    value={props.values.firstname}
                                    onBlur={props.handleBlur('firstname')}
                                />
                                <Text style = {styles.inputError}>
                                    {props.touched.firstname ? (<Text  style = {styles.inputError}>{props.errors.firstname}</Text>) : null}
                                </Text>
                                 <TextInput
                                    name='lastname'
                                    style = {styles.input}
                                    placeholder='Lastname'
                                    keyboardType='ascii-capable'
                                    onChangeText={props.handleChange('lastname')}
                                    value={props.values.lastname}
                                    onBlur={props.handleBlur('lastname')}
                                />
                                <Text style = {styles.inputError}>
                                    {props.touched.lastname ? (<Text  style = {styles.inputError}>{props.errors.lastname}</Text>) : null}
                                </Text>
                                <TextInput
                                    name='middlename'
                                    style = {styles.input}
                                    placeholder='Middlename'
                                    keyboardType='ascii-capable'
                                    onChangeText={props.handleChange('middlename')}
                                    value={props.values.middlename}
                                    onBlur={props.handleBlur('middlename')}
                                />
                                <Text style = {styles.inputError}>
                                    {props.touched.middlename ? (<Text  style = {styles.inputError}>{props.errors.middlename}</Text>) : null}
                                </Text>
                                <View style = {styles.pickerContainer} name='gender'>
                                    <Picker style = {styles.pickerInput} selectedValue = {props.values.gender} onValueChange = {props.handleChange('gender')}>
                                        <Picker.Item label='Male' value='Male' />
                                        <Picker.Item label='Female' value='Female' />
                                    </Picker>
                                </View>

                                <TextInput
                                    style={styles.input}
                                    name='age'
                                    placeholder='Age'
                                    keyboardType='number-pad'
                                    value={props.values.age}
                                    onChangeText={props.handleChange('age')}
                                />
                                <Text style = {styles.inputError}>
                                    {props.touched.age ? (<Text  style = {styles.inputError}>{props.errors.age}</Text>) : null}
                                </Text>
                                <Text style={styles.personalText}>Store Information:</Text>
                                {/* Store name */}
                                <TextInput
                                    name='storeName'
                                    style = {styles.input}
                                    placeholder='Store name'
                                    keyboardType='ascii-capable'
                                    onChangeText={props.handleChange('storeName')}
                                    value={props.values.storeName}
                                    onBlur={props.handleBlur('storeName')}
                                />
                                <Text style = {styles.inputError}>
                                    {props.touched.storeName ? (<Text  style = {styles.inputError}>{props.errors.storeName}</Text>) : null}
                                </Text>
                                {/* store Address */}
                                <TextInput
                                    name='storeAddress'
                                    style = {styles.input}
                                    placeholder='Store address'
                                    keyboardType='ascii-capable'
                                    onChangeText={props.handleChange('storeAddress')}
                                    value={props.values.storeAddress}
                                    onBlur={props.handleBlur('storeAddress')}
                                />
                                <Text style = {styles.inputError}>
                                    {props.touched.storeAddress ? (<Text  style = {styles.inputError}>{props.errors.storeAddress}</Text>) : null}
                                </Text>
                                <TextInput 
                                    style={styles.input}
                                    name='email'
                                    placeholder='Email Address'
                                    autoCapitalize= 'none'
                                    keyboardType='email-address'
                                    value={props.values.email}
                                    onChangeText={props.handleChange('email')}
                                />
                                <Text style = {styles.inputError}>
                                    {props.touched.email ? (<Text  style = {styles.inputError}>{props.errors.email}</Text>) : null}
                                </Text>
                               <View style={styles.passContainer}>
                                    <TextInput 
                                        style={styles.inputPass}
                                        name='password'
                                        placeholder='Password'
                                        value={props.values.password}
                                        onChangeText={props.handleChange('password')}
                                        secureTextEntry={secureText}
                                    />
                                    <TouchableOpacity onPress={()=> {setSecureText(!secureText)}}>
                                        {secureText 
                                        ? <Ionicons style={styles.passIcon} name="eye" size={24} />
                                        : <Ionicons style={styles.passIcon} name="eye-off" size={24}/> }
                                    </TouchableOpacity>
                               </View>
                               <Text style = {styles.inputError}>
                                    {props.touched.password ? (<Text  style = {styles.inputError}>{props.errors.password}</Text>) : null}
                                </Text>

                               <TextInput
                                style={styles.input}
                                name='contactNo'
                                placeholder='Contact No. (9xxxxxxxxx)'
                                keyboardType='number-pad'
                                maxLength={10}
                                value={props.values.contactNo}
                                onChangeText={props.handleChange('contactNo')}
                               />
                                <Text style = {styles.inputError}>
                                    {props.touched.contactNo ? (<Text  style = {styles.inputError}>{props.errors.contactNo}</Text>) : null}
                                </Text>
                                <Text style={styles.personalText}>Store Map location:</Text>
                                <Text style={styles.personalText}>Latitude: {currentLat} Longitude: {currentLong}</Text>
                                <Text style={styles.personalText}> </Text>
                                <TextInput
                                    style={styles.input}
                                    name='latitude'
                                    placeholder='Type your latitude here...'
                                    keyboardType='number-pad'
                                    value={props.values.latitude}
                                    onChangeText={props.handleChange('latitude')}
                               />
                                <Text style = {styles.inputError}>
                                    {props.touched.latitude ? (<Text  style = {styles.inputError}>{props.errors.latitude}</Text>) : null}
                                </Text>

                                <TextInput
                                    style={styles.input}
                                    name='longitude'
                                    placeholder='Type your longitude here...'
                                    keyboardType='number-pad'
                                    value={props.values.longitude}
                                    onChangeText={props.handleChange('longitude')}
                               />
                                <Text style = {styles.inputError}>
                                    {props.touched.longitude ? (<Text  style = {styles.inputError}>{props.errors.longitude}</Text>) : null}
                                </Text>

                                {/* Server Error here */}
                                {error &&  <Text style={styles.inputServerError}>{error}</Text>}

                               <View style={styles.terms}>
                               <CheckBox value={isSelected} onValueChange={setIsSelected} />
                                <Text style={styles.termsText}>You agree with our </Text>
                                <TouchableOpacity onPress={() => navigation.push('TermsAndConditionsScreen') }>
                                    <Text style={styles.termsText2}>Terms and Conditions</Text>
                                </TouchableOpacity>
                               </View>
                               <TouchableOpacity
                                    style={isSelected ? styles.btnSignup: styles.btnSignupDisable} 
                                    onPress={props.handleSubmit} 
                                    disabled={isSelected ? false : true}>
                                        {props.isSubmitting 
                                        ? <ActivityIndicator size='large' color='#ffffff' /> 
                                        : <Text style={styles.signupText}>Signup</Text>}
                                </TouchableOpacity>

                                  {/* Signup navigator */}
                                <View style={styles.bottom}>
                                    <Text>Don't have an account? </Text>
                                    <TouchableOpacity onPress={() => navigation.push('LoginScreen')}><Text style={styles.gotoSignup}>Signin</Text></TouchableOpacity>
                                </View>
                                {/* <Button onPress={props.handleSubmit} title='submit'/>    */}
                            </>
                        )
                    }}
                    </Formik>
                    {/* Picker */}
                    {/* Formik form End*/}
                </View>
                 {/* Form container End*/}
            </View>
        </KeyboardWrapper>
    )
}