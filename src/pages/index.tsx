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

  const allStep = repository.length;

  const nextStep = () => {
    setStep((pervState) => {
      if (pervState < allStep) return pervState + 1;
      return (pervState = pervState);
    });
  };

  const backStep = () => {
    setStep((pervState) => {
      return pervState < 1 ? (pervState = 0) : pervState - 1;
      // if (pervState > 1) return pervState - 1;
      // return (pervState = 0);
    });
  };

  const itemClicked = (item: ISelected) => {
    // setStep((pervState) => {
    //   if (pervState === allStep) return pervState;
    //   if (pervState <= allStep) return pervState + 1;
    //   return (pervState = pervState);
    // });
    setStep((ps) => ps + 1);
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
      {/* <Box
        bgcolor={"silver"}
        display={"flex"}
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
        minWidth={600}
      >
        <Typography display={"block"}>{`all step :${allStep}`}</Typography>
        <Typography display={"block"}>{`now step :${step}`}</Typography>

        {step < allStep ? (
          <Box>
            <Typography variant="h3" display={"block"}>
              {data?.title}
            </Typography>

            {data?.type === "string"
              ? data.list.map(
                  (item) =>
                    isStringModel(item.model) && (
                      <Fragment key={item.model}>
                        <Box
                          sx={{
                            bgcolor: "white",
                            textAlign: "center",
                            cursor: "pointer",
                            p: 1,
                            m: 1,
                            borderRadius: 2,
                          }}
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
                              select[step]?.selectedID === item.id
                                ? "red"
                                : "black"
                            }
                            display={"block"}
                          >
                            {item.model}
                          </Typography>
                        </Box>
                      </Fragment>
                    )
                )
              : data?.list
                  .find((i) => {
                    if (i?.id === select[step - 1]?.selectedID) {
                      return i;
                    }
                  })
                  // @ts-ignore
                  ?.model?.map((b, index) => (
                    <Box
                      sx={{
                        bgcolor: "white",
                        textAlign: "center",
                        cursor: "pointer",
                        p: 1,
                        m: 1,
                        borderRadius: 2,
                      }}
                      onClick={() =>
                        itemClicked({
                          step,
                          selectedID: index,
                          selectedValue: b,
                        })
                      }
                      key={b}
                    >
                      <Typography
                        color={
                          select[step]?.selectedID === index ? "red" : "black"
                        }
                        display={"block"}
                      >
                        {b}
                      </Typography>
                    </Box>
                  ))}
            <Box py={3} minWidth={250} display="flex">
              <Button
                fullWidth
                onClick={nextStep}
                variant="contained"
                disabled={!!repository[step]}
                sx={{ mr: 2 }}
              >
                {"بعدی"}
              </Button>
              <Button
                fullWidth
                onClick={backStep}
                variant="outlined"
                disabled={step === 0}
              >
                {"قبلی"}
              </Button>
            </Box>
          </Box>
        ) : (
          <Box minWidth={500} textAlign="center">
            <Typography variant="h3">پایان</Typography>
            <Button
              fullWidth
              onClick={backStep}
              variant="outlined"
              disabled={step === 0}
            >
              {"قبلی"}
            </Button>
          </Box>
        )}
      </Box> */}
    </Container>
  );
}
