import { useState, useEffect } from "react";
import axios from "axios";
import useAuthStore from "../../store/useAuthStore";

export default function AssignmentsPage() {
  const [form, setForm] = useState({
    equipment_id: "",
    quantity: "",
    base_id: "",
  });

  const [data, setData] = useState([]);
  const { user } = useAuthStore();

  const API = "http://localhost:5000/api";

  const fetchData = async () => {
    const res = await axios.get(`${API}/movements`);
    const filtered = res.data.filter(
      (m) => m.type === "ASSIGNMENT" || m.type === "EXPENDITURE"
    );
    setData(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAssign = async () => {
    await axios.post(`${API}/movements`, {
      type: "ASSIGNMENT",
      equipment_id: form.equipment_id,
      quantity: form.quantity,
      from_base_id: form.base_id,
    });

    fetchData();
  };

  const handleExpend = async () => {
    await axios.post(`${API}/movements`, {
      type: "EXPENDITURE",
      equipment_id: form.equipment_id,
      quantity: form.quantity,
      from_base_id: form.base_id,
    });

    fetchData();
  };

  return (
    <div className="container">
      <h2>Assignments & Expenditures</h2>

      <div className="card">
        <input
          name="equipment_id"
          placeholder="Equipment ID"
          value={form.equipment_id}
          onChange={handleChange}
        />
        <input
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
        />
        <input
          name="base_id"
          placeholder="Base ID"
          value={form.base_id}
          onChange={handleChange}
        />

        {(user.role === "ADMIN" || user.role === "COMMANDER") && (
          <>
            <button onClick={handleAssign}>Assign</button>
            <button onClick={handleExpend}>Expend</button>
          </>
        )}
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Equipment</th>
              <th>Quantity</th>
              <th>Base</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.type}</td>
                <td>{d.equipment_id}</td>
                <td>{d.quantity}</td>
                <td>{d.from_base_id}</td>
                <td>{d.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}