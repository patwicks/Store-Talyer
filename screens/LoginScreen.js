import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    View, 
    Text, 
    Image,
    TextInput,
    TouchableOpacity,
    CheckBox,
    ActivityIndicator
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
// icons
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import FormStyle from '../components/styles/style.login';

// Login input validation using Yup package
 const LoginSchema = yup.object({
        email: 
            yup.string()
            .email('Invalid email Address')
            .required('Email is Required')
            .min(15, 'Please check your email'),
        password: 
            yup.string()
            .required('Password is required')
            .min(8, 'Password is too short')
    })

export default function LoginScreen({navigation}) {
    const [isSelected, setSelection] = useState(false);
    const [secureText,setSecureText] = useState(true)
    const [error, setError] = useState();
    const [storedCredential, setStoredCredential] = useState({})
    
  
    const handleLogin =  async(loginCredential) => {
        // persist login details
        const persistLogin = async(loginCredentials) => {
            await AsyncStorage
                .setItem('findLoginCredential', JSON.stringify(loginCredentials))
                .then(() => {
                    return setStoredCredential(loginCredentials);
                })
                .catch(err => {
                    console.log(err);
                })
        }

        const url=`https://api-find-talyer.herokuapp.com/api/store/login`
         await axios
            .post(url, loginCredential)
            .then(response => {
                navigation.navigate('HomeScreen');
                return persistLogin(response.data);
            })
            .catch(err => {
                setError(err.response.data.error);
            })
    }

   
    return (
        <KeyboardWrapper>
            <View style = {FormStyle.loginContainer}>
                <Image
                    style={FormStyle.loginImg}
                    source={require('../assets/images/login.png')}
                />
                 <View style={FormStyle.header}>
                    <Image
                        style={FormStyle.headerLogo}
                        source={require('../assets/images/header-logo.png')}
                    />
                 </View>
                 {/* Display error from the server */}
               {error && <Text style={FormStyle.inputServerError}>{error}</Text>}
             
                <View styel = { FormStyle.formContainer}>
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={LoginSchema}
                    onSubmit={(values, actions) => {
                        handleLogin(values);
                        setError(null);
                        setTimeout(()=> {
                            actions.setSubmitting(false);
                            actions.resetForm();
                        }, 3000)
                    }
                    }
                >
                {(props) =>{
                    return (
                        <>
                        <Text style={FormStyle.storeText}>STORE</Text>
                            {/* Email address Input  */}
                        <Text style = {FormStyle.inputLabel}>Email address</Text>
                        <View style = {FormStyle.inputContainer}>
                            <MaterialIcons style= {FormStyle.icon} name="email" />
                            <TextInput
                                    name='email'
                                    style = {FormStyle.input}
                                    placeholder='Email address'
                                    autoCapitalize= 'none'
                                    keyboardType="email-address"
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    onBlur={props.handleBlur('email')}
                            />
                        </View>
                            <Text style = {FormStyle.inputError}>
                                {props.touched.email ? (<Text  style = {FormStyle.inputError}>{props.errors.email}</Text>) : null}
                            </Text>
                            {/* User Password Input */}
                        <Text style = {FormStyle.inputLabel} >Password</Text>
                        <View style = {FormStyle.inputContainerPass}>
                            <FontAwesome5 style= {FormStyle.iconKey} name="key" />
                            <TextInput
                                name='password'
                                style = { FormStyle.inputPass}
                                placeholder='Password'
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                                secureTextEntry={secureText}
                                onBlur={props.handleBlur('password')}
                            />
                            <TouchableOpacity onPress={()=> {setSecureText(!secureText)}}>
                                    {secureText 
                                    ? <Ionicons style={FormStyle.passIcon} name="eye" size={24} />
                                    : <Ionicons style={FormStyle.passIcon} name="eye-off" size={24}/> }
                            </TouchableOpacity>
                        </View>
                        <Text style = {FormStyle.inputError}>
                            {props.touched.password ? (<Text  style = {FormStyle.inputError}>{props.errors.password}</Text>) : null}
                        </Text>
                            {/* Forgot Password */}
                            <TouchableOpacity onPress={()=> navigation.push('ForgotPasswordScreen')}>
                                <Text style={FormStyle.forgotText}>Forgot your password?</Text>
                            </TouchableOpacity>
                            {/* Terms and Conditions */}
                            <View style={FormStyle.terms}>
                                <CheckBox value={isSelected} onValueChange={setSelection} />
                                <Text style={FormStyle.termsText}>You agree with our </Text>
                                <TouchableOpacity onPress={() => navigation.push('TermsAndConditionsScreen') }>
                                    <Text style={FormStyle.termsText2}>Terms and Conditions</Text>
                                </TouchableOpacity>
                            </View>
                            {/* Login button */}
                            {}
                            <TouchableOpacity 
                                style={isSelected ? FormStyle.btnLogin : FormStyle.btnLoginDisable} 
                                onPress={props.handleSubmit} 
                                disabled={isSelected ? false : true}
                            >
                                {props.isSubmitting ? <ActivityIndicator size='large' color='#ffffff' /> : <Text style={FormStyle.loginText}>Login</Text>}
                            </TouchableOpacity>

                            {/* Signup navigator */}
                           <View style={FormStyle.bottom}>
                            <Text>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}><Text style={FormStyle.gotoSign}>Signup</Text></TouchableOpacity>
                           </View>
                        </>
                    )
                }}
                </Formik>
                </View>   
            </View>
        </KeyboardWrapper>
    )
}
