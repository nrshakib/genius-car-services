import React from "react";
import PageTitle from "../Shared/PageTitle/PageTitle";
import { useParams } from "react-router-dom";
import useServiceDetail from "../../hooks/useServiceDetail";

const CheckOut = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetail(serviceId);
  return (
    <div className="w-50 mx-auto">
      <PageTitle title="CheckOut"></PageTitle>
      <h2>Please Check Out your Booking: {service.name}</h2>
      <form className="mt-4">
        <input
          className="w-50 p-2 mb-3"
          type="text"
          name="name"
          placeholder="Enter Name"
          required
        />
        <br />
        <input
          className="w-50 p-2 mb-3"
          type="text"
          name="email"
          placeholder="Enter Email"
          required
        />
        <br />
        <input
          className="w-50 p-2 mb-3"
          type="text"
          name="service"
          value={service.name}
          required
        />
        <br />
        <input
          className="w-50 p-2 mb-3"
          type="text"
          name="address"
          placeholder="Enter Address"
          required
        />
        <br />
        <input
          className="w-50 p-2 mb-3"
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          required
        />
        <br />
        <input type="submit" value="Place Order" />
      </form>
    </div>
  );
};

export default CheckOut;
