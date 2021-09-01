import { StyleSheet, Platform, StatusBar } from "react-native";

import Color from "../config/Color";
const FormStyle = StyleSheet.create({
    loginContainer: {
        flex: 1,
        paddingTop: 80,
        padding: 20,
        backgroundColor: Color.white,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#e6e6e6',
        marginBottom: 15
    },
    loginImg: {
        alignSelf: 'center'
    },
    headerLogo: {
        width: 90,
        height: 50,
        resizeMode: 'contain'
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        marginVertical: 20,
        color: Color.secondary,
        borderBottomWidth: 1,
        borderColor: '#e6e6e6',
        textTransform: 'uppercase'
    },
    formContainer: {
        marginTop: 200,
    },
    inputLabel: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: Color.black
    },
    inputContainer: {
        borderColor: Color.black,
        borderWidth: 1,
        borderRadius: 2,
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: Color.level3,
        paddingHorizontal: 10
    },
    inputContainerPass: {
        borderColor: Color.black,
        borderWidth: 1,
        borderRadius: 2,
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: Color.level3,
        paddingHorizontal: 10
    },
    icon: {
        color: Color.primary,
        fontSize: 24,
        width: '10%'
    },
    iconKey: {
        color: Color.primary,
        fontSize: 24,
        width: '10%'
    },
    passIcon: {
        color: Color.level3
    },
    input: {
        width: '90%',
        paddingVertical: 10,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },
    inputPass: {
        width: '80%',
        paddingVertical: 10,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },
    inputError: {
        color: Color.error,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
    },
    inputServerError: {
        width: '100%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#ffe6e6',
        color: Color.error,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular'
    },
    forgotText: {
        color: Color.secondary,
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        textAlign: 'right'
    },
    terms: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    termsText: {
        fontSize: 11,
        fontFamily: 'Poppins-Regular',
        color: Color.level2
    },
    termsText2: {
        fontSize: 11,
        fontFamily: 'Poppins-Regular',
        color: Color.secondary,
        textDecorationLine: 'underline'
    },
    btnLoginDisable: {
        opacity: 0.7,
        borderRadius: 3,
        padding: 10,
        height: 50,
        backgroundColor: Color.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    btnLogin: {
        borderRadius: 3,
        padding: 10,
        height: 50,
        backgroundColor: Color.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        opacity: 1,
    },
    loginText: {
        color: Color.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        textTransform: 'uppercase',
        letterSpacing: 1,
        textAlign: 'center'
    },
    bottom: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    gotoSign: {
        color: Color.secondary,
    },
    success: {
        color: '#00cc66',
        backgroundColor: '#ccffee',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        padding: 7,
        width: '100%',
        borderRadius: 5,
    },
    storeText: {
        textAlign: 'center', 
        marginBottom: 15,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#FE5F55',
        width: '100%',
        padding: 5,
        backgroundColor: '#f2f2f2',
        borderRadius: 5
    }

})

export default FormStyle