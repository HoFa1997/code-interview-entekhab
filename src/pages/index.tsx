import {
  Box,
  Button,
  Card,
  Container,
  Step,
  StepConnector,
  stepConnectorClasses,
  StepLabel,
  styled,
  Typography
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { IRepo, repository } from '../data/repository'
import Stepper from '@mui/material/Stepper'
interface ISelected {
  id: number
  model: string
  step: number
  nextStep: number
}

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1
  }
}))

const Way: FC = () => {
  const [numbers, setNumbers] = useState([0])
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [data, setData] = useState<IRepo>(repository[currentStep])
  const [selected, setSelected] = useState<ISelected[]>([])
  const [allStep] = useState<number>(repository.length)

  const addNumber = () => setNumbers([...numbers, numbers[numbers.length - 1] + 1])

  const isNextStepDisabled = numbers.length - 1 === selected.length

  const replaceSelectedAtStep = (newSelected: ISelected) => {
    const existingSelectedModel = selected.find((i) => i.step === newSelected.step)
    if (existingSelectedModel) {
      const index = selected.indexOf(existingSelectedModel)
      const updatedSelected = [...selected]
      updatedSelected.splice(index, 1, newSelected)
      setSelected(updatedSelected)
    } else {
      const updatedSelected = [...selected, newSelected]
      setSelected(updatedSelected)
    }
  }

  const handleItemClick = (itemData: ISelected) => {
    replaceSelectedAtStep(itemData)
    setCurrentStep(itemData.nextStep)
    addNumber()
  }

  const handleBackButton = () => {
    if (numbers.length > 1) {
      const newNumbers = numbers.slice(0, -1)
      setNumbers(newNumbers)
      setCurrentStep(selected[newNumbers.length - 1].step)
    }
  }

  const handleNextButton = () => {
    if (selected[currentStep + 1]) {
      setCurrentStep(selected[currentStep].nextStep)
      addNumber()
    }
  }

  useEffect(() => {
    setData(repository[currentStep])
  }, [currentStep])

  return (
    <Container
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography display={'block'}>{`همه مراحل :${allStep}`}</Typography>
      <Typography display={'block'}>{`مرحله فعلی :${currentStep}`}</Typography>
      <Box py={5}>
        <Stepper alternativeLabel activeStep={currentStep} connector={<QontoConnector />}>
          {repository.map((i, inx) => (
            <Step key={inx}>
              <StepLabel>{i.title}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Typography variant="h3" display={'block'}>
        {data?.title}
      </Typography>
      <Box width={500}>
        {allStep !== currentStep ? (
          data?.list.map((item, index) =>
            !Array.isArray(item.model) ? (
              <Card
                sx={{
                  m: 2,
                  cursor: 'pointer',
                  ':hover': { bgcolor: 'silver' },
                  background: (t) =>
                    selected[numbers.length - 1]?.model === item.model ? t.palette.success.light : t.palette.grey[50]
                }}
                key={index}
                onClick={() =>
                  handleItemClick({
                    id: item.id,
                    model: item.model as string,
                    step: currentStep,
                    nextStep: item.goStep
                  })
                }
              >
                <Typography variant="h4" display={'block'}>
                  {item.model}
                </Typography>
              </Card>
            ) : (
              item.id === selected[currentStep - 1]?.id &&
              item.model.map((insideModel, index) => (
                <Card
                  sx={{
                    m: 2,
                    cursor: 'pointer',
                    ':hover': { bgcolor: 'silver' },
                    background: (t) =>
                      selected[currentStep]?.model === insideModel ? t.palette.success.light : t.palette.grey[50]
                  }}
                  key={insideModel}
                  onClick={() =>
                    handleItemClick({
                      id: item.id,
                      model: insideModel as string,
                      step: currentStep,
                      nextStep: item.goStep
                    })
                  }
                >
                  <Typography variant="h4" display={'block'}>
                    {insideModel}
                  </Typography>
                </Card>
              ))
            )
          )
        ) : (
          <>END</>
        )}
      </Box>

      <Box py={3} minWidth={250} display="flex">
        <Button
          fullWidth
          onClick={() => handleNextButton()}
          variant="contained"
          disabled={!selected[currentStep + 1] || isNextStepDisabled}
          sx={{ mr: 2 }}
        >
          {'بعدی'}
        </Button>
        <Button fullWidth onClick={() => handleBackButton()} variant="outlined" disabled={currentStep === 0}>
          {'قبلی'}
        </Button>
      </Box>
    </Container>
  )
}

export default Way
