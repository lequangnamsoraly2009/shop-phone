import "./App.css";
import "antd/dist/antd.css";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import HeaderNav from "./components/header";
import FooterNav from "./components/footer";
import { Content } from "antd/lib/layout/layout";

function App() {
  return (
    <Router>
      <Layout>
        <HeaderNav />
        <Switch>
          <Content>
            <Route />
          </Content>
        </Switch>
        <FooterNav />
      </Layout>
    </Router>
  );
}

export default App;
