import { isStringModel } from "@/utils/functions";
import { Box, Button, Container, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { IRepo, repository } from "../data/repository";

export default function Home() {
  type ISelected = { step: number; selectedID: number; selectedValue: string };
  const [step, setStep] = useState<number>(0);
  const [data, setData] = useState<IRepo>(repository[step]);
  const [select, setSelect] = useState<ISelected[]>([]);

  useEffect(() => {
    setData(repository[step]);
  }, [step, select]);

  const allStep = repository.length - 1;

  const nextStep = () => {
    setStep((pervState) => {
      if (pervState < allStep) return pervState + 1;
      return (pervState = pervState);
    });
  };
  const backStep = () => {
    setStep((pervState) => {
      if (pervState > 1) return pervState - 1;
      return (pervState = 0);
    });
  };

  const itemClicked = (item: ISelected) => {
    setStep((pervState) => {
      if (pervState === allStep) return pervState;
      if (pervState <= allStep) return pervState + 1;
      return (pervState = pervState);
    });
    console.log(select[step]);

    if (!select[step]) {
      setSelect((pervState) => {
        return pervState ? [...pervState, item] : [item];
      });
    } else {
      select.splice(step, 1, item);
      setSelect(select);
    }
  };
  return (
    <Container disableGutters>
      <Box
        bgcolor={"silver"}
        display={"flex"}
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
        minWidth={600}
      >
        <Typography display={"block"}>{`all step :${allStep}`}</Typography>
        <Typography display={"block"}>{`now step :${step}`}</Typography>

        <Box>
          {data.title}
          {data.type === "string" &&
            data.list.map(
              (item) =>
                isStringModel(item.model) && (
                  <Fragment key={item.model}>
                    <Box
                      onClick={() =>
                        isStringModel(item.model) &&
                        itemClicked({
                          step,
                          selectedID: item.id,
                          selectedValue: item.model,
                        })
                      }
                    >
                      <Typography
                        color={
                          select[step]?.selectedID === item.id ? "red" : "black"
                        }
                        display={"block"}
                      >
                        {item.model}
                      </Typography>
                    </Box>
                  </Fragment>
                )
            )}
        </Box>

        {data.list
          .find((i) => {
            if (i?.id === select[step - 1]?.selectedID) {
              return i;
            }
          })
          // @ts-ignore
          ?.model?.map((b, index) => (
            <Box
              onClick={() =>
                itemClicked({ step, selectedID: index, selectedValue: b })
              }
              key={b}
            >
              <Typography
                color={select[step]?.selectedID === index ? "red" : "black"}
                display={"block"}
              >
                {b}
              </Typography>
            </Box>
          ))}

        <Button onClick={nextStep} variant="contained" disabled={false}>
          {"بعدی"}
        </Button>
        <Button onClick={backStep} variant="outlined">
          {"قبلی"}
        </Button>
      </Box>
    </Container>
  );
}
