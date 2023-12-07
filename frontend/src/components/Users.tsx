import React, { useState, useEffect } from "react"
import axios from "axios"
import Swal from 'sweetalert2'
import Link from "next/link"
import router from "next/router"
import Navbar from "./Navbar"
const Users = () => {
    const [userData, setuserData] = useState([])
    const [deleted, setDeleted] = useState(0)
    const [showModal, setShowModal] = React.useState(false);
    const [copiedObject, setCopiedObject] = useState<any>(null);
    const [selectedRole, setSelectedRole] = useState(''); 
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                // Redirect to the login page if the user is not authenticated
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "you are not logged in!"
                })
                router.push("/login");
            } else {
                const res = await axios.get(`http://127.0.0.1:9000/api/v1/users`,
                    { headers: { authorization: localStorage.getItem("token") } })
                setuserData(res.data.data.users)
            }
        } catch (err: any) {
            // err.response.data.message
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response.data.message
            });
        }
    }

    const deleteuser = async (id: any) => {
        try {
            // console.log(localStorage.getItem("token"))
            const res = await axios.delete(`http://127.0.0.1:9000/api/v1/users/${id}`,
                { headers: { authorization: localStorage.getItem("token") } })
            console.log("user deleted successfully!")
            setDeleted(prev=>prev+1) 
        } catch (err: any) {
            // err.response.data.message
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response.data.message
            });
        }
    }

    const handleEditClick = (inputObject: any) => {
        // Use the spread operator for shallow copy
        const copied = { ...inputObject };
        setShowModal(true);
        setSelectedRole(copied.role);
        // Set the state of copiedObject
        setCopiedObject(copied);
    }

    // const role = localStorage.getItem("role")
    // const handleEdit = async () =>{

    // }

    useEffect(() => {
        fetchData();
        // console.log(copiedObject)
        // fetchRole();
    }, [deleted, selectedRole]);

    // Handle change in the selected role
  const handleRoleChange = (event: any) => {
    setSelectedRole(event.target.value);
  };

  const handleChange = async (e: any) =>{
    setShowModal(false)
    e.preventDefault();
    try{
        const res = await axios.patch(`http://127.0.0.1:9000/api/v1/users/${copiedObject._id}`,
        {data:{role: selectedRole}})
        // console.log("Role Changed!")
        setDeleted(prev=>prev+1) 
    }catch(err: any){
        // err.response.data.message
        console.log(err)
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err
        });
    }
  }

    return (<>
        {/* {console.log(userData)} */}
        <Navbar></Navbar>
        <div className="grid grid-cols-4 gap-2 justify-items-center">
            {
                userData.map((UserItem: any) => {
                    // console.log(UserItem)
                    return (
                        <div className="w-full max-w-xs p-4 bg-white border border-grey-800 rounded-lg shadow sm:p-4 dark:bg-teal-100 dark:border-gray-700 bg-teal-50 m-4">
                            <div className="flex items-center justify-between mb-4">
                                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">USER</h5>
                            </div>
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 ">
                                    <li className="py-3 ">
                                        <div className="flex items-center">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    User Name
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {UserItem.name}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 ">
                                        <div className="flex items-center">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    User Email
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {UserItem.email}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 ">
                                        <div className="flex items-center">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    User Role
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {UserItem.role}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex mt-4 md:mt-6">
                                            <Link href="#" onClick={() => handleEditClick(UserItem)} className="inline-flex items-center px-4 py-1 text-sm font-medium text-center text-teal-500 bg-white border border-teal-400 rounded-lg hover:bg-teal-400 hover:text-white hover:border-white dark:bg-teal-400 dark:text-teal-400 dark:border-teal-400 dark:hover:bg-teal-400 dark:hover:border-white ">Edit</Link>
                                            <Link href="#" onClick={() => deleteuser(UserItem._id)} className="inline-flex items-center px-4 py-1 text-sm font-medium text-center text-white bg-teal-400 border border-white rounded-lg hover:bg-white hover:text-teal-400 hover:border-teal-400  dark:bg-teal-400 dark:text-teal-400 dark:border-teal-400 dark:hover:bg-teal-400 dark:hover:border-white ms-3">Delete</Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        {/* <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button> */}
        {showModal ? (
            <>
             <form className="space-y-6" action="#" onSubmit={handleChange}>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h6 className="text-2xl font-semibold">
                                    UPDATE USER
                                </h6>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <div className="flow-root">
                                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 ">
                                        <li className="py-3 ">
                                            <div className="flex items-center">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        User Name
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        {copiedObject.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="py-3 ">
                                            <div className="flex items-center">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        User Email
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        {copiedObject.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="py-3 ">
                                            <div className="flex items-center">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        User Role
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400 py-2">
                                                        {/* {copiedObject.role} */}
                                                        <select
                                                            value={selectedRole}
                                                            onChange={handleRoleChange}
                                                            className="text-sm text-gray-500 dark:text-gray-400 border border-1 border-black p-1"
                                                        >
                                                            <option value="superadmin">Superadmin</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="guest">Guest</option>
                                                        </select>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        
                                    // onClick={() => setShowModal(false)}
                                >
                                    Save Changes
                                </button>
                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
                </form>
            </>
        ) : null}
    </>)
}

export default Users