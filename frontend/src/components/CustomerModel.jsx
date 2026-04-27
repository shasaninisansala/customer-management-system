import React, { useEffect, useState } from "react";
import Select from "react-select";
import customerService from "../services/customerService";
import cityService from "../services/cityService";
import countryService from "../services/countryService";

export default function CustomerModal({
  show,
  onClose,
  refresh,
  editData,
  customers,
}) {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);

  const emptyForm = {
    name: "",
    dob: "",
    nic: "",
    mobileNumbers: [{ mobileNumber: "" }],
    addresses: [
      {
        addressLine1: "",
        addressLine2: "",
        city: { id: "" },
        country: { id: "" },
      },
    ],
    familyRelations: [],
  };

  const [form, setForm] = useState(emptyForm);


  useEffect(() => {
    cityService.getAll().then(res => {
        console.log("Cities:", res.data);

        const data = res.data;
        setCities(Array.isArray(data) ? data : []);
    });
  }, []);

  useEffect(() => {
    countryService.getAll().then(res => {
        console.log("Countries:", res.data);

        const data = res.data;
        setCountries(Array.isArray(data) ? data : []);
    });
  }, []);

  useEffect(() => {
    if (editData) {
        setForm({
        id: editData.id,
        name: editData.name || "",
        dob: editData.dob || "",
        nic: editData.nic || "",

        
        mobileNumbers:
            editData.mobileNumbers?.length > 0
            ? editData.mobileNumbers.map(m => ({
                mobileNumber: m,
                }))
            : [{ mobileNumber: "" }],

        // combine address + city + country arrays
        addresses:
            editData.addresses?.length > 0
            ? editData.addresses.map((addr, i) => {
                const cityObj = cities.find(
                    c => c.cityName === editData.cities?.[i]
                );

                const countryObj = countries.find(
                    c => c.countryName === editData.countries?.[i]
                );

                return {
                    addressLine1: addr,
                    addressLine2: "",
                    city: { id: cityObj?.id || "" },
                    country: { id: countryObj?.id || "" },
                };
                })
            : [
                {
                    addressLine1: "",
                    addressLine2: "",
                    city: { id: "" },
                    country: { id: "" },
                },
                ],

        familyRelations:
            editData.familyMembers?.length > 0
                ? editData.familyMembers
                    .map(name => {
                    const member = customers.find(c => c.name === name);

                    if (!member) return null;

                    return {
                        familyMember: {
                        id: member.id,
                        name: member.name
                        }
                    };
                    })
                    .filter(Boolean)
                : [],
        });
    } else {
        setForm(emptyForm);
    }
  }, [editData, show, cities, countries,customers]);

  if (!show) return null;

  /* ---------- Mobile ---------- */
  const handleMobileChange = (index, value) => {
    const updated = [...form.mobileNumbers];
    updated[index].mobileNumber = value;
    setForm({ ...form, mobileNumbers: updated });
  };

  const addMobile = () => {
    setForm({
      ...form,
      mobileNumbers: [...form.mobileNumbers, { mobileNumber: "" }],
    });
  };

  const removeMobile = (index) => {
    const updated = form.mobileNumbers.filter((_, i) => i !== index);
    setForm({
      ...form,
      mobileNumbers: updated.length ? updated : [{ mobileNumber: "" }],
    });
  };

  /* ---------- Address ---------- */
  const handleAddressChange = (index, field, value) => {
    const updated = [...form.addresses];
    updated[index][field] = value;
    setForm({ ...form, addresses: updated });
  };

  const handleAddressNested = (index, field, value) => {
    const updated = [...form.addresses];
    updated[index][field] = { id: parseInt(value) };
    setForm({ ...form, addresses: updated });
  };

  const addAddress = () => {
    setForm({
      ...form,
      addresses: [
        ...form.addresses,
        {
          addressLine1: "",
          addressLine2: "",
          city: { id: "" },
          country: { id: "" },
        },
      ],
    });
  };

  const removeAddress = (index) => {
    const updated = form.addresses.filter((_, i) => i !== index);
    setForm({
      ...form,
      addresses: updated.length
        ? updated
        : [
            {
              addressLine1: "",
              addressLine2: "",
              city: { id: "" },
              country: { id: "" },
            },
          ],
    });
  };

  /* ---------- Family ---------- */
  const handleFamilyChange = (selected) => {
    setForm({
      ...form,
      familyRelations: selected
        ? selected.map((item) => ({
            familyMember: { id: item.value },
          }))
        : [],
    });
  };

  const familyOptions = customers
    .filter((c) => c.id !== form.id)
    .map((c) => ({
      value: c.id,
      label: `${c.name} (${c.nic})`,
    }));

  const selectedFamily = form.familyRelations.map((f) => ({
    value: f.familyMember.id,
    label: f.familyMember.name || `Customer ${f.familyMember.id}`,
  }));

  /* ---------- Submit ---------- */
  const submit = async (e) => {
    e.preventDefault();

    try {
      if (form.id) {
        await customerService.update(form.id, form);
        alert("Customer updated successfully");
      } else {
        await customerService.save(form);
        alert("Customer saved successfully");
      }

      refresh();
      onClose();
      setForm(emptyForm);
    } catch (err) {
      alert("Error saving customer");
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">
            {form.id ? "Update Customer" : "Add Customer"}
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={submit}>
          {/* Basic */}
          <input
            className="border p-2 rounded w-full mb-3"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="date"
            className="border p-2 rounded w-full mb-3"
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            required
          />

          <input
            className="border p-2 rounded w-full mb-4"
            placeholder="NIC"
            value={form.nic}
            onChange={(e) => setForm({ ...form, nic: e.target.value })}
            required
          />

          {/* Mobile */}
          <h3 className="font-semibold text-lg mb-2">Mobile Numbers</h3>

          {form.mobileNumbers.map((mobile, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                className="border p-2 rounded flex-1"
                placeholder="Mobile Number"
                value={mobile.mobileNumber}
                onChange={(e) =>
                  handleMobileChange(index, e.target.value)
                }
              />

              <button
                type="button"
                onClick={() => removeMobile(index)}
                className="bg-red-500 text-white px-3 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addMobile}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
          >
            + Add Mobile
          </button>

          {/* Address */}
          <h3 className="font-semibold text-lg mb-2">Addresses</h3>

          {form.addresses.map((address, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 mb-3 bg-gray-50"
            >
              <input
                className="border p-2 rounded w-full mb-2"
                placeholder="Address Line 1"
                value={address.addressLine1}
                onChange={(e) =>
                  handleAddressChange(
                    index,
                    "addressLine1",
                    e.target.value
                  )
                }
              />

              <input
                className="border p-2 rounded w-full mb-2"
                placeholder="Address Line 2"
                value={address.addressLine2}
                onChange={(e) =>
                  handleAddressChange(
                    index,
                    "addressLine2",
                    e.target.value
                  )
                }
              />

              <select
                className="border p-2 rounded w-full mb-2"
                value={address.city?.id || ""}
                onChange={(e) =>
                  handleAddressNested(index, "city", e.target.value)
                }
              >
                <option value="">Select City</option>
                {cities.map(city => (
                    <option key={city.id} value={city.id}>
                    {city.cityName}
                    </option>
                ))}
                
              </select>

              <select
                className="border p-2 rounded w-full mb-2"
                value={address.country?.id || ""}
                onChange={(e) =>
                  handleAddressNested(index, "country", e.target.value)
                }
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.countryName}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => removeAddress(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove Address
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addAddress}
            className="bg-green-500 text-white px-4 py-2 rounded mb-5"
          >
            + Add Address
          </button>

          {/* Family */}
          <h3 className="font-semibold text-lg mb-2">Family Members</h3>

          <Select
            isMulti
            options={familyOptions}
            value={selectedFamily}
            onChange={handleFamilyChange}
          />

          <button
            type="submit"
            className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded"
          >
            {form.id ? "Update Customer" : "Save Customer"}
          </button>
        </form>
      </div>
    </div>
  );
}