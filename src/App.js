import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Places from './pages/Places';
import Contact from './pages/Contact';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/Login';
import Place from './pages/Details';

import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/place/:id' component={Place} />
        <Route path='/places' component={Places} />
        <Route path='/contact' component={Contact} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/login' component={Login} />
        <Route path='/login' component={Login} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
