import { isStringModel } from "@/utils/functions";
import { Box, Button, Container, Typography } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import { IRepo, repository } from "../data/repository";

interface ISelected {
  step: number;
  item: number;
  model: string;
  arrayIndex: number;
}

const Way: FC = () => {
  const [step, setStep] = useState<number>(0);
  const [stepHistory, setStepHistory] = useState<number[]>([]);
  const [data, setData] = useState<IRepo>(repository[step]);
  const [selected, setSelected] = useState<ISelected[]>([]);
  const [allStep] = useState<number>(repository.length);

  useEffect(() => {}, [selected]);

  const replaceSelectedAtStep = (step: number, newSelected: ISelected) => {
    // Check if the selected array already has an item at the given step number
    const existingSelected = selected.find((s) => s.step === step);

    // If an item exists at the given step number, replace it
    if (existingSelected) {
      const index = selected.indexOf(existingSelected);
      selected[index] = newSelected;
    } else {
      // Otherwise, push the new item onto the array
      selected.push(newSelected);
    }

    // Sort the selected array by step number, to ensure the items are in order
    selected.sort((a, b) => a.step - b.step);
  };

  const handleItemClick = (
    step: number,
    itemIndex: number,
    itemModel: string,
    arrayIndex: number
  ) => {
    setStepHistory([...stepHistory, arrayIndex]);
    const newSelected = { step, item: itemIndex, model: itemModel, arrayIndex };
    replaceSelectedAtStep(step, newSelected);
    setStep(step);
  };

  const handleBackButton = () => {
    setStep((pervState) => (pervState < 1 ? (pervState = 0) : pervState - 1));
  };

  const isNextStepDisabled = selected.findIndex(
    (i) => i.model === selected[step - 1]?.model
  );

  useEffect(() => {
    setData(repository[step]);
    // console.log("🚀selected[step - 1]:", selected[step - 1]);
    console.log("🚀selected:", selected);
    // console.log("🚀selected Step:", selected[step]);
    // console.log("🚀isNextStepDisabled:", isNextStepDisabled);

    console.log(
      "🚀 ~ file: way.tsx:66 ~ useEffect ~ stepHistory:",
      stepHistory
    );
  }, [step, selected, isNextStepDisabled, stepHistory]);

  return (
    <Container>
      <Typography display={"block"}>{`all step :${allStep}`}</Typography>
      <Typography display={"block"}>{`now step :${step}`}</Typography>
      <Typography variant="h3" display={"block"}>
        {data?.title}
      </Typography>
      {data?.list.map((item, index) =>
        !Array.isArray(item.model) ? (
          <Box
            key={index}
            onClick={() =>
              handleItemClick(
                item.goStep ? item.goStep : step,
                index,
                item.model.toString(),
                selected.length
              )
            }
          >
            <Typography
              color={selected[step]?.model === item.model ? "red" : "black"}
              variant="h3"
              display={"block"}
            >
              {item.model}
            </Typography>
          </Box>
        ) : (
          item.id === selected[step - 1]?.item &&
          item.model.map((insideModel, index) => (
            <Box
              key={insideModel}
              onClick={() =>
                handleItemClick(
                  item.goStep ? item.goStep : step,
                  index,
                  insideModel,
                  selected.length
                )
              }
            >
              <Typography
                color={selected[step]?.model === insideModel ? "red" : "black"}
                variant="h3"
                display={"block"}
              >
                {insideModel}
              </Typography>
            </Box>
          ))
        )
      )}

      <Box py={3} minWidth={250} display="flex">
        <Button
          fullWidth
          //   onClick={() => handleItemClick()}
          variant="contained"
          //   disabled={isNextStepDisabled}
          sx={{ mr: 2 }}
        >
          {"بعدی"}
        </Button>
        <Button
          fullWidth
          onClick={() => handleBackButton()}
          variant="outlined"
          disabled={step === 0}
        >
          {"قبلی"}
        </Button>
      </Box>
    </Container>
  );
};

export default Way;
