import './App.css'

import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './component/Home'
import LoginRoute from './component/LoginRoute'
import JobsRoute from './component/JobsRoute'
import RenderSpecificJobsDetails from './component/RenderSpecificJobsDetails'
import ProtectedRoute from './component/ProtectedRoute'
import NotFound from './component/NotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/jobs" component={JobsRoute} />
    <ProtectedRoute
      exact
      path="/jobs/:id"
      component={RenderSpecificJobsDetails}
    />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
