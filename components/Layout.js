import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-200 overflow-x-hidden">
      <NavBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
