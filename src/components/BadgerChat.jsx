import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CS571 from '@cs571/mobile-client';
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';

const ChatDrawer = createDrawerNavigator();

export default function BadgerChat() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [username, setUsername] = useState(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    fetch("https://cs571api.cs.wisc.edu/rest/s25/hw9/chatrooms", {
      headers: {
        "X-CS571-ID": "bid_696fdf8e0d7e3ecd87b1f46a66226fe41e4c79943e52513513b6245d5146ea7c"
      }
    })
      .then(res => res.json())
      .then(data => {
        setChatrooms(data);
      })
      .catch(() => {
        alert("Failed to load chatrooms.");
      });
  }, []);

  async function handleLogin(username, pin) {
    try {
      const res = await fetch("https://cs571api.cs.wisc.edu/rest/s25/hw9/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CS571-ID": "bid_696fdf8e0d7e3ecd87b1f46a66226fe41e4c79943e52513513b6245d5146ea7c"
        },
        body: JSON.stringify({ username, pin })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.msg);
      }

      const data = await res.json();
      await SecureStore.setItemAsync("jwt", data.token);
      await SecureStore.setItemAsync("username", username);

      setUsername(username);
      setIsLoggedIn(true);
    } catch (e) {
      alert(`Login failed: ${e.message}`);
    }
  }

  async function handleSignup(username, pin) {
    try {
      const res = await fetch("https://cs571api.cs.wisc.edu/rest/s25/hw9/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CS571-ID": "bid_696fdf8e0d7e3ecd87b1f46a66226fe41e4c79943e52513513b6245d5146ea7c"
        },
        body: JSON.stringify({ username, pin })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.msg);
      }

      const data = await res.json();
      await SecureStore.setItemAsync("jwt", data.token);
      await SecureStore.setItemAsync("username", username);

      setUsername(username);
      setIsLoggedIn(true);
    } catch (e) {
      alert(`Signup failed: ${e.message}`);
    }
  }

  function handleLogout() {
    SecureStore.deleteItemAsync("jwt");
    SecureStore.deleteItemAsync("username");
    setIsLoggedIn(false);
    setIsGuest(false);
    setIsRegistering(false);
  }

  function handleGuest() {
    setIsGuest(true);
  }

  if (isLoggedIn || isGuest) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {chatrooms.map(chatroom => (
            <ChatDrawer.Screen key={chatroom} name={chatroom}>
              {props => (
                <BadgerChatroomScreen
                  {...props}
                  name={chatroom}
                  isGuest={isGuest}
                  username={username}
                />
              )}
            </ChatDrawer.Screen>
          ))}
          {
            isLoggedIn ? (
              <ChatDrawer.Screen name="Logout">
                {props => (
                  <BadgerLogoutScreen
                    {...props}
                    handleLogout={handleLogout}
                    isGuest={false}
                  />
                )}
              </ChatDrawer.Screen>
            ) : (
              <ChatDrawer.Screen name="Signup">
                {props => (
                  <BadgerLogoutScreen
                    {...props}
                    handleLogout={() => {
                      setIsGuest(false);
                      setIsRegistering(true);
                    }}
                    isGuest={true}
                  />
                )}
              </ChatDrawer.Screen>
            )
          }
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return (
      <BadgerRegisterScreen
        handleSignup={handleSignup}
        setIsRegistering={setIsRegistering}
      />
    );
  } else {
    return (
      <BadgerLoginScreen
        handleLogin={handleLogin}
        setIsRegistering={setIsRegistering}
        handleGuest={handleGuest}
      />
    );
  }
}
