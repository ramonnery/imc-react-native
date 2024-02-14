import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Vibration } from 'react-native'
import ResultImc from '../ResultImc/'
import styles from './style'

export default function Form() {

    const [height, setHeight]: any = useState(null)
    const [weight, setWeight]: any = useState(null)
    const [messageImc, setMessageImc] = useState('preencha o peso e altura')
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState('Calcular')
    const [errorMessage, setErrorMessage]: any = useState(null)


    function imcCalculator(): void {
        const imcCalcules: any = (weight / (height**2)).toFixed(2)
        return setImc(imcCalcules)
    }

    function showError(): void {
        if(imc == null) {
            Vibration.vibrate()
            setErrorMessage('campo obrigatório*')
        }
    }

    function ValidationImc(): void {
        if(weight != null && height != null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc('Seu imc é igual:')
            setTextButton('Calcular novamente')
            setErrorMessage(null)
            return
        }
        showError()
        setImc(null)
        setTextButton('Calcular')
        setMessageImc('preencha o peso e altura')
    }

    return (
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setHeight}
                value={height}
                placeholder='Ex. 1.75'
                keyboardType='numeric'
                />

                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder='Ex. 75.885'
                keyboardType='numeric'
                />

                <TouchableOpacity
                style={styles.buttonCalculator}
                onPress={() => ValidationImc()}
                >
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>

                <ResultImc messageResultImc={messageImc} resultImc={imc}/>
            </View>
        </View>
    )
}