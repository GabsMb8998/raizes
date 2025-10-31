"use client"
import "@/lib/polyfills"
import { useEffect, useState } from "react"
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react"
import { createViewWeek } from "@schedule-x/calendar"
import "@schedule-x/theme-default/dist/calendar.css"
import { Temporal } from "@js-temporal/polyfill"
import useAgendamentoStore, { AgendamentoResponse } from "@/store/useAgendamentoStore"

interface CalendarioProps {
  agendamentosData: AgendamentoResponse[]
}

const Calendar = ({agendamentosData}: CalendarioProps) => {



  const today = Temporal.Now.plainDateISO()
  const [selectedDate, setSelectedDate] = useState(today)

  
  const events = agendamentosData?.map((ag)=> {
    const start = Temporal.ZonedDateTime.from(`${ag.dataHora}+00:00[UTC]`)
    const end = start.add({ hours: ag.modelo.duracaoHoras})
    
    return {
      id: ag.id.toString(),
      title: `${ag.modelo.nome} - ${ag.usuario}`,
      start: start,
      end: end,
    }
  })

  useEffect(()=>{
    console.log("events: ",events)
    console.log("agendamentos: ",agendamentosData)
  }, [events])



  const createCalendar = (date: Temporal.PlainDate) =>
    useCalendarApp({
      views: [createViewWeek()],
      events,
      // events: [
      //   {
      //     id: "1",
      //     title: "My new event",
      //     start: Temporal.ZonedDateTime.from("2025-10-31T09:00:00+00:00[UTC]"),
      //     end: Temporal.ZonedDateTime.from("2025-10-31T14:00:00+00:00[UTC]"),
      //   },
      // ],
      selectedDate: date,
      dayBoundaries: {
        start: "08:00",
        end: "19:00",
      },
    })

  const calendar = createCalendar(selectedDate)

  return (
    <div>
      {agendamentosData && calendar && (
        <ScheduleXCalendar calendarApp={calendar} />

      )}
    </div>
  )
}

export default Calendar
