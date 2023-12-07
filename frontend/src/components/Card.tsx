import React, { useState, useEffect } from "react";
// import
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import router from "next/router";
const Card = () => {
  // console.log(url);
  const [tourData, setTourData] = useState([]) as any;
  const [deleted, setDeleted] = useState(0);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to the login page if the user is not authenticated
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "you are not logged in!",
        });
        router.push("/login");
      } else {
        const res = await axios.get(`http://127.0.0.1:9000/api/v1/tours`, {
          headers: { authorization: localStorage.getItem("token") },
        });
        console.log(res.data.data.tours);
        setTourData(res.data.data.tours);
      }
    } catch (err: any) {
      // err.response.data.message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
    }
  };

  const deleteTour = async (id: any) => {
    try {
      // console.log(localStorage.getItem("token"))
      const res = await axios.delete(
        `http://127.0.0.1:9000/api/v1/tours/${id}`,
        { headers: { authorization: localStorage.getItem("token") } },
      );
      setDeleted((prev) => prev + 1);
      console.log("Tour deleted successfully!");
    } catch (err: any) {
      // err.response.data.message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
    }
  };

  // const role = localStorage.getItem("role")
  // const handleEdit = async () =>{

  // }

  useEffect(() => {
    fetchData();
    // fetchRole();
  }, [deleted]);

  return (
    <>
      <h1 className="px-2 py-8 text-center text-3xl capitalize font-bold">
        {tourData[0]?.type}
      </h1>
      <div className="grid grid-cols-4 gap-2 justify-items-center">
        {tourData.map((tourItem: any, key: any) => {
          // console.log(tourItem)
          return (
            <div
              key={key}
              className="w-full max-w-xs p-4 border border-grey-800 rounded-lg shadow sm:p-4 dark:bg-teal-100 dark:border-gray-700 bg-teal-50 m-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  {tourItem.name}
                </h5>
              </div>
              <div className="flow-root">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700 "
                >
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Building Number
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.elements.buildingNumber.value}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Category
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.elements.category.value}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          City
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.elements.city.value}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Description
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.elements.description.value}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Exchange ID
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.elements.exchange_id.value}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Installation
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.elements.installation.value}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Installataion ID
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.elements.installationid.value}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Notice
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.elements.notice.value}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Parent Category
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.elements.parentCategory.value}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Primary Phone
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.elements.primaryPhone.value}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Source
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.elements.source.value}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          State
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.elements.state.value}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Street Address
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.elements.streetAddress.value}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Subcategory
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.elements.subcategory.value}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          zipcode
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {tourItem.elements.zipcode.value}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="py-3 ">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          Location
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          <Link
                            href={`https://www.google.com/maps?q=${tourItem.elements.latitude.value},${tourItem.elements.longitude.value}`}
                            target="_blank"
                            className="text-blue-600 underline"
                          >
                            OPEN IN MAP
                          </Link>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex mt-4 md:mt-6">
                      <Link
                        href="/edit"
                        className="inline-flex items-center px-4 py-1 text-sm font-medium text-center text-teal-500 bg-white border border-teal-400 rounded-lg hover:bg-teal-400 hover:text-white hover:border-white dark:bg-teal-400 dark:text-teal-400 dark:border-teal-400 dark:hover:bg-teal-400 dark:hover:border-white "
                      >
                        Edit
                      </Link>
                      <Link
                        href="#"
                        onClick={() => deleteTour(tourItem._id)}
                        className="inline-flex items-center px-4 py-1 text-sm font-medium text-center text-white bg-teal-400 border border-white rounded-lg hover:bg-white hover:text-teal-400 hover:border-teal-400  dark:bg-teal-400 dark:text-teal-400 dark:border-teal-400 dark:hover:bg-teal-400 dark:hover:border-white ms-3"
                      >
                        Delete
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Card;
