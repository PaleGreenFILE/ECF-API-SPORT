import SideBarStructure from "../../components/SideBarStructure/SideBarStructure.js";

const DashboardStructure = () => {
  return (
    <div className="flex">
      <SideBarStructure />
      <div className="p-7">
        <div>Home Page</div>
      </div>
    </div>
  );
};

export default DashboardStructure;
