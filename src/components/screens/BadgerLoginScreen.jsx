import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";

function BadgerLoginScreen(props) {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BadgerChat Login</Text>

      <Text>Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        style={styles.input}
        autoCapitalize="none"
      />

      <Text>PIN</Text>
      <TextInput
        value={pin}
        onChangeText={setPin}
        placeholder="7-digit PIN"
        secureTextEntry
        keyboardType="number-pad"
        maxLength={7}
        style={styles.input}
      />

      <TouchableOpacity onPress={() => props.handleLogin(username, pin)} style={styles.loginBtn}>
        <Text style={styles.loginBtnText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.smallText}>New here?</Text>

      <View style={styles.row}>
        <Button title="SIGNUP" onPress={() => props.setIsRegistering(true)} color="gray" />
        <Button title="CONTINUE AS GUEST" onPress={props.handleGuest} color="gray" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  input: {
    width: "80%",
    borderWidth: 1,
    padding: 8,
    marginVertical: 10
  },
  loginBtn: {
    backgroundColor: "#7f1d1d",
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 10
  },
  loginBtnText: {
    color: "#fff",
    fontWeight: "bold"
  },
  smallText: {
    marginTop: 20,
    marginBottom: 10
  },
  row: {
    flexDirection: "row",
    gap: 10
  }
});

export default BadgerLoginScreen;
