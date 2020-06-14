import { isEqual } from 'date-fns'
import Appointment from '../models/Appointment'

interface IAppointment {
  provider: string
  date: Date
}

export default class AppointmentsRepository {
  private appointments: Appointment[]

  constructor() {
    this.appointments = []
  }

  public all(): Appointment[] {
    return this.appointments
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(date, appointment.date)
    )
    return findAppointment || null
  }

  public create({ provider, date }: IAppointment): Appointment {
    const appointment = new Appointment({ provider, date })
    this.appointments.push(appointment)
    return appointment
  }
}
