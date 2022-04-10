import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import { addEmployee, editEmployee } from '../../utils/db';
import '../../App.css'


const Edit = ({ open, setOpen, readData, selectedItem, setSelectedItem }) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [country, setCountry] = useState("");
    const [position, setPosition] = useState("");
    const [wage, setWage] = useState("");
    const [display, setDisplay] = useState("none");
    const action = useRef("Add")


    const inputHandler = (e, setState) => {
        setState(e.target.value)
    }

    const handleEdit = async () => {
        try {
            if (action.current === "Add") {
                await addEmployee(name, age, country, position, wage)
            } else if (action.current === "Edit") {
                await editEmployee(selectedItem.employee_ID, name, age, country, position, wage)
            }
            setOpen(false);
            readData();
        } catch (err) {
            if (err === 'jwt expired') {
                alert('Please refresh your token')
            } else {
                alert(err)
            }
        }
    }

    useEffect(() => {
        console.log(selectedItem)
        if (open) {
            setDisplay("block")
            if (selectedItem.employee_ID) {
                action.current = "Edit"
                const { name, age, country, position, wage } = selectedItem;
                setName(name);
                setAge(age);
                setPosition(position);
                setCountry(country);
                setWage(wage);
            }
        }
        else {
            setDisplay("none")
            action.current = "Add"
            setName("")
            setAge("")
            setCountry("")
            setPosition("")
            setWage("")
            setSelectedItem({})
        }
    }, [open])


    return (

        <div id="myModal" className="modal" style={{ display }}>
            <div className="modal-content">
                <TiDeleteOutline className="close" onClick={() => setOpen(false)} />
                <div className="modal-form">
                    <label>Name</label>
                    <input type="text"
                        value={name}
                        onChange={(e) => inputHandler(e, setName)}
                    />
                    <label>Age</label>
                    <input type="text"
                        value={age}
                        onChange={(e) => inputHandler(e, setAge)}
                    />
                    <label>Country</label>
                    <input type="text"
                        value={country}
                        onChange={(e) => inputHandler(e, setCountry)}
                    />
                    <label>Position</label>
                    <input type="text"
                        value={position}
                        onChange={(e) => inputHandler(e, setPosition)}
                    />
                    <label>Wage(year)</label>
                    <input type="text"
                        value={wage}
                        onChange={(e) => inputHandler(e, setWage)}
                    />
                </div>
                <button onClick={handleEdit}>{action.current}</button>
            </div>
        </div>

    )
}

export default Edit
