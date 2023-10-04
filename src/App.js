
import { useContext, useEffect, useState } from 'react';
import './App.css';
import { Context } from './context/contextApi';
import Home from './pages/Home';
import { useNavigate } from 'react-router-dom';


function App() {
  const { user, setUser } = useContext(Context)
  const navigate = useNavigate()
  const cache = [
    'bg-purple-500',
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-800',
    'bg-red-800',
    'bg-green-800',
    'bg-blue-800',
    'bg-yellow-800',
  ]
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
