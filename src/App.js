import './App.css';
import { useState, useEffect } from 'react';
import { firebaseConfig } from './firebaseConfig';
import { Provider } from 'react-redux';

import { initializeApp } from "firebase/app";
import { ref, get, getDatabase } from 'firebase/database';
import store from './stores/coaches';

function App() {
  const [ coaches, setCoaches ] = useState({});
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const statsRef = ref(db, 'stats');



  useEffect(() => {
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
  }, [])



  const fields = [
    'Posição',
    'Treinador',
    'Pontos corrida',
    '1º lugares',
    '2º lugares',
    '3º lugares',
    'Vitórias',
    'Pontos',
    'Saldo de gols',
    'Empates',
    'Derrotas',
    'Gols pró',
    'Gols contra',
  ];

  const renderTableRaceHeader = (
    <tr>
      {fields.map((field, index) => <th key={`${index}${field}`}>{field}</th>)}
    </tr>
  );

  const renderTableRaceContent =  Object.keys(coaches).map((coach, index) => (
    <tr key={`${index}${coach}`}>
      <td>{index + 1}</td>
      <td>{coach}</td>
      <td>bla</td>
      <td>bla</td>
      <td>bla</td>
      <td>bla</td>
      <td>bla</td>
      <td>bla</td>
      <td>bla</td>
      <td>bla</td>
      <td>bla</td>
      <td>bla</td>
      <td>bla</td>
    </tr>
  ));


  return (
    <Provider store={store}>
      <div className="App">
        {Object.keys(coaches).length > 0 && (
          <table>
            <thead>
              {renderTableRaceHeader}
            </thead>
            <tbody>
              {renderTableRaceContent}
            </tbody>
          </table>
        )}
        {Object.keys(coaches).length > 0 || <h1>loading...</h1>}

      </div>
    </Provider>
  );
}

export default App;
