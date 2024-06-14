import './App.css'

import {Route, Switch} from 'react-router-dom'

import Home from './component/Home'
import LoginRoute from './component/LoginRoute'
import JobsRoute from './component/JobsRoute'
import RenderSpecificJobsDetails from './component/RenderSpecificJobsDetails'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={LoginRoute} />
    <Route exact path="/jobs" component={JobsRoute} />
    <Route exact path="/jobs/:id" component={RenderSpecificJobsDetails} />
  </Switch>
)

export default App
