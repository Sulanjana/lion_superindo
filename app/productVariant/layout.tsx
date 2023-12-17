import Header from "../header";

const LayoutProductCategory = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header/>
      <div className="py-10 px-10">{children}</div>;
    </div>
  );
};

export default LayoutProductCategory;
