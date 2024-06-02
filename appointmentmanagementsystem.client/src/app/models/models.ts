export interface UserR {
    username: string;
    name: string;
    lastname: string;
    is_admin: boolean;
  }
export interface UserC{
    email:any;
    password: any;
}
export interface TodayAppointment{
  appointment_time:string;
}
export interface TodayUserAppointment{
  appointment_time:string;
  name:string;
  lastname:string;
}
export interface UserAppointment{
  date:any;
  appointment_time:string;
  
}

export interface Appointment{
  id_appointment?:number;
  date:Date;
  appointment_time:string;
  username:string;
}

export function difference(date: TodayAppointment[], min: string, max: string) {

  let hours = [
    '00:00', '00:30', '01:00', '01:30', '02:00', '02:30',
    '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
    '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
  ];

  // Convert appointment times to 'hh:mm' format
  let appointmentTimes = date.map(d => d.appointment_time.slice(0, 5));

  // Filter hours within the given range
  let filteredHours = hours.filter(hour => hour >= min && hour <= max);

  // Filter hours that are not in the appointmentTimes list
  let availableHours = filteredHours.filter(x => !appointmentTimes.includes(x));

  return availableHours;
}
export interface User{
  id_user?: number;
  username: string;
  password: string;
  email: string;
  name: string;
  lastname: string;
  is_admin: boolean;
}
