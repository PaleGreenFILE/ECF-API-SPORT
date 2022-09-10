import React, { useState, useEffect } from "react";
import {
  getAllUsers,
  deleteAdmin,
  deletePartners,
  deleteStructures,
  disableUserAdmin,
  enableAdmin,
} from "../../api/auth";
import AddUser from "../Modals/ModalAddUser/AddUser";
import Update from "../Modals/Update";
import Desactiver from "./../Modals/Desactiver";
import ViewUser from "./../Modals/ViewUser";
import { useNavigate } from "react-router-dom";
import Delete from "./../Modals/Delete";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const TableList = (props) => {
  const [modal, setModal] = useState(false);
  const [disable, setDisableModal] = useState(false);
  const [update, setUpdateModal] = useState(false);
  const [view, setViewModal] = useState(false);
  const [addNewUser, setAddNewUserModal] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSucces] = useState(false);
  const [id, setId] = useState([]);

  const navigate = useNavigate();

  const confirmDeleteUser = (id) => {
    deleteAdmin(id).then((res) => {
      if (res.status === 200) {
        setLoading(true);
        setSucces(`Utilisateur supprimé avec succès`);
        console.log(`Utilisateur supprimé avec succès`);
        setModal(false);
        setTimeout(() => {
          setSucces(false);
          getUsers();
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
  const confirmDeletePartners = (id) => {
    deletePartners(id).then((res) => {
      if (res.status === 200) {
        setLoading(true);
        setSucces(`Utilisateur supprimé avec succès`);
        console.log(`Utilisateur supprimé avec succès`);
        setModal(false);
        setTimeout(() => {
          setSucces(false);
          getUsers();
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
  const confirmDeleteStructures = (id) => {
    deleteStructures(id).then((res) => {
      if (res.status === 200) {
        setLoading(true);
        setSucces(`Utilisateur supprimé avec succès`);
        console.log(`Utilisateur supprimé avec succès`);
        setModal(false);
        setTimeout(() => {
          setSucces(false);
          getUsers();
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
    alert(id);
    disableUserAdmin(id).then((res) => {
      if (res.status === 200) {
        setLoading(true);
        setSucces("Partenaire Désactiver!");
        console.log("Partenaire désactiver");
        setDisableModal(false);
        setTimeout(() => {
          setSucces(false);
          getUsers();
        }, 1000);
      } else if (res.status === 404) {
        setError("La désactivation du Partenaire à eu une erreur !");
        console.log("Partenaire non désactiver");
        setTimeout(() => {
          setError("");
        }, 1000);
      }
    });
  };

  const userEnable = (id) => {
    alert(id);
    enableAdmin(id).then((res) => {
      if (res.status === 200) {
        setLoading(true);
        setSucces("Partenaire Activer!");
        console.log("Partenaire Activer");
        setDisableModal(false);
        setTimeout(() => {
          setSucces(false);
          getUsers();
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
  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      setData(res.data);
      setLoading(false);
    } catch (err) {
      setError(
        "Votre session à expirer , Vous allez être rediriger sur la page de connexion !"
      );
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="bg-white p-8 rounded-md  w-full mt-12">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="hidden md:flex text-gray-600 font-semibold">
            Liste des Clubs
          </h2>
        </div>
        <div className=" items-center justify-between px-10">
          <div className="flex bg-gray-50 items-center p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="bg-gray-50 outline-none block "
              type="text"
              placeholder="Rechercher..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="text-sm px-12">
            <button
              onClick={() => setAddNewUserModal(true)}
              className=" md:flex p-2  mt-5  items-center justify-center bg-blue-500  rounded-md text-white font-semibold tracking-wide cursor-pointer"
            >
              Ajouter un club
            </button>
            {addNewUser && (
              <AddUser addNewModal={() => setAddNewUserModal(false)} />
            )}
          </div>
        </div>
      </div>
      {success && (
        <div className="text-white bg-green-500 text-center px-40">
          {success}
        </div>
      )}
      {error && (
        <div className="text-white bg-red-600 text-center">{error}</div>
      )}
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              {loading && (
                <div className="text-center ">En cours de Chargement...</div>
              )}
              <Table className="min-w-full">
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

                <Tbody className="text-gray-600 text-sm font-light">
                  {data.map((item, i) => (
                    <Tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <Td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <span className="font-semibold">
                            {item.client_id || item.structure_id}
                          </span>
                        </div>
                      </Td>
                      <Td className="py-3 px-6 text-left">
                        <div className="items-center w-16 h-16">
                          <span className="font-semibold ">
                            <img
                              src={item.logo_url || item.structure_logo_url}
                              alt=""
                              className="rounded"
                            />
                          </span>
                        </div>
                      </Td>
                      <Td className="py-3 px-6 text-left">
                        <div className="flex items-center ">
                          <span className="font-semibold text-[10px] sm:text-sm ">
                            {item.partner_name || item.structure_name}
                          </span>
                        </div>
                      </Td>
                      <Td className="py-3 px-6 text-left">
                        <div className="flex items-center">
                          <span className="font-semibold text-[8px] sm:text-sm">
                            {item.partner_contact || item.structure_contact}
                          </span>
                        </div>
                      </Td>

                      <Td className="py-3 px-6 text-center">
                        <span
                          className={`${item.active === "activer"
                              ? "bg-green-500"
                              : "bg-rose-500"
                                ? item.structure_active === "activer"
                                  ? "bg-green-500"
                                  : "bg-rose-500"
                                : "bg-gray-500"
                            } text-white font-semibold py-1 px-3 rounded-full text-xs`}
                        >
                          {item.active || item.structure_active}
                        </span>
                      </Td>

                      <Td className="py-3 px-6 text-center">
                        <span
                          className={`${item.role_as === "partenaire"
                              ? "bg-purple-500"
                              : item.structure_role === "structure"
                                ? "bg-yellow-400"
                                : "bg-gray-500"
                            }  text-white font-semibold py-1 px-3 rounded-full text-xs`}
                        >
                          {item.role_as || item.structure_role}
                        </span>
                      </Td>

                      <Td className="py-3 px-6 text-center">
                        <div className="flex items-center font-semibold justify-center text-[10px] sm:text-sm">
                          <span>
                            {item.created_at || item.structure_created_at}
                          </span>
                        </div>
                      </Td>

                      <Td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <button onClick={() => setViewModal(true)}>
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
                          {view && (
                            <ViewUser
                              viewUserModal={() => setViewModal(false)}
                            />
                          )}

                          <button onClick={() => setUpdateModal(true)}>
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
                          {update && (
                            <Update updateModal={() => setUpdateModal(false)} />
                          )}

                          <div className="w-10 mr-3 transform hover:scale-110 cursor-pointer">
                            <button
                              className="w-6"
                              onClick={() => (
                                setId(item.structure_id || item.client_id),
                                setDisableModal(true)
                              )}
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
                            />
                          )}

                          <button onClick={() => setModal(true)}>
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
                              confirmDelete={() => confirmDeleteUser(id) && confirmDeletePartners(id) && confirmDeleteStructures(id)}
                            />
                          )}
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">
                  Résultats de 1 à 4 sur 50 Entrées
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                    Prev
                  </button>
                  &nbsp; &nbsp;
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableList;
