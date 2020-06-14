import { startOfHour } from 'date-fns'
import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentRepository'

interface IAppointment {
  date: Date
  provider: string
}

export default class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository
  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public execute({ date, provider }: IAppointment): Appointment {
    const appointmentDate = startOfHour(date)
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate) {
      throw new Error('Appointment is alread booked')
    }
    const appointment = this.appointmentsRepository.create({
      provider: provider,
      date: appointmentDate,
    })
    return appointment
  }
}
