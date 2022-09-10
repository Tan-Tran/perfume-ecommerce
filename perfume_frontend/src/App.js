import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Account from "./pages/Account/Account";
import Menu from "./pages/Menu/Menu";
import Product from "./pages/Product/Perfume";
import Contacts from "./pages/Contacts/Contacts";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";
import OrderFinalize from "./pages/OrderFinalize/OrderFinalize";
import AddProduct from "./pages/AddProduct/AddProduct";
import OrdersList from "./pages/OrdersList/OrdersList";
import UserList from "./pages/UserList/UserList";
import EditUser from "./pages/EditUser/EditUser";
import EditPerfumesList from "./pages/EditPerfumesList/EditPerfumesList";
import EditPerfume from "./pages/EditPerfume/EditPerfume";
import UserEditProfile from "./pages/UserEditProfile/UserEditProfile";
import UserOrdersList from "./pages/UserOrdersList/UserOrdersList";

function App() {
  const isAdmin = localStorage.getItem("userRole") === "ADMIN";
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/forgot" component={ForgotPassword} />
        <Route exact path="/reset/:code" component={ResetPassword} />
        <Route exact path="/activate/:code" component={Login} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/product/:id" component={Product} />
        <Route exact path="/contacts" component={Contacts} />
        <Route exact path="/account" component={Account} />
        <Route
          exact
          path="/cart"
          render={() =>
            localStorage.getItem("isLoggedIn") ? (
              <Route component={Cart} />
            ) : (
              <Route component={Login} />
            )
          }
        />
        <Route exact path="/order" component={Order} />
        <Route exact path="/order/finalize" component={OrderFinalize} />
        <Route
          exact
          path="/admin/add"
          render={() =>
            isAdmin ? (
              <Route component={AddProduct} />
            ) : (
              <Route component={Home} />
            )
          }
        />
        <Route
          exact
          path="/admin/orders"
          render={() =>
            isAdmin ? (
              <Route component={OrdersList} />
            ) : (
              <Route component={Home} />
            )
          }
        />
        <Route
          exact
          path="/admin/users/all"
          render={() =>
            isAdmin ? (
              <Route component={UserList} />
            ) : (
              <Route component={Home} />
            )
          }
        />
        <Route
          exact
          path="/admin/user/:id"
          render={() =>
            isAdmin ? (
              <Route component={EditUser} />
            ) : (
              <Route component={Home} />
            )
          }
        />
        <Route
          exact
          path="/product/list/edit"
          render={() =>
            isAdmin ? (
              <Route component={EditPerfumesList} />
            ) : (
              <Route component={Home} />
            )
          }
        />
        <Route
          exact
          path="/product/list/edit/:id"
          render={() =>
            isAdmin ? (
              <Route component={EditPerfume} />
            ) : (
              <Route component={Home} />
            )
          }
        />
        <Route
          exact
          path="/user/edit"
          render={() =>
            localStorage.getItem("isLoggedIn") ? (
              <Route component={UserEditProfile} />
            ) : (
              <Route component={Home} />
            )
          }
        />
        <Route
          exact
          path="/user/orders"
          render={() =>
            localStorage.getItem("isLoggedIn") ? (
              <Route component={UserOrdersList} />
            ) : (
              <Route component={Home} />
            )
          }
        />
        <Route path="*" component={Home} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
