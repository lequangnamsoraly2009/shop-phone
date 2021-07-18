import "./App.css";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HeaderNav from "./components/header";
import FooterNav from "./components/footer";
import AuthPage from "./features/Auth";
import { Content } from "antd/lib/layout/layout";
import MainPage from "./features/MainPage";
// import { useSelector } from "react-redux";

function App() {

  // const {isLoggedIn} = useSelector(state => state.user);

  return (
    <Router>
      <Layout>
        <HeaderNav />
        <Content>
          <Switch>
            <Redirect exact from="/" to="/home"/>
            <Route path="/home" component={MainPage} />
            <Route path="/buyer" component={AuthPage} />
          </Switch>
        </Content>
        <FooterNav />
      </Layout>
    </Router>
  );
}

export default App;
