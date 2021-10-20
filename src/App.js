import './App.css'
import Header from './components/Header'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import LoginScreen from './screens/LoginScreen'
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import ViolationScreen from './screens/ViolatonScreen';
import AdminScreen from './screens/AdminScreen';
import AdminViolationsScreen from './screens/AdminViolationsScreen';
import AdminViolationTypesScreen from './screens/AdminViolationTypesScreen';

const App =()=> {

  return (
    <Router>
      <Header />
      <Route exact path='/login' component={LoginScreen}  />
      <Route exact path='/signup' component={SignupScreen} />
      <Route exact path='/profile' component={ProfileScreen} />
      <Route exact path='/' component={HomeScreen} />
      <Route exact path='/violations/:id' component={ViolationScreen} />
      <Route exact path='/admin' component={AdminScreen} />
      <Route exact path='/admin/violations' component={AdminViolationsScreen} />
      <Route exact path='/admin/violationTypes' component={AdminViolationTypesScreen} />
    </Router>
  )
}

export default App
