import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllUsersOrders } from "../../actions/admin-actions";
import OrdersTable from "../../components/OrdersTable/OrdersTable";

const OrdersList = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsersOrders());
  }, []);

  return <OrdersTable orders={orders} />;
};

export default OrdersList;
