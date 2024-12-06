import { useToast } from '@/hooks/use-toast'
import { GET_PLANNER, UPDATE_PLANNER_STATE } from '@/lib/ApolloStateManegment/queries'
import { cn, initialState, IPlannerState } from '@/lib/utils'
import { useMutation, useQuery } from '@apollo/client'
import { Destination } from '@Types/__generated__/resolvers-types'
import { FC, PropsWithChildren } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import * as XLSX from 'xlsx'
import DatePicker from '../atoms/DatePicker'
import Droppable from '../atoms/Droppable'
import SmallDestinationCard from '../atoms/SmallDestinationCard'
import { Button } from '../ui/button'

const emptyDestination: Destination = {
  id: '',
  title: '',
  image: '',
  region: '',
  country: '',
  categories: [],
  alt: '',
  description: '',
  longdescription: '',
  rating: 0,
}

const InputTimeLine = () => {
  const toast = useToast()
  const { data, refetch } = useQuery(GET_PLANNER)

  const planner = data.planner as IPlannerState

  const [updatePlanner] = useMutation(UPDATE_PLANNER_STATE)
  const { setValue, getValues, handleSubmit, control, reset } = useForm<IPlannerState>({
    defaultValues: {
      startDate: planner.startDate || new Date(),
      endDate: planner.endDate || new Date(new Date().setDate(new Date().getDate() + 1)),
      waypoints: planner.waypoints || [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'waypoints',
  })

  const onSubmit = async (data: IPlannerState) => {
    const workbook = XLSX.utils.book_new()
    const worksheetData = [
      ['Date', 'Place', 'Type', 'Country'],
      [data.startDate, '', 'Start', '', ''],
      ...(data.waypoints?.map((wp) => [
        wp.startDate,
        wp.destination?.title,
        wp.destination?.categories,
        wp.destination?.country,
      ]) || []),
      [data.endDate, '', 'End'],
    ]
    try {
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Form Data')

      // Export the workbook to a file and trigger download
      XLSX.writeFile(workbook, 'Plan.xlsx')
      await updatePlanner({
        variables: {
          newPlanner: initialState,
        },
      })
      reset()
      refetch()
    } catch {
      toast.toast({
        title: 'Error',
        description: 'Failed to export data',
        variant: 'destructive',
      })
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
      <TimeStamp>
        <h4 className="text-xl font-semibold">Start Date</h4>
        <DatePicker
          selected={getValues('startDate') || new Date()}
          onChange={(date) => {
            setValue('startDate', date)
            updatePlanner({
              variables: {
                newPlanner: {
                  ...planner,
                  startDate: date,
                },
              },
            })
          }}
        />
      </TimeStamp>
      <VerticalLine />
      <div className="w-full flex flex-col gap-2 justify-center items-center">
        <DatePicker
          selected={getValues('waypoints')?.[0]?.startDate || null}
          onChange={(date) => {
            const updatedWaypoints = planner.waypoints ? [...planner.waypoints] : []
            const prevDestination = updatedWaypoints[0]?.destination
            updatedWaypoints[0] = { startDate: date, destination: prevDestination ? prevDestination : emptyDestination }

            updatePlanner({
              variables: {
                newPlanner: {
                  ...planner,
                  waypoints: updatedWaypoints,
                },
              },
            })
          }}
        />
        <Droppable
          defaultValue={
            planner?.waypoints?.[0]?.destination?.title && (
              <SmallDestinationCard destination={planner?.waypoints?.[0]?.destination || null} />
            )
          }
          getItem={(item: Destination) => {
            const updatedWaypoints = planner.waypoints ? [...planner.waypoints] : []
            const prevDate = updatedWaypoints[0]?.startDate || new Date()
            updatedWaypoints[0] = { startDate: prevDate, destination: item }
            updatePlanner({
              variables: {
                newPlanner: {
                  ...planner,
                  waypoints: updatedWaypoints,
                },
              },
            })
          }}
        />
      </div>
      {fields
        .filter((_, index) => index !== 0)
        .map((field, index) => (
          <>
            <VerticalLine key={index + 1} />
            <div key={field.id} className="w-full flex flex-col gap-2 justify-center items-center">
              <DatePicker
                selected={getValues(`waypoints.${index}.startDate`) || null}
                onChange={(date) => {
                  const updatedWaypoints = planner.waypoints ? [...planner.waypoints] : []
                  if (updatedWaypoints[index]) {
                    const prevDestination = updatedWaypoints[index]?.destination
                    updatedWaypoints[index] = { startDate: date, destination: prevDestination }
                  } else {
                    updatedWaypoints.push({ startDate: date, destination: emptyDestination })
                  }

                  updatePlanner({
                    variables: {
                      newPlanner: {
                        ...planner,
                        waypoints: updatedWaypoints,
                      },
                    },
                  })
                }}
              />
              <Droppable
                defaultValue={
                  planner?.waypoints?.[index + 1]?.destination?.title && (
                    <SmallDestinationCard destination={planner?.waypoints?.[index + 1]?.destination || null} />
                  )
                }
                getItem={(item: Destination) => {
                  const updatedWaypoints = planner.waypoints ? [...planner.waypoints] : []
                  if (updatedWaypoints[index + 1]) {
                    const prevDate = updatedWaypoints[index + 1]?.startDate
                    updatedWaypoints[index + 1] = { startDate: prevDate, destination: item }
                  } else {
                    updatedWaypoints.push({ startDate: null, destination: item })
                  }

                  updatePlanner({
                    variables: {
                      newPlanner: {
                        ...planner,
                        waypoints: updatedWaypoints,
                      },
                    },
                  })
                }}
              />
            </div>
            <Button
              variant={'destructive'}
              className="my-2"
              onClick={(e) => {
                e.preventDefault()
                remove(index)
                updatePlanner({
                  variables: {
                    newPlanner: {
                      ...planner,
                      waypoints: planner.waypoints?.filter((_, i) => i !== index),
                    },
                  },
                })
              }}
            >
              Delete Waypoint
            </Button>
          </>
        ))}
      <VerticalLine />
      <Button
        onClick={(e) => {
          e.preventDefault()
          append({ destination: null, startDate: new Date() })
        }}
      >
        Add Waypoint
      </Button>
      <VerticalLine />
      <TimeStamp>
        <h4 className="text-xl font-semibold">End Date</h4>
        <DatePicker
          selected={getValues('endDate') || new Date()}
          onChange={(val) => {
            setValue('endDate', val)
            updatePlanner({
              variables: {
                newPlanner: {
                  ...planner,
                  endDate: val,
                },
              },
            })
          }}
        />
      </TimeStamp>

      <Button type="submit" className="my-6">
        Save Plan
      </Button>
    </form>
  )
}

const TimeStamp: FC<PropsWithChildren> = ({ children }) => <div className="flex items-center gap-1">{children}</div>

const VerticalLine = ({ className }: { className?: string }) => (
  <div className={cn('w-[1px] h-[150px] bg-muted-foreground my-2', className)} />
)

export default InputTimeLine
