import Navbar from "../ui/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div id="MainLayout" className="flex flex-col h-screen">
      <div id="Navbar">
        <Navbar />
      </div>
      <main id="scrollable" className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
