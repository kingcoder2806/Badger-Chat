import {
    View,
    FlatList,
    Alert,
    Button,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    RefreshControl,
    TouchableOpacity
  } from "react-native";
  import { useEffect, useCallback, useState } from "react";
  import * as SecureStore from "expo-secure-store";
  import BadgerChatMessage from "../helper/BadgerChatMessage";
  import CS571 from "@cs571/mobile-client";
  
  function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
  
    const fetchMessages = useCallback(async () => {
      setRefreshing(true);
  
      const token = await SecureStore.getItemAsync("jwt");
  
      fetch(`https://cs571api.cs.wisc.edu/rest/s25/hw9/messages?chatroom=${props.name}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "X-CS571-ID": "bid_696fdf8e0d7e3ecd87b1f46a66226fe41e4c79943e52513513b6245d5146ea7c"
        }
      })
        .then(res => res.json())
        .then(data => setMessages(data.messages || []))
        .catch(() => Alert.alert("Error", "Failed to fetch messages."))
        .finally(() => setRefreshing(false));
    }, [props.name]);
  
    useEffect(() => {
      fetchMessages();
    }, [fetchMessages]);
  
    const postMessage = async () => {
      const token = await SecureStore.getItemAsync("jwt");
  
      fetch(`https://cs571api.cs.wisc.edu/rest/s25/hw9/messages?chatroom=${props.name}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-CS571-ID": "bid_696fdf8e0d7e3ecd87b1f46a66226fe41e4c79943e52513513b6245d5146ea7c"
        },
        body: JSON.stringify({ title, content: body })
      }).then(res => {
        if (res.status === 200) {
          Alert.alert("Success", "Message posted!");
          fetchMessages();
          setShowModal(false);
          setTitle("");
          setBody("");
        } else {
          Alert.alert("Error", "Failed to post message.");
        }
      });
    };
  
    const deleteMessage = async (id) => {
      const token = await SecureStore.getItemAsync("jwt");
  
      fetch(`https://cs571api.cs.wisc.edu/rest/s25/hw9/messages?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-CS571-ID": "bid_696fdf8e0d7e3ecd87b1f46a66226fe41e4c79943e52513513b6245d5146ea7c"
        }
      }).then(res => {
        if (res.status === 200) {
          Alert.alert("Successfully deleted the post!");
          fetchMessages();
        } else {
          Alert.alert("Error", "Failed to delete message.");
        }
      });
    };
  
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <BadgerChatMessage
                title={item.title}
                content={item.content}
                poster={item.poster}
                created={item.created}
                onLongPress={
                  item.poster === props.username && !props.isGuest
                    ? () => deleteMessage(item.id)
                    : undefined
                }
              />
              {item.poster === props.username && !props.isGuest && (
                <TouchableOpacity
                  onPress={() => deleteMessage(item.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>DELETE POST</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchMessages} />
          }
        />
  
        {!props.isGuest && (
          <>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowModal(true)}
            >
              <Text style={styles.addButtonText}>ADD POST</Text>
            </TouchableOpacity>
  
            <Modal visible={showModal} animationType="slide" transparent>
  <View style={styles.modalBackground}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>Create A Post</Text>

      <Text>Title</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.modalInput}
      />

      <Text>Body</Text>
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        multiline
        numberOfLines={4}
        
        style={[styles.modalInput, { height: 100 }]}
      />

      <View style={styles.modalButtonRow}>
        <Button
          title="Create Post"
          onPress={postMessage}
          disabled={!title || !body}
        />
        <View style={{ width: 12 }} />
        <Button title="Cancel" color="grey" onPress={() => setShowModal(false)} />
      </View>
    </View>
  </View>
</Modal>

          </>
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    input: {
      height: 40,
      width: "80%",
      margin: 10,
      borderWidth: 1,
      padding: 10
    },
    modal: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    deleteButton: {
      marginTop: 5,
      marginHorizontal: 16,
      padding: 10,
      backgroundColor: "#b91c1c",
      borderRadius: 8,
      alignItems: "center"
    },
    deleteButtonText: {
      color: "#fff",
      fontWeight: "bold"
    },
    addButton: {
      backgroundColor: "#7f1d1d",
      paddingVertical: 15,
      alignItems: "center"
    },
    addButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16
    },
    modalBackground: {
        flex: 1,
        justifyContent: "flex-start",     
        alignItems: "center",
        paddingTop: 100,                 
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContainer: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        width: "85%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
      },
      modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
      },
      modalInput: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
      modalButtonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10
      },
      

    
  });
  
  export default BadgerChatroomScreen;
  