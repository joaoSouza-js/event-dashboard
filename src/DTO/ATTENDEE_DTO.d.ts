interface ATTENDEE_DTO {
    id: number
    name: string
    email: string
    createAt: Date | string
    checkedInAt: Date | string | null
}