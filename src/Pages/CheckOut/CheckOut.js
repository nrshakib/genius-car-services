import React from "react";
import PageTitle from "../Shared/PageTitle/PageTitle";
import { useParams } from "react-router-dom";
import useServiceDetail from "../../hooks/useServiceDetail";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import axios from "axios";
import { toast } from "react-toastify";

const CheckOut = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetail(serviceId);
  const [user] = useAuthState(auth);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const order = {
      email: user.email,
      service: service.name,
      serviceId: serviceId,
      address: e.target.address.value,
      phone: e.target.phone.value,
    };
    axios.post("http://localhost:5000/order", order).then((response) => {
      const { data } = response;
      if (data.insertedId) {
        toast("Order Booked");
        e.target.reset();
      }
    });
  };

  return (
    <div className="w-50 mx-auto">
      <PageTitle title="CheckOut"></PageTitle>
      <h2>Please Check Out your Booking: {service.name}</h2>
      <form className="mt-4" onSubmit={handlePlaceOrder}>
        <input
          className="w-50 p-2 mb-3"
          type="text"
          value={user?.displayName}
          name="name"
          placeholder="Enter Name"
          required
          readOnly
          disabled
        />
        <br />
        <input
          className="w-50 p-2 mb-3"
          type="text"
          value={user?.email}
          name="email"
          placeholder="Enter Email"
          required
          readOnly
          disabled
        />
        <br />
        <input
          className="w-50 p-2 mb-3"
          type="text"
          name="service"
          value={service.name}
          required
          readOnly
        />
        <br />
        <input
          className="w-50 p-2 mb-3"
          type="text"
          name="address"
          placeholder="Enter Address"
          required
          autoComplete="off"
        />
        <br />
        <input
          className="w-50 p-2 mb-3"
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          required
          autoComplete="off"
        />
        <br />
        <input className="btn btn-primary" type="submit" value="Place Order" />
      </form>
    </div>
  );
};

export default CheckOut;
