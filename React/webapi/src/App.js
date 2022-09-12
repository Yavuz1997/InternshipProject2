import './App.css';
import {Home} from './Components/Home'
import { Department } from './Components/Department';
import {Employee} from './Components/Employee'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {Navigation} from './Components/Navigation'
//add firms and managers
function App() {
  return (
    <BrowserRouter>
      <h2 className='m-3 d-flex justify-content-center'>React js with Bootstrap</h2>
      <h5 className='m-3 d-flex justify-content-center'>Employee Management Portal</h5>
      <Navigation/>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/Department' component={Department} exact/>
        <Route path='/Employee' component={Employee} exact/>
        
      </Switch>
    </BrowserRouter>
  );
}

export default App;
