import React from "react";

const CustomLabel = ({ htmlFor, children }) => {
  return (
    <label
      className="text-sm lg:text-xl w-full bg-headline-color rounded-lg text-primary-color border border-headline-color shadow-md py-1 lg:py-4 px-2 mb-2 lg:px-8 block hover:bg-primary hover:text-headline"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};

export default CustomLabel;
