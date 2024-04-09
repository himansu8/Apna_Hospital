import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"
import './updatereceptionist.scss'
import { toast } from "react-toastify";

function UpdateReceptionist() {
    let navigate = useNavigate();
    const { state } = useLocation();
    const { referenceNo, name, gender, email, mobile, address, password } = state;
    const [data, setData] = useState({
        name: name,
        gender: gender,
        email: email,
        mobile: mobile,
        address: address,
        password: password
    });

    function onChangeHandler(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const inputData = async (e, referenceNo) => {
        try {
            e.preventDefault();
            let res = await axios.patch(`/api/receptionist/${referenceNo}`, data);
            console.log(res.data)
            //window.alert("Updated Successfully")
            toast.success("Updated successfully")
            navigate("/receptionist")
        } catch (error) {
            let errorString = "";
            if (error.response.data.errors) {
                error.response.data.errors.forEach((ele) => {
                    errorString += `${ele.msg} `
                })
                //window.alert(errorString)
                toast.error(errorString)
            }
            else {
                errorString = error.response.data.error;
                //window.alert(errorString)
                toast.error(errorString)
            }
        }
    };
  return (
    <div className="receptionist-update-form">
    <h1>Receptionist Update Form</h1>
    <form>
        <label>
            <b>Receptionist Full Name</b><br />
            <input type="text" placeholder="Enter Name" name="name" onChange={onChangeHandler} value={data.name} />
        </label>
        <br />
        <label>
            <b>Phone Number</b><br />
            <input type="text" placeholder="Enter mobile number" name="mobile" onChange={onChangeHandler} value={data.mobile} />
        </label>
        <br />
        <label>
            <b>Email</b><br />
            <input type="email" placeholder="Enter email" name="email" onChange={onChangeHandler} value={data.email} />
        </label>
        <br />
        <label>
            <b>Address</b><br />
            <input type="text" placeholder="Enter Your Address" name="address" onChange={onChangeHandler} value={data.address} />
        </label>
        <br />
        <label>
            <b>Gender</b><br />
            <select value={data.gender} name="gender" onChange={onChangeHandler}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>       
             </label>
        <br />
        <button type="submit" onClick={(e) => inputData(e, referenceNo)}>Submit</button>
    </form>
</div>
  )
}

export default UpdateReceptionist