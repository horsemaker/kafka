import { useState, createContext, useContext } from "react";

const ExpandedSidebarContext = createContext();

const ExpandedSidebarProvider = ({ children }) => {
  const [showExpandedSidebar, setShowExpandedSidebar] = useState(false);

  const toggleShowExpandedSidebar = () =>
    setShowExpandedSidebar((showExpandedSidebar) => !showExpandedSidebar);

  return (
    <ExpandedSidebarContext.Provider
      value={{
        showExpandedSidebar,
        setShowExpandedSidebar,
        toggleShowExpandedSidebar,
      }}
    >
      {children}
    </ExpandedSidebarContext.Provider>
  );
};

const useExpandedSidebar = () => {
  const context = useContext(ExpandedSidebarContext);

  if (context === undefined) {
    throw new Error(
      "useExpandedSidebar must be used within a ExpandedSidebarProvider"
    );
  }

  return context;
};

export { ExpandedSidebarProvider, useExpandedSidebar };
