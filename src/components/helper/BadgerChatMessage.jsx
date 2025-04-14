import { Alert, Button, Text } from "react-native";
import BadgerCard from "./BadgerCard";

function BadgerChatMessage(props) {
  const dt = new Date(props.created);

  const confirmDelete = () => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => props.onDelete(props.id)
      }
    ]);
  };

  return (
    <BadgerCard style={{ marginTop: 16, padding: 8, marginLeft: 8, marginRight: 8 }}>
      <Text style={{ fontSize: 28, fontWeight: 600 }}>{props.title}</Text>
      <Text style={{ fontSize: 12 }}>
        by {props.poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}
      </Text>
      <Text>{props.content}</Text>
      {
        props.username === props.poster && (
          <Button title="Delete" color="crimson" onPress={confirmDelete} />
        )
      }
    </BadgerCard>
  );
}

export default BadgerChatMessage;
