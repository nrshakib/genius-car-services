import React from "react";
import useServices from "../../hooks/useServices";

const ManageServices = () => {
  const [services] = useServices();

  const handleDelete = (id) => {
    const proceed = window.confirm("Are You Sure to Delete?");
    if (proceed) {
    }
  };
  return (
    <div className="w-50 mx-auto">
      <h2>Manage your services</h2>
      {services.map((service) => (
        <div key={service._id}>
          <h5>
            {service.name}
            <button onClick={() => handleDelete(service._id)}>Delete</button>
          </h5>
        </div>
      ))}
    </div>
  );
};

export default ManageServices;
