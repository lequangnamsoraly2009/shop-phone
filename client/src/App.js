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
import Admin from "./admin";
import HeaderAdmin from "./admin/components/header";
import FooterAmdin from "./admin/components/footer";
import Sider from "antd/lib/layout/Sider";

function App() {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.user);
  return (
    <Router>
      {isAdmin === true ? (
        <div className="container-fluid">
          <Layout>
            <HeaderAdmin />
            <Content>
              <Switch>
                <Route path="/home" component={Admin} />
              </Switch>
            </Content>
            <FooterAmdin />
          </Layout>
        </div>
      ) : (
        <Layout>
          <HeaderNav />
          <Content>
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route path="/home" component={MainPage} />
              <Route path="/detail" component={DetailProductMain} />
              <Route path="/category" component={CategoryPage} />
              <Route
                path="/buyer"
                component={!isLoggedIn ? AuthPage : PageNotFound}
              />
              <Route
                path="/customer"
                component={isLoggedIn ? Customer : PageNotFound}
              />
              <Route component={PageNotFound} />
            </Switch>
          </Content>
          <FooterNav />
        </Layout>
      )}
    </Router>
  );
}

export default App;
