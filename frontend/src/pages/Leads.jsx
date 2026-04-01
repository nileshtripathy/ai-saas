import { useEffect, useState } from "react";
import { api } from "../api/axios";
import Layout from "../components/Layout";
import StatsCard from "../components/StatsCard";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    interest: ""
  });

  // Fetch leads
  const fetchLeads = async () => {
    try {
      const res = await api.get("/api/leads");
      setLeads(res.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/leads", form);

      setForm({
        name: "",
        phone: "",
        interest: ""
      });

      fetchLeads(); // refresh UI
    } catch (error) {
      console.error("Error saving lead:", error);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Leads Dashboard 🚀</h1>
          <p className="text-gray-500">
            Manage and track your leads efficiently
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          <StatsCard title="Total Leads" value={leads.length} />
          <StatsCard title="Today Leads" value={leads.length} />
          <StatsCard title="Conversion" value="20%" />
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Add New Lead</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-4 gap-4"
          >
            <input
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <input
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              required
            />

            <input
              className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Interest"
              value={form.interest}
              onChange={(e) =>
                setForm({ ...form, interest: e.target.value })
              }
              required
            />

            <button
              type="submit"
              className="bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Add Lead
            </button>
          </form>
        </div>

        {/* Leads List */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">All Leads</h2>

          {leads.length === 0 ? (
            <p className="text-gray-500">No leads found</p>
          ) : (
            <div className="divide-y">
              {leads.map((lead) => (
                <div
                  key={lead._id}
                  className="flex justify-between py-3 text-sm"
                >
                  <span className="font-medium">{lead.name}</span>
                  <span>{lead.phone}</span>
                  <span className="text-gray-500">
                    {lead.interest}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </Layout>
  );
}

export default Leads;