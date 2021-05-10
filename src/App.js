import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import Places from './pages/Places';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Place from './pages/Details';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Inbox from './pages/admin/Inbox';
import AdminPlace from './pages/admin/AdminPlaces';
import NewPlace from './pages/admin/NewPlace';
import NotFound from './pages/NotFound';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/contact' component={Contact} />
          <Route path='/login' component={Login} />
          <Route
            path='/places'
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={Places} exact />
                <Route path={`${url}/place/:id`} component={Place} />
              </>
            )}
          />
          <Route
            path='/dashboard'
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={Dashboard} exact />
                <Route path={`${url}/orders`} component={Orders} />
                <Route path={`${url}/inbox`} component={Inbox} />
                <Route path={`${url}/admin-places`} component={AdminPlace} />
                <Route path={`${url}/new-place`} component={NewPlace} />
              </>
            )}
          />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
