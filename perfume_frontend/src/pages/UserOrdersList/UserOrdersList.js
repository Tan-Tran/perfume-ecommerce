import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserOrders } from "../../actions/order-actions";
import OrdersTable from "../../components/OrdersTable/OrdersTable";

const UserOrdersList = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);
  return <OrdersTable orders={orders} />;
};

export default UserOrdersList;
