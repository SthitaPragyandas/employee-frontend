import axios from 'axios'
import React from 'react'


export const columns = () => [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "100px"
    },
    {
        name: "Emp Id",
        selector: (row) => row.employeeId,
        sortable: true,
        width: "100px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "120px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true
    },
]


export const AttendanceHelper = ({ status, employeeId, statusChange }) => {
    const markEmployee = async (status, employeeId) => {
        const response = await axios.put(`http://localhost:5000/api/attendance/update/${employeeId}`, { status }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        if (response.data.success) {
            statusChange()
        }
    }
    return (
        <div>
            {status == null ? (
                <div className="flex space-x-8">
                    <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => markEmployee("Present", employeeId)}>
                        Present
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => markEmployee("Absent", employeeId)}>
                        Absent
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded" onClick={() => markEmployee("Sick", employeeId)}>
                        Sick
                    </button>
                    <button className="px-4 py-2 bg-yellow-600 text-black rounded" onClick={() => markEmployee("Leave", employeeId)}>
                        Leave
                    </button>
                </div>
            ) : (
                <p className={`text-center py-2 px-4 rounded font-semibold ${status === "Present" ? "bg-green-100 text-green-800" :
                        status === "Absent" ? "bg-red-100 text-red-800" :
                            status === "Sick" ? "bg-gray-100 text-gray-800" :
                                status === "Leave" ? "bg-yellow-100 text-yellow-800" :
                                    "bg-gray-100 text-gray-800"
                    }`}>{status}</p>
            )
            }
        </div >
    )
}
