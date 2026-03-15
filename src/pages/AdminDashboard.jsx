import { useEffect, useState } from "react";

const AdminDashboard = () => {

  const [reports, setReports] = useState([]);

  const API = "https://go-clean-8c5n.onrender.com/api/report";

  const fetchReports = async () => {
    try {

      const res = await fetch(`${API}/reports`);
      const data = await res.json();

      setReports(data);

    } catch (error) {
      console.error(error);
    }
  };


  const updateStatus = async (id, status) => {

    try {

      await fetch(`${API}/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      fetchReports();

    } catch (error) {
      console.error(error);
    }

  };


  useEffect(() => {
    fetchReports();
  }, []);


  return (

    <div className="px-4 md:px-10 pt-24 pb-20">

      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Waste Reports Dashboard
      </h1>


      {/* MOBILE VIEW */}
      <div className="md:hidden space-y-5">

        {reports.map((report) => (

          <div
            key={report._id}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >

            <div className="flex justify-between">

              <span className="font-semibold">
                {report.issueType}
              </span>

              <span className="text-sm text-gray-500">
                {new Date(report.createdAt).toLocaleDateString()}
              </span>

            </div>


            <p className="text-sm">
              <strong>Bin:</strong> {report.binId || "Manual"}
            </p>

            <p className="text-sm">
              <strong>Phone:</strong> {report.phone || "-"}
            </p>

            <p className="text-sm">
              <strong>Description:</strong> {report.description || "-"}
            </p>


            {report.image && (

              <img
                src={`https://go-clean-8c5n.onrender.com/uploads/${report.image}`}
                className="w-full h-40 object-cover rounded"
              />

            )}


            <a
              href={report.location}
              target="_blank"
              className="text-blue-600 underline text-sm"
            >
              View Map
            </a>


            {/* STATUS */}
            <div className="flex justify-between items-center">

              <span className="font-semibold text-sm">

                {report.status || "Pending"}

              </span>

              <div className="flex gap-2">

                <button
                  onClick={() => updateStatus(report._id, "Pending")}
                  className="bg-gray-500 text-white px-2 py-1 rounded text-xs"
                >
                  Pending
                </button>

                <button
                  onClick={() => updateStatus(report._id, "In Progress")}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                >
                  Progress
                </button>

                <button
                  onClick={() => updateStatus(report._id, "Completed")}
                  className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                >
                  Done
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>



      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">

        <table className="w-full border text-sm">

          <thead className="bg-green-700 text-white">

            <tr>

              <th className="p-3">Bin</th>
              <th className="p-3">Issue</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Description</th>
              <th className="p-3">Image</th>
              <th className="p-3">Location</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
              <th className="p-3">Date</th>

            </tr>

          </thead>


          <tbody>

            {reports.map((report) => (

              <tr key={report._id} className="border hover:bg-gray-50">

                <td className="p-3">
                  {report.binId || "Manual"}
                </td>

                <td className="p-3">
                  {report.issueType}
                </td>

                <td className="p-3">
                  {report.phone || "-"}
                </td>

                <td className="p-3 max-w-xs truncate">
                  {report.description || "-"}
                </td>


                <td className="p-3">

                  {report.image ? (

                    <img
                      src={`https://go-clean-8c5n.onrender.com/uploads/${report.image}`}
                      className="w-16 h-16 object-cover rounded"
                    />

                  ) : "-"}

                </td>


                <td className="p-3">

                  <a
                    href={report.location}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    View Map
                  </a>

                </td>


                <td className="p-3 font-semibold">

                  <span
                    className={`px-2 py-1 rounded text-black text-xs
                      ${
                        report.status === "Completed"
                          ? "bg-green-600"
                          : report.status === "In Progress"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }`}
                  >
                    {report.status || "Pending"}
                  </span>

                </td>


                <td className="p-3 flex gap-2">

                  <button
                    onClick={() => updateStatus(report._id, "Pending")}
                    className="bg-gray-500 text-black px-2 py-1 rounded text-xs"
                  >
                    Pending
                  </button>

                  <button
                    onClick={() => updateStatus(report._id, "In Progress")}
                    className="bg-yellow-500 text-black px-2 py-1 rounded text-xs"
                  >
                    Progress
                  </button>

                  <button
                    onClick={() => updateStatus(report._id, "Completed")}
                    className="bg-green-600 text-black px-2 py-1 rounded text-xs"
                  >
                    Done
                  </button>

                </td>


                <td className="p-3">
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default AdminDashboard;