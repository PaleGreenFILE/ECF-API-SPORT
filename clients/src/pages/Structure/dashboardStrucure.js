import SideBarStructure from "../../components/SidebarStructure/SideBarStructure";

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
