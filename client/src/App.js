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
import Customer from "./features/Customer";
import CategoryPage from "./features/Category";
import { useSelector } from "react-redux";
import PageNotFound from "./components/pagenotfound";
import DetailProductMain from "./features/MainPage/pages";

function App() {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <Router>
      <Layout>
        <HeaderNav />
        <Content>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={MainPage} />
            <Route path="/detail" component={DetailProductMain} />
            <Route path="/category" component={CategoryPage} />
            <Route path="/buyer" component={AuthPage} />
            <Route path="/customer" component={Customer} />
            <Route component={PageNotFound} />
          </Switch>
        </Content>
        <FooterNav />
      </Layout>
    </Router>
  );
}

export default App;
