import Countries from './Components/Countries';
import CountryDetails from './Components/CountryDetails';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
       <Route exact path = "/" component={Countries}>
          <Countries/>
       </Route>
       <Route path = "/details" component={CountryDetails}>
          <CountryDetails/>
       </Route>
    </Router>
  );
}

export default App;
