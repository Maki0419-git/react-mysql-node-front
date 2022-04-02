import { useState, useEffect } from 'react';
import { AiOutlineUserDelete, AiOutlineUserAdd } from 'react-icons/ai'
import { FaUserEdit } from 'react-icons/fa';
import Edit from './Edit';
import '../../App.css';
import { showEmployees, deleteEmployee } from '../../utils/db'

const Table = () => {
    const [employees, setEmployees] = useState({});
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    const readData = async () => {
        try {
            const result = await showEmployees();
            setEmployees(result);
        } catch (err) {
            alert(err)
        }

    }

    const handleDelete = async (employee_ID) => {
        try {
            await deleteEmployee(employee_ID);
            readData();
        } catch (err) {
            alert(err)
        }
    }

    const handleEdit = (item) => {
        setSelectedItem(item);
        setOpen(true);
    }

    useEffect(() => {
        readData();
    }, [])

    return (
        <div className="info">

            <table>
                <caption><div><h2>Employee list</h2><AiOutlineUserAdd className="icon" onClick={() => setOpen(true)} /></div></caption>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>name</th>
                        <th>age</th>
                        <th>country</th>
                        <th>position</th>
                        <th>wage</th>
                        <th align='center'>delete</th>
                        <th align='center'>edit</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.allEmployees && employees.allEmployees.length > 0 &&
                        employees.allEmployees.map((employee) =>
                            <tr key={employee.employee_ID}>
                                {Object.values(employee).map((info, index) =>
                                    <td key={index}>
                                        {info}
                                    </td>

                                )}
                                <td align='center' display='flex' >
                                    <AiOutlineUserDelete className="icon" onClick={() => handleDelete(employee.employee_ID)} />
                                </td>
                                <td align='center' display='flex' >
                                    <FaUserEdit className="icon" onClick={() => handleEdit(employee)} />
                                </td>
                            </tr>
                        )
                    }
                </tbody>
                <tfoot>
                    {employees.allEmployees && employees.allEmployees.length > 0 &&
                        <tr>
                            <td>平均</td>
                            <td></td>
                            <td>{employees.average[0].averageAge}</td>
                            <td></td>
                            <td></td>
                            <td>{employees.average[0].averageWage}</td>
                        </tr>
                    }
                </tfoot>
            </table>
            <Edit {...{ open, selectedItem, setSelectedItem, setOpen, readData }} />
        </div>
    )
}

export default Table
