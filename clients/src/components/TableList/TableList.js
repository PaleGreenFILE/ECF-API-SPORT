import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteAdmin, disableUserAdmin, enableAdmin } from '../../api/auth';
import AddUser from '../Modals/ModalAddUser/AddUser';
import Update from '../Modals/Update';
import Desactiver from './../Modals/Desactiver';
import { useNavigate } from 'react-router-dom';
import Delete from './../Modals/Delete';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { compareAsc, format } from 'date-fns';

const TableList = () => {
  const [modal, setModal] = useState(false);
  const [disable, setDisableModal] = useState(false);
  const [update, setUpdateModal] = useState(false);
  const [view, setViewModal] = useState(false);
  const [addNewUser, setAddNewUserModal] = useState(false);
  const [searchApiData, setSearchApiData] = useState([]);
  const [filtersearch, setFilterSearch] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSucces] = useState(false);
  const [id, setId] = useState([]);
  const [checkPartner, setCheckPartner] = useState(false);
  const [checkStructure, setCheckStructure] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      setData(res.data);
      setSearchApiData(res.data);
      setLoading(false);
      setFilterSearch('');
    } catch (err) {
      setError('Votre session à expirer , Vous allez être rediriger sur la page de connexion !');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  const navigate = useNavigate();
  const handleChangePartenaires = () => {
    if (checkPartner === true) {
      setData(searchApiData);
    } else {
      if (checkPartner === false) {
        const filterResult = searchApiData.filter((item) => item.active === 'desactiver');
        setData(filterResult);
      }
    }
  };

  const handleChangeStructures = () => {
    if (checkStructure === true) {
      setData(searchApiData);
    } else {
      if (checkStructure === false) {
        const filterResult = searchApiData.filter((item) => item.structure_active === 'desactiver');
        setData(filterResult);
      }
    }
  };

  const handleChangeSearch = (e) => {
    if (e.target.value === '') {
      setData(searchApiData);
    } else {
      const filterResult = searchApiData.filter(
        (item) =>
          item.partner_name?.toLocaleLowerCase()?.includes(e.target.value.toLocaleLowerCase()) ||
          item.structure_name?.toLocaleLowerCase()?.includes(e.target.value.toLocaleLowerCase()) ||
          item.role_as?.toLocaleLowerCase()?.includes(e.target.value.toLocaleLowerCase()) ||
          item.structure_role?.toLocaleLowerCase()?.includes(e.target.value.toLocaleLowerCase()) ||
          item.client_id?.toString()?.includes(e.target.value.toString()) ||
          item.structure_id?.toString()?.includes(e.target.value.toString())
      );
      setData(filterResult);
    }
    setFilterSearch(e.target.value);
  };

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
          setError('');
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
          getUsers();
        }, 1000);
      } else if (res.status === 500) {
        setError('La désactivation du Partenaire à eu une erreur !');
        console.log('Partenaire non désactiver');
        setTimeout(() => {
          setError('');
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
          getUsers();
        }, 1000);
      } else if (res.status === 404) {
        setError('Erreur dans la ré-activation du Partenaire !');
        console.log('Partenaire non activer');
        setTimeout(() => {
          setError('');
        }, 1000);
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="bg-white p-10 rounded-md w-11/12 mt-8">
      <div className=" items-center justify-between pb-2">
        <h2 className="hidden py-5 md:flex text-gray-600 font-semibold">Liste des Clubs</h2>
        <div className="lg:max-w-[548px] w-full mx-auto">
          <div className="relative">
            <svg className="absolute z-20 cursor-pointer top-[18px] left-4" width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M14.2716 13.1684L11.3313 10.2281C12.0391 9.28574 12.4213 8.13865 12.42 6.96C12.42 3.94938 9.97063 1.5 6.96 1.5C3.94938 1.5 1.5 3.94938 1.5 6.96C1.5 9.97063 3.94938 12.42 6.96 12.42C8.13865 12.4213 9.28574 12.0391 10.2281 11.3313L13.1684 14.2716C13.3173 14.4046 13.5114 14.4756 13.711 14.47C13.9105 14.4645 14.1004 14.3827 14.2415 14.2415C14.3827 14.1004 14.4645 13.9105 14.47 13.711C14.4756 13.5114 14.4046 13.3173 14.2716 13.1684ZM3.06 6.96C3.06 6.18865 3.28873 5.43463 3.71727 4.79328C4.14581 4.15192 4.7549 3.65205 5.46754 3.35687C6.18017 3.06169 6.96433 2.98446 7.72085 3.13494C8.47738 3.28542 9.17229 3.65686 9.71772 4.20228C10.2631 4.74771 10.6346 5.44262 10.7851 6.19915C10.9355 6.95567 10.8583 7.73983 10.5631 8.45247C10.268 9.1651 9.76808 9.77419 9.12673 10.2027C8.48537 10.6313 7.73135 10.86 6.96 10.86C5.92604 10.8588 4.93478 10.4475 4.20365 9.71635C3.47253 8.98522 3.06124 7.99396 3.06 6.96Z"
                fill="#4B5563"
              />
            </svg>
            <input
              className="relative text-sm leading-none text-gray-600 bg-gray-50  rounded  w-full px-10 py-4 outline-none"
              type="text"
              placeholder="Rechercher..."
              value={filtersearch}
              onChange={(e) => handleChangeSearch(e)}
            />
          </div>
        </div>
        <div className="text-sm py-5">
          <button onClick={() => setAddNewUserModal(true)} className=" md:flex p-2  mt-5  items-center justify-center bg-blue-500  rounded-md text-white font-semibold tracking-wide cursor-pointer">
            Ajouter un club
          </button>
          {addNewUser && <AddUser addUserModal={() => setAddNewUserModal(false)} />}
        </div>
        <div className="flex items-center justify-start">
          <p className="">Partenaires</p>
          <div className="w-12 h-6 ml-5 cursor-pointer rounded-full relative shadow-sm">
            <input
              type="checkbox"
              name="toggle"
              id="partenaires"
              checked={checkPartner}
              onChange={(e) => handleChangePartenaires(setCheckPartner(e.target.checked))}
              className="focus:outline-none checkbox right-0 checked:right-6 w-4 h-4 rounded-full bg-green-500 checked:bg-red-500 absolute m-1 shadow-sm appearance-none cursor-pointer"
            />
            <label htmlFor="partenaires" className="toggle-label block w-12 h-6 overflow-hidden rounded-full bg-gray-300  cursor-pointer" />
          </div>
          <p className="ml-5">Structures</p>
          <div className="flex w-12 h-6 ml-5 cursor-pointer rounded-full relative shadow-sm">
            <input
              type="checkbox"
              name="toggle"
              id="structures"
              checked={checkStructure}
              onChange={(e) => handleChangeStructures(setCheckStructure(e.target.checked))}
              className="focus:outline-none checkbox right-0 checked:right-6 checked:bg-red-500 w-4 h-4 rounded-full bg-green-500 absolute m-1 shadow-sm appearance-none cursor-pointer"
            />
            <label htmlFor="structures" className="toggle-label block w-12 h-6 overflow-hidden rounded-full bg-gray-300  cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        {success && <div className="mt-20 text-white bg-green-500 text-center h-10 px-40">{success}</div>}
        {error && <div className="mt-20 text-white bg-red-600 h-10 text-center">{error}</div>}
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="mt-10 text-center ">En cours de Chargement...</div>
              ) : (
                <Table className="mt-10 min-w-full">
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
                    {data.map((item, i) => {
                      return (
                        <Tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
                          <Td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <span className="font-semibold">{item.client_id || item.structure_id}</span>
                            </div>
                          </Td>
                          <Td className="py-3 px-6 text-left">
                            <div className="items-center w-16 h-16">
                              <span className="font-semibold ">
                                <img src={item.logo_url || item.structure_logo_url} alt="" className="rounded" />
                              </span>
                            </div>
                          </Td>
                          <Td className="py-3 px-6 text-left">
                            <div className="flex items-center ">
                              <span className="font-semibold text-[10px] sm:text-sm ">{item.partner_name || item.structure_name}</span>
                            </div>
                          </Td>
                          <Td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <span className="font-semibold text-[8px] sm:text-sm">{item.partner_email || item.structure_email}</span>
                            </div>
                          </Td>
                          <Td className="py-3 px-6 text-center">
                            <span
                              className={`${
                                item.active === 'activer' ? 'bg-green-500' : 'bg-rose-500' ? (item.structure_active === 'activer' ? 'bg-green-500' : 'bg-rose-500') : 'bg-gray-500'
                              } text-white font-semibold py-1 px-3 rounded-full text-xs`}
                            >
                              {item.active || item.structure_active}
                            </span>
                          </Td>

                          <Td className="py-3 px-6 text-center">
                            <span
                              className={`${
                                item.role_as === 'partenaire' ? 'bg-purple-500' : item.structure_role === 'structure' ? 'bg-yellow-400' : 'bg-gray-500'
                              }  text-white font-semibold py-1 px-3 rounded-full text-xs`}
                            >
                              {item.role_as || item.structure_role}
                            </span>
                          </Td>

                          <Td className="py-3 px-6 text-center">
                            <div className="flex items-center font-semibold justify-center text-[10px] sm:text-sm">
                              <span>{format(new Date(item.created_at), 'dd-MM-yyyy') || format(new Date(item.structure_created_at), 'dd-MM-yyyy')}</span>
                            </div>
                          </Td>
                          <Td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                              <button onClick={() => setViewModal(true)}>
                                <div className="w-6 mr-3 transform text-green-500 hover:scale-110 cursor-pointer">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                </div>
                              </button>

                              <button onClick={() => setId(item.structure_id || item.client_id) || setUpdateModal(true)}>
                                <div className="w-6 mr-3 transform text-purple-500 hover:scale-110 cursor-pointer">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </div>
                              </button>
                              {update && <Update updateModal={() => setUpdateModal(false)} />}
                              <div className="w-10 mr-3 transform hover:scale-110 cursor-pointer">
                                <button className="w-6" onClick={() => setId(item.structure_id || item.client_id) || setDisableModal(true)}>
                                  <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-Alert-interface-those-icons-lineal-those-icons.png" alt="" />
                                </button>
                              </div>
                              {disable && <Desactiver disableModal={() => setDisableModal(false)} userDisable={() => userDisable(id)} userActivate={() => userEnable(id)} />}
                              <button onClick={() => setModal(true)}>
                                <div className="w-6 mr-3 transform text-red-500 hover:scale-110 cursor-pointer">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </div>
                              </button>
                              {modal && <Delete deleteModal={() => setModal(false)} confirmDelete={() => confirmDeleteUser(id)} />}
                            </div>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              )}
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                <span className="text-xs xs:text-sm text-gray-900">Résultats de 1 à 4 sur 50 Entrées</span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">Prev</button>
                  &nbsp; &nbsp;
                  <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">Next</button>
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
