import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX_VALIDATION } from "../../lib/lib";
import emailjs from "@emailjs/browser";
import { getUsersById, updateUser } from "./../../api/auth";

const Update = ({ updateModal, id, refreshUser }) => {
  const [loading, setLoading] = useState("");
  const [succes, setSucces] = useState("");
  const [emailSucces, setsuccesEmail] = useState("");
  const [error, setError] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [newsLetters, setCheckPermNews] = useState(false);
  const [drinks, setCheckPermDrink] = useState(false);
  const [vetements, setCheckPermVet] = useState(false);
  const [equipement, setCheckPermEquipment] = useState(false);
  const [idUser, setId] = useState([]);

  const form = useRef();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const cancelButtonRef = useRef(null);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateUser(idUser, data).then((res) => {
        if (res.status === 200) {
          emailjs
            .sendForm(
              "service_1bqo3e6",
              "template_u4bfv46",
              form.current,
              "jUhrdIPj2FJVSlQP_"
            )
            .then(() => {
              setSucces("Bravo vous avez reussi la modification");
              setsuccesEmail("Un email de confirmation à été envoyer");
              setTimeout(() => {
                setError("");
                setLoading(false);
                setsuccesEmail("");
                setErrorEmail("");
                setSucces("");
                updateModal(false);
                refreshUser();
              }, 3000);
            });
        }
      });
    } catch (err) {
      setError("Erreur lors de l'inscription.");
      setErrorEmail("Email non envoyé ! Veuillez recommencer !");
      //console.log(err.res.data.message);
      console.log(
        "Erreur lors de l'inscription. Email non envoyé ! Veuillez recommencer ! "
      );
      setLoading(false);
      setTimeout(() => {
        setError(false);
        setErrorEmail(false);
      }, 4000);
    }
  };

  const updateData = async () => {
    try {
      const res = await getUsersById(id);
      setId(res.data[0].client_id || res.data[0].structure_id);
      // PERSIST DATA TOGGLE PERMISSIONS
      setCheckPermVet(
        res.data[0].sell_vêtements_partner ||
          res.data[0].sell_vêtements ||
          false
      );
      setCheckPermNews(
        res.data[0].sell_newsletter_partner ||
          res.data[0].sell_newsletter ||
          false
      );

      setCheckPermDrink(
        res.data[0].sell_boissons_partner || res.data[0].sell_boissons || false
      );
      setCheckPermEquipment(
        res.data[0].sell_équipements_partner ||
          res.data[0].sell_équipements ||
          false
      );

      //  SET USER PERMISSIONS
      setValue(
        "sell_newsletter",
        res.data[0].sell_newsletter_partner ||
          res.data[0].sell_newsletter ||
          false
      );
      setValue(
        "sell_boissons",
        res.data[0].sell_boissons_partner || res.data[0].sell_boissons || false
      );
      setValue(
        "sell_vêtements",
        res.data[0].sell_vêtements_partner ||
          res.data[0].sell_vêtements ||
          false
      );
      setValue(
        "sell_équipements",
        res.data[0].sell_équipements_partner ||
          res.data[0].sell_équipements ||
          false
      );

      // SET USER DATA INFO
      setValue("name", res.data[0].partner_name || res.data[0].structure_name);
      setValue(
        "email",
        res.data[0].partner_email || res.data[0].structure_email
      );
      setValue("adresse", res.data[0].adresse || res.data[0].adresse_structure);
      setValue(
        "postalCode",
        res.data[0].code_postal || res.data[0].codepostal_structure
      );
      setValue("ville", res.data[0].ville_partner || res.data[0].ville);
      setValue(
        "logo_url",
        res.data[0].logo_url || res.data[0].structure_logo_url
      );
      setValue(
        "short_desc",
        res.data[0].short_desc || res.data[0].structure_short_desc
      );
      setValue(
        "full_desc",
        res.data[0].full_desc || res.data[0].structure_full_desc
      );
    } catch (err) {
      setError("Erreur, impossible de recupèrer les information demandé !");
    }
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <>
      <div
        id="popup"
        className="z-40 w-full flex absolute justify-center inset-0"
      >
        <div
          onClick={() => updateModal(false)}
          ref={cancelButtonRef}
          className="w-full h-[3800px] md:h-[1295px] lg:h-full xl:h-[1300px] bg-gray-900 opacity-80 z-0 absolute"
        />
        <div className="mx-auto container">
          <div className="flex items-center justify-center h-[1230px] md:h-[930px] lg:h-[930px] xl:h-[930px] w-full">
            <div className="bg-white rounded-md shadow z-50 overflow-x-auto h-full mt-40 md:w-8/10 lg:max-w-7xl md:h-full relative">
              <div className="bg-gray-100 rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between">
                <p className="text-base font-semibold">
                  Modifier un Utilisateur
                </p>
                <button
                  onClick={() => updateModal(false)}
                  ref={cancelButtonRef}
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
              <div className="px-4 md:px-20 md:pb-4">
                <div className="flex bg-green-300 text-gray-800 text-semibold items-center justify-between mt-7">
                  <p className="ml-11 md:ml-40 text-sm text-center justify-center items-center">
                    {succes}
                  </p>
                </div>
                <div className="flex bg-green-300 text-gray-800 text-semibold items-center ">
                  <p className="ml-10 md:ml-40 text-sm text-center justify-center items-center">
                    {emailSucces}
                  </p>
                </div>
                <div className="flex bg-red-300 text-gray-800 text-semibold items-center justify-between mt-5">
                  <p className="ml-20 md:ml-52 text-sm text-center justify-center items-center">
                    {error}
                  </p>
                </div>
                <div className="flex bg-red-300 text-gray-800 text-semibold items-center justify-between">
                  <p className="ml-20 md:ml-40 text-sm text-center justify-center items-center">
                    {errorEmail}
                  </p>
                </div>
              </div>
              <div className="px-4 md:px-10 pt-5 md:pt-0 md:pb-4 pb-7">
                <form onSubmit={handleSubmit(onSubmit)} ref={form}>
                  <div className="md:flex md:space-x-5 items-center ">
                    <div className="flex flex-col  justify-start items-start  md:mr-16">
                      <label
                        htmlFor="name"
                        className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2"
                      >
                        Nom :<span className="text-red-600 ml-2">*</span>
                      </label>
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        name="name"
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-72 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                        placeholder="Nom"
                      />
                      {errors.name && (
                        <span className="text-sm text-red-500 mr-28">
                          Veuillez rentrer un nom !
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col justify-start items-start  md:py-0 py-4">
                      <label
                        htmlFor="email"
                        className="text-gray-800  text-sm font-bold leading-tight tracking-normal mb-2"
                      >
                        Email :<span className="text-red-600 ml-2">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute text-white flex items-center px-2 border-r  h-full bg-indigo-700 rounded-l cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-mail"
                            width={18}
                            height={18}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <rect x={3} y={5} width={18} height={14} rx={2} />
                            <polyline points="3 7 12 13 21 7" />
                          </svg>
                        </div>
                        <div className="w-72">
                          <input
                            {...register("email", {
                              required: true,
                              pattern: EMAIL_REGEX_VALIDATION,
                            })}
                            type="email"
                            name="email"
                            className="text-gray-600  focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-full h-10 flex items-center pl-10 text-sm border-gray-300 rounded border shadow"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                      {errors.email && (
                        <span className="text-sm text-red-500 mr-20">
                          Veuillez rentrer un email valide !
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="md:flex md:space-x-5 items-center md:mt-8">
                    <div className="flex flex-col justify-start items-start  md:mr-16">
                      <label
                        htmlFor="Adresse"
                        className="text-gray-800  text-sm font-bold leading-tight tracking-normal mb-2"
                      >
                        Adresse: <span className="text-red-600 ml-2">*</span>
                      </label>
                      <input
                        {...register("adresse", { required: true })}
                        type="text"
                        name="adresse"
                        className="text-gray-600  focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-72 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                        placeholder="Adresse"
                      />
                      {errors.adresse && (
                        <span className="text-sm text-red-500 w-66">
                          Merci de rentrer une adresse correcte.
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col justify-start items-start  mt-5 md:mr-16">
                      <label
                        htmlFor="postal"
                        className="text-gray-800  text-sm font-bold leading-tight tracking-normal mb-2"
                      >
                        Code Postal:{" "}
                        <span className="text-red-600 ml-2">*</span>
                      </label>
                      <input
                        {...register("postalCode", { required: true })}
                        type="number"
                        name="postalCode"
                        className="text-gray-600  focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-72 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                        placeholder="Code Postal"
                      />
                      {errors.postalCode && (
                        <span className="text-sm text-red-500 w-60">
                          Merci de rentrer un Code Postal.
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="md:flex md:space-x-5 mt-5 items-center md:mt-7">
                    <div className="flex flex-col justify-start items-start  md:mr-16">
                      <label
                        htmlFor="ville"
                        className="text-gray-800   text-sm font-bold leading-tight tracking-normal mb-2"
                      >
                        Ville :<span className="text-red-600 ml-2">*</span>
                      </label>
                      <input
                        {...register("ville", { required: true })}
                        type="text"
                        name="ville"
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700  bg-white font-normal w-72 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                        placeholder="ville..."
                      />
                      {errors.ville && (
                        <span className="text-sm text-red-500 mr-28">
                          Veuillez rentrer une Ville !
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col justify-start items-start  md:py-0 py-4 ">
                      <label
                        htmlFor="short_desc"
                        className="text-gray-800  text-sm font-bold leading-tight tracking-normal mb-2"
                      >
                        Petite Description :
                      </label>
                      <input
                        {...register("short_desc")}
                        type="text"
                        name="short_desc"
                        className="text-gray-600  focus:outline-none focus:border focus:border-indigo-700  bg-white font-normal w-72 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                        placeholder="Petite Description..."
                      />
                    </div>
                  </div>
                  <div className="md:flex md:space-x-5 items-center md:">
                    <div className="flex flex-col md:mt-5  justify-start items-start  md:py-0 py-4 ">
                      <label
                        htmlFor="logo_url"
                        className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2"
                      >
                        Logo Url :
                      </label>
                      <input
                        {...register("logo_url")}
                        type="text"
                        name="logo_url"
                        className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700  bg-white font-normal w-72 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                        placeholder="Logo Url"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col  justify-start items-start mt-5 md:py-0 py-4 ">
                    <label
                      htmlFor="email"
                      className="text-gray-800 text-sm  font-bold leading-tight tracking-normal mb-2"
                    >
                      Permissions:
                    </label>
                    <div className="flex items-center mt-10 justify-start">
                      <p className="">Newsletters</p>
                      <div className="w-12 h-6 ml-5 cursor-pointer rounded-full relative shadow-sm">
                        <input
                          type="checkbox"
                          {...register("sell_newsletter")}
                          name="sell_newsletter"
                          id="Newsletters"
                          checked={newsLetters}
                          onChange={() => setCheckPermNews(!newsLetters)}
                          className="focus:outline-none checkbox right-6 checked:right-0 checked:bg-green-500 w-4 h-4 rounded-full bg-red-500 absolute m-1 shadow-sm appearance-none cursor-pointer"
                        />
                        <label
                          htmlFor="Newsletters"
                          className="toggle-label block w-12 h-6 overflow-hidden rounded-full bg-gray-300  cursor-pointer"
                        />
                      </div>
                      <p className="ml-5">Boissons</p>
                      <div className="flex w-12 h-6 ml-12 cursor-pointer rounded-full relative shadow-sm">
                        <input
                          type="checkbox"
                          {...register("sell_boissons")}
                          name="sell_boissons"
                          id="drinks"
                          checked={drinks}
                          onChange={() => setCheckPermDrink(!drinks)}
                          className="focus:outline-none checkbox right-6 checked:right-0 checked:bg-green-500 w-4 h-4 rounded-full bg-red-500 absolute m-1 shadow-sm appearance-none cursor-pointer"
                        />
                        <label
                          htmlFor="drinks"
                          className="toggle-label block w-12 h-6 overflow-hidden rounded-full bg-gray-300  cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-start mt-5">
                      <p className="">Vêtements</p>
                      <div className="w-12 h-6 ml-6 cursor-pointer rounded-full relative shadow-sm">
                        <input
                          type="checkbox"
                          {...register("sell_vêtements")}
                          name="sell_vêtements"
                          id="Vêtements"
                          checked={vetements}
                          onChange={() => setCheckPermVet(!vetements)}
                          className="focus:outline-none right-6 checked bg-red-500 checked:bg-green-500 checked:right-0 checkbox w-4 h-4 rounded-full absolute m-1 shadow-sm appearance-none cursor-pointer"
                        />
                        <label
                          htmlFor="Vêtements"
                          className="toggle-label block w-12 h-6 overflow-hidden rounded-full bg-gray-300  cursor-pointer"
                        />
                      </div>
                      <p className="ml-5">Equipements</p>
                      <div className="flex w-12 h-6 ml-4 cursor-pointer rounded-full relative shadow-sm">
                        <input
                          type="checkbox"
                          {...register("sell_équipements")}
                          name="sell_équipements"
                          id="equipements"
                          checked={equipement}
                          onChange={() => setCheckPermEquipment(!equipement)}
                          className="focus:outline-none checkbox right-6 checked:right-0 checked:bg-green-500 w-4 h-4 rounded-full bg-red-500 absolute m-1 shadow-sm appearance-none cursor-pointer"
                        />
                        <label
                          htmlFor="equipements"
                          className="toggle-label block w-12 h-6 overflow-hidden rounded-full bg-gray-300  cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt- flex flex-col mt-5 justify-start items-start  md:mr-16">
                    <label
                      htmlFor="full_desc"
                      className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2"
                    >
                      Longue Description :
                    </label>
                    <textarea
                      {...register("full_desc")}
                      type="text"
                      name="full_desc"
                      placeholder="Longue Description..."
                      className="py-3 pl-3 overflow-y-auto h-24 border rounded border-gray-200 w-72 md:w-full 2xl:w-full resize-none focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-9">
                    <button
                      onClick={() => updateModal(false)}
                      ref={cancelButtonRef}
                      className="px-6 py-3 bg-gray-400 hover:bg-gray-500 shadow rounded text-sm text-white"
                    >
                      Annuler
                    </button>
                    <div className="flex items-center justify-between">
                      {loading ? (
                        <button
                          type="button"
                          className="text-white justify-center ml-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center"
                        >
                          <svg
                            aria-hidden="true"
                            role="status"
                            className="inline mr-3 w-4 h-4 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            ></path>
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                          En attente...
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="text-white justify-center ml-20  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-8 py-2.5 text-center mr-2  inline-flex items-center"
                        >
                          Confirmer
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
