import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  IntervalsContainer,
} from './styles'
import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getWeekDays } from '@ignite-call/utils/get-week-days'

const timeIntervalsFormSchema = z.object({})

type TimeIntervalsFormData = z.infer<typeof timeIntervalsFormSchema>

export default function TimeIntervalsPage() {
  const { register, control, handleSubmit, watch } = useForm({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        {
          weekDay: 0,
          startTime: '08:00',
          endTime: '18:00',
          enabled: false,
        },
        {
          weekDay: 1,
          startTime: '08:00',
          endTime: '18:00',
          enabled: true,
        },
        {
          weekDay: 2,
          startTime: '08:00',
          endTime: '18:00',
          enabled: true,
        },
        {
          weekDay: 3,
          startTime: '08:00',
          endTime: '18:00',
          enabled: true,
        },
        {
          weekDay: 4,
          startTime: '08:00',
          endTime: '18:00',
          enabled: true,
        },
        {
          weekDay: 5,
          startTime: '08:00',
          endTime: '18:00',
          enabled: true,
        },
        {
          weekDay: 6,
          startTime: '08:00',
          endTime: '18:00',
          enabled: false,
        },
      ],
    },
  })

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({ control, name: 'intervals' })

  const intervals = watch('intervals')

  async function handleSetTimeIntervals(data: TimeIntervalsFormData) {}
  return (
    <Container>
      <Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>
        <MultiStep size={4} currentStep={3} />
      </Header>
      <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalsContainer>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                          checked={field.value}
                        />
                      )
                    }}
                  />
                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput
                    size={'sm'}
                    type="time"
                    step={60}
                    {...register(`intervals.${index}.startTime`)}
                    disabled={!intervals[index].enabled}
                  />
                  <TextInput
                    size={'sm'}
                    type="time"
                    step={60}
                    {...register(`intervals.${index}.endTime`)}
                    disabled={!intervals[index].enabled}
                  />
                </IntervalInputs>
              </IntervalItem>
            )
          })}
        </IntervalsContainer>

        <Button type="submit">
          Próximo passo
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
