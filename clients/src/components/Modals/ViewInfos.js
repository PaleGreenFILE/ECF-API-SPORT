import { useState, useEffect, useCallback } from "react";
import { getUsersById } from "../../api/auth";
import TableListStructure from "../TableList/TableListStructure";

const ViewInfos = ({ id, viewModal }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [infosUserName, setInfosUserName] = useState("");
  const [newsLetters, setCheckPermNews] = useState(false);
  const [drinks, setCheckPermDrink] = useState(false);
  const [vetements, setCheckPermVet] = useState(false);
  const [equipement, setCheckPermEquipment] = useState(false);

  const getUserInfos = useCallback(async () => {
    try {
      const user = await getUsersById(id);
      setData(user.data);
      setInfosUserName(user.data[0].partner_name);
      // PERSIST DATA TOGGLE PERMISSIONS
      setCheckPermVet(
        user.data[0].sell_vêtements_partner ||
          user.data[0].sell_vêtements ||
          false
      );
      setCheckPermNews(
        user.data[0].sell_newsletter_partner ||
          user.data[0].sell_newsletter ||
          false
      );

      setCheckPermDrink(
        user.data[0].sell_boissons_partner ||
          user.data[0].sell_boissons ||
          false
      );
      setCheckPermEquipment(
        user.data[0].sell_équipements_partner ||
          user.data[0].sell_équipements ||
          false
      );
    } catch (err) {
      setError("Impossible de récuperer les Informations demandés !");
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [id]);

  

  useEffect(() => {
    getUserInfos();
  }, [getUserInfos]);
  return (
    <div className="z-40 flex fixed justify-center inset-0">
      <div
        onClick={() => viewModal(false)}
        className="w-full h-[4592px] md:h-[1492px] xl:h-[1300px] 2xl:h-[1500px] bg-gray-900 opacity-80 z-0 absolute"
      />
      <div className="mx-auto h-full w-full px-2 shadow-xl">
        <div className="flex items-center justify-center h-full">
          {data.map((item, i) => {
            return (
              <div
                key={i}
                className="bg-white rounded-md shadow z-50 overflow-x-auto w-full h-full mt-20 md:w-8/10 lg:max-w-7xl md:h-full relative"
              >
                <div className="bg-gray-100 shadow-lg rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-2 flex items-center justify-between">
                  {infosUserName ? (
                    <div className="flex items-center">
                      <img
                        src="https://d1fmx1rbmqrxrr.cloudfront.net/cnet/i/edit/2022/09/avatar%20news%20D23%20big.jpg"
                        alt="logo"
                        className="items-start justify-start float-left w-16 h-10"
                      />
                      <p className="text-sm font-semibold text-center items-center justify-center mx-2 w-full">
                        Partenaire : {item.partner_name}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <img
                        src="https://d1fmx1rbmqrxrr.cloudfront.net/cnet/i/edit/2022/09/avatar%20news%20D23%20big.jpg"
                        alt="logo"
                        className="items-start justify-start float-left w-16 h-10"
                      />
                      <p className="text-sm font-semibold text-center items-center justify-center mx-2">
                        Structure : {item.structure_name}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => viewModal(false)}
                    className="focus:outline-none"
                  >
                    <svg
                      width={28}
                      height={28}
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 7L7 21"
                        stroke="#A1A1AA"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 7L21 21"
                        stroke="#A1A1AA"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                {error ? (
                  <div className="flex bg-red-300 text-gray-800 text-semibold items-center justify-between mt-5">
                    <p className="ml-20 md:ml-52 text-sm text-center justify-center items-center">
                      {error}
                    </p>
                  </div>
                ) : null}
                <div className="items-center mt-4 md:mt-8 space-x-5">
                  <div className="flex flex-col justify-start items-start md:mr-16">
                    <h3 className="text-gray-800 mx-5 text-sm font-bold leading-tight tracking-normal">
                      Email :
                      <span className="text-sm mx-2 font-thin items-center text-center justify-center">
                        {item.partner_email || item.structure_email}
                      </span>
                    </h3>
                  </div>

                  <div className="items-center">
                    <div className="flex flex-col justify-start items-start">
                      <h3 className="text-gray-800  text-sm font-bold leading-tight tracking-normal">
                        Adresse:
                        <span className="text-sm mx-2 font-thin items-center text-center justify-center">
                          {item.adresse || item.adresse_structure}
                        </span>
                      </h3>
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <h3 className="text-gray-800  text-sm font-bold leading-tight tracking-normal">
                        Code Postal:
                        <span className="text-sm mx-2 font-thin items-center text-center justify-center">
                          {item.code_postal || item.codepostal_structure}
                        </span>
                      </h3>
                    </div>
                  </div>
                  <div className="items-center">
                    <div className="flex flex-col justify-start items-start">
                      <h3 className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2">
                        Ville :
                        <span className="text-sm mx-2 font-thin items-center text-center justify-center">
                          {item.ville || item.ville_partner}
                        </span>
                      </h3>
                    </div>
                    <div className="flex-col justify-start items-start py-2">
                      <h3 className="text-gray-800  text-sm font-bold leading-tight tracking-normal mb-2">
                        Petite Description :
                      </h3>
                      <textarea
                        type="text"
                        name="full_desc"
                        className="py-2 pl-3 text-sm overflow-hidden h-10 border rounded border-gray-200 w-72 md:w-1/2  resize-none focus:outline-none"
                        value={item.short_desc || item.structure_short_desc}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-start items-start">
                    <div className="flex flex-col justify-start items-start w-1/2">
                      <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2">
                        Longue Description :
                      </label>
                      <textarea
                        type="text"
                        name="full_desc"
                        className="py-3 pl-3 text-sm overflow-y-auto h-24 border rounded border-gray-200 w-72 md:w-full resize-none focus:outline-none"
                        value={item.full_desc || item.structure_full_desc}
                        disabled
                      />
                    </div>
                    <div className="flex flex-col justify-start items-start md:py-2 py-5 mx-1 md:px-10">
                      <label className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2">
                        Permissions:
                      </label>
                      <div className="flex items-center justify-start">
                        <p className="">Newsletters</p>
                        <div className="w-12 h-6 mx-2 cursor-pointer rounded-full relative shadow-sm">
                          <input
                            type="checkbox"
                            name="sell_newsletter"
                            defaultChecked={newsLetters}
                            disabled
                            className="focus:outline-none checkbox right-6 checked:right-0 checked:bg-green-500 w-4 h-4 rounded-full bg-red-500 absolute m-1 shadow-sm appearance-none cursor-pointer"
                          />
                          <label className="toggle-label block w-12 h-6 overflow-hidden rounded-full bg-gray-300  cursor-pointer" />
                        </div>
                        <p className="ml-5">Boissons</p>
                        <div className="flex w-12 h-6 mx-12 cursor-pointer rounded-full relative shadow-sm">
                          <input
                            type="checkbox"
                            name="sell_boissons"
                            defaultChecked={drinks}
                            disabled
                            className="focus:outline-none checkbox right-6 checked:right-0 checked:bg-green-500 w-4 h-4 rounded-full bg-red-500 absolute m-1 shadow-sm appearance-none cursor-pointer"
                          />
                          <label className="toggle-label block w-12 h-6 overflow-hidden rounded-full bg-gray-300  cursor-pointer" />
                        </div>
                      </div>
                      <div className="flex items-center justify-start mt-5">
                        <p className="">Vêtements</p>
                        <div className="w-12 h-6 mx-3 cursor-pointer rounded-full relative shadow-sm">
                          <input
                            type="checkbox"
                            name="sell_vêtements"
                            defaultChecked={vetements}
                            disabled
                            className="focus:outline-none right-6 checked bg-red-500 checked:bg-green-500 checked:right-0 checkbox w-4 h-4 rounded-full absolute m-1 shadow-sm appearance-none cursor-pointer"
                          />
                          <label className="toggle-label block w-12 h-6 overflow-hidden rounded-full bg-gray-300  cursor-pointer" />
                        </div>
                        <p className="ml-4">Equipements</p>
                        <div className="flex w-12 h-6 mx-4 cursor-pointer rounded-full relative shadow-sm">
                          <input
                            type="checkbox"
                            name="sell_équipements"
                            defaultChecked={equipement}
                            disabled
                            className="focus:outline-none checkbox right-6 checked:right-0 checked:bg-green-500 w-4 h-4 rounded-full bg-red-500 absolute m-1 shadow-sm appearance-none cursor-pointer"
                          />
                          <label className="toggle-label block w-12 h-6 overflow-hidden rounded-full bg-gray-300  cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <TableListStructure idPartner={id} />
                <div className="flex items-end justify-end mx-5">
                  <button
                    onClick={() => viewModal(false)}
                    className="px-10 py-3 mt-5 items-end justify-end  bg-green-400 hover:bg-green-500 shadow rounded text-sm text-white"
                  >
                    OK
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewInfos;
