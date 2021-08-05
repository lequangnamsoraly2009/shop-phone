import "./App.css";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Layout, Row } from "antd";
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
import VNPAY from "./components/vnPay";
import CheckSumVNPay from "./components/checksum";

function App() {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.user);
  return (
    <Router>
      {isAdmin === true ? (
        <Layout>
          <HeaderAdmin />
          <Content>
              <Row gutter={16}>
                <SideBar />
                <Switch>
                  <Route path="/admin" component={Admin} />
                    <Route path="/home" component={DashBoard} />
                </Switch>
              </Row>
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
              {/* Test VN Pay */}
              <Route
                path="/test_vnpay"
                component={isLoggedIn ? VNPAY : PageNotFound}
              />
              <Route
                path="/checksum_vnpay"
                component={isLoggedIn ? CheckSumVNPay : PageNotFound}
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
