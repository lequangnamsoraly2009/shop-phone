import "./App.css";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Col, Layout, Row } from "antd";
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
import SideBar from "./admin/components/sidebar";
import DashBoard from "./admin/pages/dashboard";

function App() {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.user);
  return (
    <Router>
      {isAdmin === true ? (
        <Layout>
          <HeaderAdmin />
          <Content>
            <div className="container-fluid">
              <Row gutter={16}>
                <SideBar />
                <Switch>
                  <Route path="/admin" component={Admin} />
                  <Col className="gutter-row" span={20}>
                    <Route path="/home" component={DashBoard} />
                  </Col>
                </Switch>
              </Row>
            </div>
          </Content>
          <FooterAmdin />
        </Layout>
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
