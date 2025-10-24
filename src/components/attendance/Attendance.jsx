import axios from "axios";
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { columns, AttendanceHelper } from "../../utils/AttendanceHelper";
import DataTable from "react-data-table-component"


const Attendance = () => {
    const [attendance, setAttendance] = useState([])
    const [empLoading, setEmpLoading] = useState(false)
    const [filteredAttendance, setFilteredAttendance] = useState([])


    const statusChange=()=>{
        fetchAttendance()
    }

    const fetchAttendance = async () => {
        setEmpLoading(true)
        try {
            const response = await axios.get("http://localhost:5000/api/attendance", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data.success) {
                let sno = 1;
                const data = response.data.attendance.map((att) => (
                    {
                        employeeId: att.employeeId.employeeId,
                        sno: sno++,
                        dep_name: att.employeeId.department.dep_name,
                        name: att.employeeId.userId.name,
                        action: <AttendanceHelper status={att.status} employeeId={att.employeeId.employeeId} statusChange={statusChange}/>,
                    }
                ));
                setAttendance(data)
                setFilteredAttendance(data)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.message || 'An error occurred')
            }
        } finally {
            setEmpLoading(false)
        }
    }

    useEffect(() => {
        fetchAttendance();
    }, [])

    const handleFilter = (e) => {
        const records = attendance.filter((emp) => {
            return emp.employeeId.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilteredAttendance(records)
    }

    if (!filteredAttendance) {
        return <div>Loading ...</div>
    }

    return (
        <div className="p-5">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Attendance</h3>
            </div>
            <div className="flex justify-between items-center mt-4">
                <input type="text" placeholder="Search By empId" className="px-4 py-0.5 border rounded" onChange={handleFilter} />
                <p className="text-2xl">Mark Employees for <span className="font-bold text-2xl"> {new Date().toISOString().split("T")[0]}{" "} </span></p>
                <Link to="/admin-dashboard/attendance-report" className="px-4 py-1 bg-teal-600 rounded text-white">Attendance Report</Link>
            </div>
            <div className="mt-6">
                <DataTable columns={columns()} data={filteredAttendance} pagination />
            </div>
        </div>
    )
}
export default Attendance;