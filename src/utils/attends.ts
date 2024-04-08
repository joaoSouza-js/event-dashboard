import { faker } from '@faker-js/faker'

export const attendees = Array.from({length:212}).map(() => {
    const attendee = {
        id: faker.string.uuid(), 
        name: faker.person.fullName(),
        email: faker.internet.email(),
        createdAt: faker.date.recent({days: 30}),
        checkedInAt: faker.date.recent({days: 7}),
    }   
    return attendee
})