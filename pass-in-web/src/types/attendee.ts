interface Attendee {
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string | null
  totalAttendees: number
}

export type { Attendee }
