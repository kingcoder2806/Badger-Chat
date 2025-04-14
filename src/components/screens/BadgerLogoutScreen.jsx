import { Alert, Button, StyleSheet, Text, View } from "react-native";

function BadgerLogoutScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {props.isGuest ? "Want to join BadgerChat?" : "Are you sure you're done?"}
      </Text>
      <Text>
        {props.isGuest
          ? "Signup to be able to post messages!"
          : "Come back soon!"}
      </Text>
      <Text />
      <Button
        title={props.isGuest ? "Signup!" : "Logout"}
        color="darkred"
        onPress={props.handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    marginTop: -100
  }
});

export default BadgerLogoutScreen;
