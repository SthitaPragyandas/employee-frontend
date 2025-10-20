import axios from "axios";
import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component"


const List = () => {
    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)
    const [filteredEmployee, setFilteredEmployee] = useState([])

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true)
            try {
                const response = await axios.get("http://localhost:5000/api/employee", {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((emp) => (
                        {
                            _id: emp._id,
                            sno: sno++,
                            dep_name: emp.department.dep_name,
                            name: emp.userId.name,
                            dob: new Date(emp.dob).toLocaleDateString(),
                            employeeId: emp.employeeId,
                            profileImage: <img className="rounded w-20" src={`http://localhost:5000/${emp.userId.profileImage}`} />,
                            action: <EmployeeButtons _id={emp._id} />,
                        }
                    ));
                    setEmployees(data)
                    setFilteredEmployee(data)
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setEmpLoading(false)
            }
        }
        fetchEmployees();
    }, [])

    const handleFilter = (e) => {
        const records = employees.filter((emp) => {
            return emp.name.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilteredEmployee(records)
    }


    return (
        <div className="p-5">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Employees</h3>
            </div>
            <div className="flex justify-between items-center">
                <input type="text" placeholder="Search By Dept Name" className="px-4 py-0.5 border rounded" onChange={handleFilter} />
                <Link to="/admin-dashboard/add-employee" className="px-4 py-1 bg-teal-600 rounded text-white">Add New Employee</Link>
            </div>
            <div className="mt-6">
                <DataTable columns={columns()} data={filteredEmployee} pagination />
            </div>
        </div>
    )
}
export default List;