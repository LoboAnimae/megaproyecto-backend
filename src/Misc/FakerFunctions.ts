import { faker } from '@faker-js/faker';


export function generateRandomEmail() {
    const lastName = faker.random.alpha(3);
    const randomNumber = '' + faker.random.numeric(5);
    return lastName + randomNumber + '@uvg.edu.gt';
};

export function generateRandomTime(maxId: number) {
    const startTime = faker.date.recent();
    const endTime = faker.date.soon();
    const startedOnPage = parseInt(faker.random.numeric());
    const endedOnPage = parseInt(faker.random.numeric());
    const randomUnderMax = Math.floor(Math.random() * maxId);
    if (startedOnPage < endedOnPage) {
        return { startTime, endTime, startedOnPage, endedOnPage, documentId: randomUnderMax };
    }
    return { startTime, endTime, documentId: randomUnderMax, startedOnPage: endedOnPage, endedOnPage: startedOnPage };
}