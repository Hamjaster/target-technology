
import { useContext, useEffect, useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Form from './pages/form';
import { Context } from './context/contextApi';

function App() {
  const { user, setUser } = useContext(Context)

  // Checking If the user is already loged In
  useEffect(() => {

    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')))
    } else {
      console.log('No signed in before')
    }
  }, [localStorage])

  return (
    <div className="App h-screen font-nuito ">

      {/* Showing Sign up page if the user isnt registered and vice versa */}
      {user && user.name ? <Dashboard /> : <Form />}

    </div>
  );
}

export default App;
