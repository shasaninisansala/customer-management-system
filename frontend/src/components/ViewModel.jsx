export default function CustomerViewModal({ show, onClose, data }) {
  if (!show || !data) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-[600px]">

        <h2 className="text-xl font-bold mb-3">Customer Details</h2>

        <p><b>Name:</b> {data.name}</p>
        <p><b>DOB:</b> {data.dob}</p>
        <p><b>NIC:</b> {data.nic}</p>

        <hr className="my-3" />

        <p><b>Mobiles:</b> {data.mobileNumbers?.join(", ")}</p>
        <p><b>Addresses:</b> {data.addresses?.join(" | ")}</p>
        <p><b>Family:</b> {data.familyMembers?.join(", ")}</p>

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-1 rounded"
        >
          Close
        </button>

      </div>
    </div>
  );
}