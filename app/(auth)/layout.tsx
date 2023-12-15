import React from "react";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="flex-center min-h-screen bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center">
      {children}
    </div>
  );
};

export default layout;
