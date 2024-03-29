import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import {
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineMail,
} from "react-icons/ai";
import { BsCalendar2Check } from "react-icons/bs";
import { onLogout } from "./../../api/auth";
import { UserContext } from "./../../context/user.context";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const authCtx = useContext(UserContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const Menus = [
    { key: 1, title: "Dashboard", link: "/admin/dashboard" },
    {
      key: 2,
      title: "Planning",
      icon: <BsCalendar2Check />,
      link: "/admin/planning",
    },
    {
      key: 3,
      title: "Contact",
      icon: <AiOutlineMail />,
      link: "/admin/contact",
    },
    {
      key: 4,
      title: "Paramètre ",
      icon: <AiOutlineSetting />,
      link: "/admin/parametres",
    },
  ];

  const Menus2 = [
    { key: 1, title: "Dashboard", link: "/admin/dashboard" },
    {
      key: 2,
      title: "Planning",
      icon: (
        <BsCalendar2Check
          className={`md:flex bg-blue  
        ${open ? "flex" : "hidden"} relative duration-500`}
        />
      ),
      link: "/admin/planning",
    },
    {
      key: 3,
      title: "Contact",
      icon: (
        <AiOutlineMail
          className={`md:flex bg-blue  
        ${open ? "flex" : "hidden"} relative duration-500`}
        />
      ),
      link: "/admin/contact",
    },
    {
      key: 4,
      title: "Paramètre ",
      icon: (
        <AiOutlineSetting
          className={`md:flex bg-blue  
        ${open ? "flex" : "hidden"} relative duration-500`}
        />
      ),
      link: "/admin/parametres",
    },
  ];

  const handleLogout = async () => {
    try {
      await onLogout();
      authCtx.logout();
      navigate("/");
      console.log("Vous avez bien été déconnecter");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="md:flex hidden">
        <div
          className={`bg-blue-side  p-5 pt-7 
       ${open ? "w-56" : "w-20"} relative duration-500`}
        >
          <BsArrowLeftShort
            className={`bg-white text-blue-side text-2xl rounded-full absolute -right-3 top-9 border border-blue-side cursor-pointer 
          ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />

          <div className="flex">
            <img
              className={` h-10 bg-white block float-left mr-2 duration-500 rounded-md ${
                open && "rotate-[360deg]"
              }`}
              src="https://bit.ly/3FjaKmO"
              alt="logo"
            />
            <div
              className={` text-yellow-300 origin-left font-medium text-sm mt-2 ${
                !open && "scale-0"
              }`}
            >
              FitPark Fitness
            </div>
          </div>
          <div
            className={`text-white origin-left font-medium text-sm mt-5 ${
              !open && "scale-0"
            }`}
          >
            {isLoggedIn && (
              <>
                <h6 className="mt-2">Nom : {authCtx.currentUser}</h6>
                <h6 className="mt-2">Role : {authCtx.userRole}</h6>
              </>
            )}
          </div>
          <ul className="pt-20">
            {Menus.map((menus, key) => (
              <li
                onClick={() => navigate(menus.link)}
                key={key}
                className="text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:text-blue-600 hover:bg-yellow-300 rounded-md mt-12 duration-300"
              >
                <span className="text-2xl block float-left">
                  {menus.icon ? menus.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menus.title}
                </span>
              </li>
            ))}{" "}
            <div className="text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:text-blue-600 hover:bg-yellow-300 rounded-md mt-12 duration-300">
              <span className=" flex text-2xl  float-left">
                <span>
                  <AiOutlineLogout />
                </span>
                <button
                  onClick={handleLogout}
                  className={`text-base ml-3 font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  Se deconnecter
                </button>
              </span>
            </div>
          </ul>
        </div>
      </div>
      <div className="flex md:hidden">
        <div
          className={`bg-blue-side  p-0 pt-7 
       ${open ? "w-52" : "w-0"} relative duration-500`}
        >
          <BsArrowLeftShort
            className={`bg-white text-blue-side text-2xl rounded-full absolute -right-7 top-9 border border-blue-side cursor-pointer 
          ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex">
            <img
              className={` h-10 bg-white block float-left mr-2 ml-2 md:ml-0 duration-500 ${
                open && "rotate-[360deg]"
              }`}
              src="https://bit.ly/3FjaKmO"
              alt="logo"
            />
            <div
              className={` text-yellow-300 origin-left font-medium text-sm mt-2 ${
                !open && "scale-0"
              }`}
            >
              FitPark Fitness
            </div>
          </div>
          <div
            className={` text-white origin-left font-medium text-sm mt-5 ${
              !open && "scale-0"
            }`}
          >
            {isLoggedIn && (
              <>
                <h6 className="mt-2 ml-2">Nom : {authCtx.currentUser}</h6>
                <h6 className="mt-2 ml-2">Role : {authCtx.userRole}</h6>
              </>
            )}
          </div>
          <ul className="pt-20">
            {Menus2.map((menus, key) => (
              <li
                onClick={() => navigate(menus.link)}
                key={key}
                className="text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:text-blue-600 hover:bg-yellow-300 rounded-md mt-12 duration-300"
              >
                <span className="text-2xl block float-left">
                  {menus.icon ? (
                    menus.icon
                  ) : (
                    <RiDashboardFill
                      className={`md:flex bg-blue  
       ${open ? "flex" : "hidden"} relative duration-500`}
                    />
                  )}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menus.title}
                </span>
              </li>
            ))}{" "}
            <div className="text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:text-blue-600 hover:bg-yellow-300 rounded-md mt-12 duration-300">
              <span className=" flex text-2xl  float-left">
                <span>
                  <AiOutlineLogout
                    className={`bg-blue  
       ${open ? "flex" : "hidden"} relative duration-500`}
                  />
                </span>
                <button
                  onClick={handleLogout}
                  className={`text-base ml-3 font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  Se deconnecter
                </button>
              </span>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};
export default SideBar;
