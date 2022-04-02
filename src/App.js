import { useState } from 'react';
import { Context, userStatus as initial } from "./Context";
import './App.css'
import Tabel from './component/Table'
import Auth from './component/Auth'
import Bar from './component/Bar'

function App() {
  const [userStatus, setUserStatus] = useState(initial)
  return (
    <Context.Provider value={{ userStatus, setUserStatus }}>
      <Bar />
      {!userStatus.isSignIn && <Auth />}
      {userStatus.isSignIn && userStatus.progress === "authorized" && <Tabel />}
    </Context.Provider>
  );
}

export default App;
