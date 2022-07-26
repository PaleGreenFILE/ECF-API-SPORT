import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeftShort, BsCalendar2Check } from 'react-icons/bs';
import { RiDashboardFill } from 'react-icons/ri';
import { AiOutlineSetting, AiOutlineLogout, AiOutlineMail } from 'react-icons/ai';
import { onLogout } from '../../api/auth';

const SideBarStructure = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const Menus = [
    { key: 20, title: 'Dashboard', link: '/structure/dashboard' },
    { key: 3, title: 'Contact', icon: <AiOutlineMail />, link: '/structure/contact' },
    {
      key: 2,
      title: 'Planning',
      icon: <BsCalendar2Check />,
      link: '/structure/planning',
    },
    {
      key: 22,
      title: 'Settings',
      icon: <AiOutlineSetting />,
      link: '/structure/parametres',
    },
  ];
  const handleLogout = async () => {
    try {
      await onLogout();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex">
      <div
        className={`bg-blue-side h-screen p-5 pt-7 
       ${open ? 'w-56' : 'w-20'} relative duration-500`}
      >
        <BsArrowLeftShort
          className={`bg-white text-blue-side text-2xl rounded-full absolute -right-3 top-9 border border-blue-side cursor-pointer 
          ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex">
          <img className={` h-10 bg-white block float-left mr-2 duration-500 ${open && 'rotate-[360deg]'}`} src="https://bit.ly/3IUtNVM" alt="logo" />
          <div className={` text-yellow-300 origin-left font-medium text-sm mt-2 ${!open && 'scale-0'}`}>FitPark Fitness</div>
        </div>
        <ul className="pt-20">
          {Menus.map((menus, key) => (
            <li
              onClick={() => navigate(menus.link)}
              key={key}
              className="text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:text-blue-600 hover:bg-yellow-300 rounded-md mt-12 duration-300"
            >
              <span className="text-2xl block float-left">{menus.icon ? menus.icon : <RiDashboardFill />}</span>
              <span className={`text-base font-medium flex-1 duration-200 ${!open && 'hidden'}`}>{menus.title}</span>
            </li>
          ))}
          <div className="text-gray-100 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:text-blue-600 hover:bg-yellow-300 rounded-md mt-12 duration-300">
            <span className=" flex text-2xl  float-left">
              <span>
                <AiOutlineLogout />
              </span>
              <button onClick={handleLogout} className={`text-base ml-3 font-medium flex-1 duration-200 ${!open && 'hidden'}`}>
                Se deconnecter
              </button>
            </span>
          </div>
        </ul>
      </div>
    </div>
  );
};
export default SideBarStructure;
