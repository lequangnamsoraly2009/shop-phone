import "./App.css";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRouter from "./router/private";
import PublicRouter from "./router/public";

function App() {
  const {isAdmin } = useSelector((state) => state.user);
  return (
    <Router>{isAdmin ? <PrivateRouter /> : <PublicRouter />}</Router>
  );
}

export default App;
