import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('/api/hello')
        .then(response => response.text())
        .then(message => {
          setData(message);
        });
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <p>{data}</p>
        </header>
      </div>
  );
}

export default App;