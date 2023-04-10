
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LogInPage from './AuthPage/login/LoginPage.js';
import SignUpPage from './AuthPage/signUp/SignUp';

import { useState } from 'react';
import MainPage from './components/LandingPage/MainPage/MainPage';
import AdminLogInPage from './AuthPage/adminLogin/AdminLogin';
import AdminSignUpPage from './AuthPage/adminSignUp/AdminSignUp';

import LandingPage from './components/LandingPage/LandingPage/LandingPage';
import AdminPage from './components/Page/AdminPage/AdminPage';
import Contact from './components/Page/Contact/Contact';

import Chart from './components/Page/Chart/Chart';
import History from './components/Page/histrory/History';
import ForgetPage from './AuthPage/forgetPage/ForgetPage';
import AdminChart from './components/Page/Chart/AChart';



function App() {
  const [user,setUser]=useState()
  const[admin,setAdmin]=useState()
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage></LandingPage>
        </Route>

        <Route path="/logIn">
       <LogInPage 
       user={user}
       setUser={setUser}> </LogInPage>
        </Route>

        <Route path="/signUp">
      <SignUpPage> </SignUpPage>
        </Route>

        <Route path="/forgetuser">
     <ForgetPage></ForgetPage>
        </Route>

        <Route path="/adminLogIn">
      <AdminLogInPage
      admin={admin}
      setAdmin={setAdmin}>

      </AdminLogInPage>
        </Route>

        <Route path="/adminSignUp">
      <AdminSignUpPage></AdminSignUpPage>
        </Route>

        <Route path="/admin">
      <AdminPage></AdminPage>
        </Route>

        <Route path="/main">
      <MainPage></MainPage>
        </Route>

        <Route path="/contact">
      <Contact></Contact>
        </Route>

        <Route path="/history">
      <History></History>
        </Route>

        <Route path="/charts">
     <Chart></Chart>
        </Route>

        <Route path="/admin-charts">
     <AdminChart></AdminChart>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
