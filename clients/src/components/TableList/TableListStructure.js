import React, { useState, useEffect, useCallback } from "react";
import {
  getStructureByPartner,
  deleteAdmin,
  disableUserAdmin,
  enableAdmin,
} from "../../api/auth";
import Update from "../Modals/Update";
import Desactiver from "./../Modals/Desactiver";
import Delete from "./../Modals/Delete";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { format } from "date-fns";
import ViewInfos from "./../Modals/ViewInfos";

const TableListStructure = ({ idPartner }) => {
  const [modal, setModal] = useState(false);
  const [disable, setDisableModal] = useState(false);
  const [update, setUpdateModal] = useState(false);
  const [view, setViewModal] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSucces] = useState(false);
  const [id, setId] = useState([]);

  const getStructure = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getStructureByPartner(idPartner);
      console.log(res);
      setData(res.data || null);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors de la récuperation des Informations !");
    }
  }, []);

  // const handleChangeStructures = () => {
  //   if (checkStructure === true) {
  //     setData(searchApiData);
  //   } else {
  //     if (checkStructure === false) {
  //       const filterResult = searchApiData.filter(
  //         (item) => item.structure_active === "desactiver"
  //       );
  //       setData(filterResult);
  //     }
  //   }
  // };

  // const handleChangeSearch = (e) => {
  //   if (e.target.value === "") {
  //     setData(searchApiData);
  //   } else {
  //     const filterResult = searchApiData.filter(
  //       (item) =>
  //         item.partner_name
  //           ?.toLocaleLowerCase()
  //           ?.includes(e.target.value.toLocaleLowerCase()) ||
  //         item.structure_name
  //           ?.toLocaleLowerCase()
  //           ?.includes(e.target.value.toLocaleLowerCase()) ||
  //         item.role_as
  //           ?.toLocaleLowerCase()
  //           ?.includes(e.target.value.toLocaleLowerCase()) ||
  //         item.structure_role
  //           ?.toLocaleLowerCase()
  //           ?.includes(e.target.value.toLocaleLowerCase()) ||
  //         item.client_id?.toString()?.includes(e.target.value.toString()) ||
  //         item.structure_id?.toString()?.includes(e.target.value.toString())
  //     );
  //     setData(filterResult);
  //   }
  //   setFilterSearch(e.target.value);
  // };

  const confirmDeleteUser = (id) => {
    deleteAdmin(id).then((res) => {
      if (res.status === 200) {
        setLoading(true);
        setSucces(`Utilisateur supprimé avec succès`);
        console.log(`Utilisateur supprimé avec succès`);
        setModal(false);
        setTimeout(() => {
          setSucces(false);
          getStructure();
        }, 1000);
      } else if (res.status === 404) {
        setError("Erreur lors de la suppression de l'utilisateur");
        console.log("Erreur lors de la suppression de l'utilisateur");
        setTimeout(() => {
          setError("");
        }, 1000);
      }
    });
  };
  const userDisable = (id) => {
    disableUserAdmin(id).then((res) => {
      if (res.status === 200) {
        setLoading(true);
        setSucces(res.data);
        console.log(res.data);
        setDisableModal(false);
        setTimeout(() => {
          setLoading(false);
          setSucces(false);
          getStructure();
        }, 1000);
      } else if (res.status === 500) {
        setError("La désactivation du Partenaire à eu une erreur !");
        console.log("Partenaire non désactiver");
        setTimeout(() => {
          setError("");
        }, 1000);
      }
    });
  };
  const userEnable = (id) => {
    enableAdmin(id).then((res) => {
      if (res.status === 200) {
        setLoading(true);
        setSucces(res.data);
        console.log(res.data);
        setDisableModal(false);
        setTimeout(() => {
          setLoading(false);
          setSucces(false);
          getStructure();
        }, 1000);
      } else if (res.status === 404) {
        setError("Erreur dans la ré-activation du Partenaire !");
        console.log("Partenaire non activer");
        setTimeout(() => {
          setError("");
        }, 1000);
      }
    });
  };

  useEffect(() => {
    getStructure();
  }, [getStructure]);

  return (
    <div className="bg-white p-2 rounded-md w-full overflow-hidden">
      <div className="flex flex-col">
        {success && (
          <div className="text-white bg-green-500 text-center h-12 md:px-40">
            {success}
          </div>
        )}
        {error && (
          <div className="text-white bg-red-600 h-12 text-center">{error}</div>
        )}
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="mt-10 text-center ">
                  En cours de Chargement...
                </div>
              ) : (
                <Table className="mt-0 min-w-full">
                  <Thead className="border-b">
                    <Tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <Th className="py-3 px-6 text-left">Client Id</Th>
                      <Th className="py-3 px-6 text-left">Logo</Th>
                      <Th className="py-3 px-24 md:px-6 text-left ">Nom</Th>
                      <Th className=" py-3 px-6 text-left">Email</Th>
                      <Th className="py-3 px-6 text-center ">Status</Th>
                      <Th className="py-3 px-6 text-center">Role</Th>
                      <Th className="py-3 px-6 text-center">Ajouter le</Th>
                      <Th className="py-3 px-6 text-center">Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody className="text-gray-600 text-sm font-light w-full">
                    {data?.map((item, i) => {
                      return (
                        <Tr
                          key={i}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <Td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <span className="font-semibold">
                                {item.structure_id}
                              </span>
                            </div>
                          </Td>
                          <Td className="py-3 px-6 text-left">
                            <div className="items-center w-16 h-16">
                              <span className="font-semibold ">
                                <img
                                  src={item.structure_logo_url}
                                  alt=""
                                  className="rounded"
                                />
                              </span>
                            </div>
                          </Td>
                          <Td className="py-3 px-6 text-left">
                            <div className="flex items-center ">
                              <span className="font-semibold text-[10px] sm:text-sm ">
                                {item.structure_name}
                              </span>
                            </div>
                          </Td>
                          <Td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <span className="font-semibold text-[8px] sm:text-sm">
                                {item.structure_email}
                              </span>
                            </div>
                          </Td>
                          <Td className="py-3 px-6 text-center">
                            <span
                              className={`${
                                item.structure_active === "activer"
                                  ? "bg-green-500"
                                  : "bg-rose-500"
                              } text-white font-semibold py-1 px-3 rounded-full text-xs`}
                            >
                              {item.structure_active}
                            </span>
                          </Td>

                          <Td className="py-3 px-6 text-center">
                            <span
                              className={`${
                                item.structure_role === "structure"
                                  ? "bg-yellow-400"
                                  : "bg-gray-500"
                              }  text-white font-semibold py-1 px-3 rounded-full text-xs`}
                            >
                              {item.structure_role}
                            </span>
                          </Td>

                          <Td className="py-3 px-6 text-center">
                            <div className="flex items-center font-semibold justify-center text-[10px] sm:text-sm">
                              <span>
                                {item.structure_created_at
                                  ? format(
                                      new Date(item.structure_created_at),
                                      "dd-MM-yyyy"
                                    )
                                  : ""}
                              </span>
                            </div>
                          </Td>
                          <Td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                              <button
                                onClick={() =>
                                  setId(item.structure_id) || setViewModal(true)
                                }
                              >
                                <div className="w-6 mr-3 transform text-green-500 hover:scale-110 cursor-pointer">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                </div>
                              </button>

                              <button
                                onClick={() =>
                                  setId(item.structure_id) ||
                                  setUpdateModal(true)
                                }
                              >
                                <div className="w-6 mr-3 transform text-purple-500 hover:scale-110 cursor-pointer">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </div>
                              </button>
                              <div className="w-10 mr-3 transform hover:scale-110 cursor-pointer">
                                <button
                                  className="w-6"
                                  onClick={() =>
                                    setId(item.structure_id) ||
                                    setDisableModal(true)
                                  }
                                >
                                  <img
                                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-Alert-interface-those-icons-lineal-those-icons.png"
                                    alt=""
                                  />
                                </button>
                              </div>
                              {disable && (
                                <Desactiver
                                  disableModal={() => setDisableModal(false)}
                                  userDisable={() => userDisable(id)}
                                  userActivate={() => userEnable(id)}
                                  refreshUser={() => getStructure()}
                                />
                              )}
                              <button
                                onClick={() =>
                                  setId(item.structure_id) || setModal(true)
                                }
                              >
                                <div className="w-6 mr-3 transform text-red-500 hover:scale-110 cursor-pointer">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </div>
                              </button>
                              {modal && (
                                <Delete
                                  deleteModal={() => setModal(false)}
                                  confirmDelete={() => confirmDeleteUser(id)}
                                  refreshUser={() => getStructure()}
                                />
                              )}
                            </div>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              )}
              {update && (
                <Update
                  updateModal={() => setUpdateModal(false)}
                  id={id}
                  refreshUser={() => getStructure()}
                />
              )}
              {view && (
                <ViewInfos
                  viewModal={() => setViewModal(false)}
                  id={id}
                  refreshUser={() => getStructure()}
                />
              )}             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableListStructure;
