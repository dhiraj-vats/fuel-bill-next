import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    vehicleNumber: "",
    fromYear: "",
    fromMonth: "",
    toYear: "",
    toMonth: "",
    fuelType: "",
    fuelAddress: ""
  });
  const router = useRouter();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // call API
    const res = await fetch("/api/generate-bill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if(data.success) {
      // pass bill as query parameter (encode)
      router.push({
        pathname: "/bill",
        query: { bill: encodeURIComponent(JSON.stringify(data.bill)) }
      });
    } else {
      alert("Error generating bill");
    }
  };

  return (
    <div style={{ fontFamily: "Comic Sans MS, cursive", padding: "20px" }}>
      <h1>Fuel Bill Generator ⛽</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br/>
        <input type="text" name="name" onChange={handleChange} required /><br/>

        <label>Vehicle Number:</label><br/>
        <input type="text" name="vehicleNumber" onChange={handleChange} required /><br/>

        <label>Billing Period:</label><br/>
        <input type="number" name="fromYear" placeholder="From Year" onChange={handleChange} required />
        <input type="number" name="fromMonth" placeholder="From Month" onChange={handleChange} required />
        <input type="number" name="toYear" placeholder="To Year" onChange={handleChange} required />
        <input type="number" name="toMonth" placeholder="To Month" onChange={handleChange} required /><br/>

        <label>Fuel Provider Type:</label><br/>
        <input type="text" name="fuelType" onChange={handleChange} required /><br/>

        <label>Fuel Provider Address:</label><br/>
        <input type="text" name="fuelAddress" onChange={handleChange} required /><br/>

        <button type="submit" style={{ marginTop: "10px" }}>Generate Bill</button>
      </form>
    </div>
  );
}