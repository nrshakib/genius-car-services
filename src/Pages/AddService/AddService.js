import React from "react";
import { useForm } from "react-hook-form";

const AddService = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const url = `http://localhost:5000/service`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };
  return (
    <div className="w-50 mx-auto">
      <h2>Add a Service</h2>
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="mb-2 p-2"
          placeholder="Name"
          {...register("name", { required: true, maxLength: 20 })}
        />
        <textarea
          className="mb-2 p-3"
          placeholder="Description"
          {...register("descriptiom")}
        />
        <input
          className="mb-2 p-2"
          placeholder="Price"
          type="number"
          {...register("price")}
        />
        <input
          className="mb-2 p-2"
          placeholder="Image URL"
          type="text"
          {...register("img")}
        />
        <input
          value="Add Service"
          className="bg-primary p-2 text-white fs-4"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddService;
