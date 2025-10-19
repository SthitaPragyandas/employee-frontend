import axios from "axios"
import { useNavigate } from "react-router-dom"

export const columns = () => [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable:true
    },
    {
        name: "Action",
        selector: (row) => row.action
    },
]

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate()
    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete?")
        if (confirm) {
            try {
                const response = await axios.delete(`https://employee-api-khaki-nine.vercel.app/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })

                if (response.data.success) {
                    onDepartmentDelete()
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        }
    }

    return (
        <div className="flex space-x-3">
            <button className="px-6 py-2 rounded bg-teal-600 text-white cursor-pointer" onClick={() => navigate(`/admin-dashboard/department/${_id}`)}>Edit</button>
            <button className="px-6 py-2 rounded bg-red-600 text-white cursor-pointer" onClick={() => handleDelete(_id)}>Delete</button>
        </div>
    )
}
