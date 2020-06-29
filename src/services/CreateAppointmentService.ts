import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentRepository'
import AppError from '../Errors/AppError'

interface Request {
  date: Date
  provider_id: string
}

export default class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointmentDate = startOfHour(date)
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate) {
      throw new AppError('Appointment is alread booked', 400)
    }
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })
    await appointmentsRepository.save(appointment)
    return appointment
  }
}
