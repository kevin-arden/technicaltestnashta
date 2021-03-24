import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Addevent from "./pages/AddEventPage/addevent";
import Dashboard from "./pages/DashboardPage/dashboard";
import Home from "./pages/HomePage/home";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/addevent" exact>
            <Addevent />
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
