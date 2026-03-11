import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Bill() {
  const router = useRouter();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    if(router.query.bill) {
      setBill(JSON.parse(decodeURIComponent(router.query.bill)));
    }
  }, [router.query.bill]);

  const handlePrint = () => {
    window.print();
  };

  if(!bill) return <p>Loading...</p>;

  return (
    <div style={{ fontFamily: "Comic Sans MS, cursive", padding: "20px" }}>
      <h1>Fuel Bill ⛽</h1>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", marginBottom: "20px" }}>
        <tbody>
          <tr><td>Name</td><td>{bill.name}</td></tr>
          <tr><td>Vehicle Number</td><td>{bill.vehicleNumber}</td></tr>
          <tr><td>Billing Period</td><td>{bill.period.from} to {bill.period.to}</td></tr>
          <tr><td>Fuel Provider Type</td><td>{bill.fuelProvider.type}</td></tr>
          <tr><td>Fuel Provider Address</td><td>{bill.fuelProvider.address}</td></tr>
          <tr><td>Generated At</td><td>{bill.generatedAt}</td></tr>
        </tbody>
      </table>
      <button onClick={handlePrint}>🖨️ Print Bill</button>
    </div>
  );
}