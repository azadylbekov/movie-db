import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home'
import Detail from './Pages/Detail'
import Favorites from './Pages/Favorites'


function App() {

  return (
    <HashRouter>
      <div className="main-content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route exact path="/detail/:id">
            <Detail />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
