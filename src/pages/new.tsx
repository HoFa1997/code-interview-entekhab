import { repository } from "@/data/repository";
import React, { useEffect, useState } from "react";

const InsuranceRequest = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { title, type, list } = repository[currentStep];

  const handleOptionClick = (option: {
    id: number;
    model: string | string[];
  }) => {
    const newFormData = { ...formData, [option.id]: option };
    setFormData(newFormData);
    if (currentStep < repository.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderOptions = () => {
    // switch (type) {
    //   case "string":
    //     return list.map(({ id, model }) => (
    //       <div key={id} onClick={() => handleOptionClick({ id, model })}>
    //         {model}
    //       </div>
    //     ));
    //   case "array":
    //     return list[currentStep - 1].model.map((model, id) => (
    //       <div key={id} onClick={() => handleOptionClick({ id, model })}>
    //         {model}
    //       </div>
    //     ));
    //   default:
    //     return null;
    // }
  };

  return (
    <div>
      <h2>{title}</h2>
      {/* <div>{renderOptions()}</div> */}
    </div>
  );
};

export default InsuranceRequest;
