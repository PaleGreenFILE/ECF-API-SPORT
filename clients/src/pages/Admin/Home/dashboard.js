import SideBar from './../../../components/Sidebar/SideBar';
import TableList from '../../../components/TableList/TableList.js';

const Dashboard = () => {
  return (
    <div className="flex">
      <SideBar />
      <TableList />
    </div>
  );
};

export default Dashboard;
