
import { useContext, useEffect, useState } from 'react';
import './App.css';
import Form from './pages/form';
import { Context } from './context/contextApi';
import Home from './pages/Home';
import { useNavigate } from 'react-router-dom';


function App() {
  const { user, setUser } = useContext(Context)
  const navigate = useNavigate()

  // Checking If the user is already loged In
  useEffect(() => {

    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')))
    } else {
      console.log('No signed in before')
    }
  }, [localStorage])

  useEffect(() => {
    if (user && user.name) {
      navigate('/dashboard')
    }
  }, [user])


  return (
    <div className="App h-screen font-nuito ">
      <Home />
    </div>
  );
}

export default App;
