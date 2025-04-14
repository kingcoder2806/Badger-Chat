import { use, useState } from "react";
import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";

function BadgerRegisterScreen(props) {
    const[username, setUsername] = useState("")
    const[pin, setPin] = useState("")
    const [confirmPin, setConfirmPin] = useState("")

    const handleRegister = () =>{
        if (!pin){
            Alert.alert("Please enter a pin")
        }else if (pin !== confirmPin){
            Alert.alert("Pins do not match!")
        }else if (pin.length !== 7){
            Alert.alert("A pin must be 7 digits");
        }else{
            props.handleSignup(username, pin);
        }
    }


        return <View style={styles.container}>
        <Text style={styles.title}>Join BadgerChat!</Text>
        <Text>Username</Text>
        <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            style={styles.input}
        />
        <Text>PIN</Text>
        <TextInput
            value={pin}
            onChangeText={setPin}
            secureTextEntry={true}
            keyboardType="number-pad"
            maxLength={7}
            returnKeyType="done"
            style={styles.input}
        />
        <Text>Confirm PIN</Text>
        <TextInput
            value={confirmPin}
            onChangeText={setConfirmPin}
            secureTextEntry={true}
            keyboardType="number-pad"
            maxLength={7}
            returnKeyType="done"
            style={styles.input}
        />
        <Button color="crimson" title="Signup" onPress={handleRegister} />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 36,
        marginBottom: 20
    },
    input: {
        height: 40,
        width: "60%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});
export default BadgerRegisterScreen;