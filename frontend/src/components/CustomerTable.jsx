import React from "react";
import customerService from "../services/customerService";

export default function CustomerTable({ customers, refresh, openEdit, openView }) {

  return (
    <table className="w-full mt-5 border">
      <thead className="bg-gray-200">
        <tr>
          <th>ID</th><th>Name</th><th>DOB</th><th>NIC</th>
          <th>Mobiles</th><th>Address</th><th>Family</th><th>Action</th>
        </tr>
      </thead>

      <tbody>
        { Array.isArray(customers) && customers.map(c => (
          <tr key={c.id} className="border">

            <td>{c.id}</td>
            <td>{c.name}</td>
            <td>{c.dob}</td>
            <td>{c.nic}</td>

            <td>{c.mobileNumbers?.join(", ")}</td>

            <td>
              {c.addresses?.join(" | ")}
            </td>

            <td>
              {c.familyMembers?.join(", ")}
            </td>

            <td>
              <button onClick={() => openEdit(c)} className="text-blue-500">Edit</button>
              <button onClick={() => openView(c)} className="text-green-600 ml-3"> View</button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}