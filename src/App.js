import './App.css';
import {useEffect, useState} from "react";
import jwt_decode from 'jwt-decode';
import configData from './config.json'

function App() {
  const CLIENT_ID = configData.GOOGLE_CLIENT_ID;

  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID: " + response.credential)
    console.log("Decoded JWT ID: ")
    let userObject = jwt_decode(response.credential);
    setUser(userObject);
    console.log(jwt_decode(response.credential))
    document.getElementById('signInDiv').hidden = true;
  }

  function handleSignOut(event){
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:  CLIENT_ID,
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme: "outline", size: "large"}
    );
    google.accounts.id.prompt();
  }, [])

  return (
    <div className="App">
      <div id="signInDiv"></div>
      { Object.keys(user).length > 0 &&
        <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }
      { user &&
          <div>
            <img src={user.picture}></img>
            <h3>{user.name}</h3>
          </div>
      }
    </div>
  );
}

export default App;
