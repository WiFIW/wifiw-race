import './App.css';
import { useState } from 'react';
import { firebaseConfig } from './firebaseConfig';

import { initializeApp } from "firebase/app";
import { ref, get, getDatabase } from 'firebase/database';


function App() {
  const [ coaches, setCoaches ] = useState({});
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const statsRef = ref(db, 'stats');
  get(statsRef).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      setCoaches(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });


  return (
    <div className="App">
      {Object.keys(coaches).length > 0 ? Object.keys(coaches).map(coach => <li>{coach}</li>) : 'no coaches available'}
    </div>
  );
}

export default App;
