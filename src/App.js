import React from 'react';
import './App.css';

function App() {
  let i=0;
  return (
    <div className="App">
      <p>소융봇 로그인페이지</p>
      <button onClick={()=> {i++; alert(i);}}>click</button>
    </div>
  );
}

export default App;
