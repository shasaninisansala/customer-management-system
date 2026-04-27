import React, { useEffect, useState } from "react";
import CustomerModal from "../components/CustomerModel";
import UploadModal from "../components/UploadModel";
import CustomerViewModal from "../components/ViewModel";
import CustomerTable from "../components/CustomerTable";
import customerService from "../services/customerService";

export default function Main() {

  const [customers, setCustomers] = useState([]);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);

    const load = () => {
    customerService.getAll().then(res => {
        console.log("API RESPONSE:", res.data);
        setCustomers(Array.isArray(res.data) ? res.data : []);
    });
    };

  useEffect(() => { load(); }, []);

  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>

      <div className="flex gap-3">
        <button onClick={() => { setEditData(null); setShowCustomerModal(true); }}
          className="btn-primary">
          + Add Customer
        </button>

        <button onClick={() => setShowUploadModal(true)}
          className="btn">
          Upload Excel
        </button>
      </div>

      <CustomerTable
        customers={customers}
        refresh={load}
        openEdit={(data) => {
          setEditData(data);
          setShowCustomerModal(true);
        }}
        openView={(data) => {
          setViewData(data);
          setShowViewModal(true);
        }}
      />

      <CustomerModal
        show={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        refresh={load}
        editData={editData}
        customers={customers}
      />

      <UploadModal
        show={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        refresh={load}
      />

      <CustomerViewModal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        data={viewData}
      />

    </div>
  );
}