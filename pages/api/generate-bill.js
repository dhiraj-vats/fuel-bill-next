export default function handler(req, res) {
  if(req.method === "POST") {
    const { name, vehicleNumber, fromYear, fromMonth, toYear, toMonth, fuelType, fuelAddress } = req.body;

    const bill = {
      name,
      vehicleNumber,
      period: { from: `${fromMonth}/${fromYear}`, to: `${toMonth}/${toYear}` },
      fuelProvider: { type: fuelType, address: fuelAddress },
      generatedAt: new Date().toLocaleString()
    };

    res.status(200).json({ success: true, bill });
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}