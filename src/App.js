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

import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/place/:id' component={Place} />
          <Route path='/places' component={Places} />
          <Route path='/contact' component={Contact} />
          <Route path='/login' component={Login} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/orders' exact component={Orders} />
          <Route path='/inbox' component={Inbox} />
          <Route path='/admin-places' component={AdminPlace} />
          <Route path='/new-place' component={NewPlace} />
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
