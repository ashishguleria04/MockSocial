
import { faker } from '@faker-js/faker';
import { Contact, Message, PostConfig } from '@/store/useChatStore';

export const generateRandomContact = (): Partial<Contact> => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
        name: `${firstName} ${lastName}`,
        status: faker.helpers.arrayElement(['Online', 'Busy', 'At the gym', 'Sleeping', 'Urgent calls only', 'In a meeting']),
        avatar: faker.image.avatar(),
    };
};

export const generateRandomMessages = (count: number = 5): Message[] => {
    const messages: Message[] = [];
    let currentTime = new Date();
    // Go back some time to start the conversation
    currentTime.setMinutes(currentTime.getMinutes() - (count * 2));

    for (let i = 0; i < count; i++) {
        // Advance time by 1-5 minutes for next message
        currentTime.setMinutes(currentTime.getMinutes() + faker.number.int({ min: 1, max: 5 }));

        const isMe = faker.datatype.boolean(); // 50/50 chance

        messages.push({
            id: faker.string.uuid(),
            text: faker.lorem.sentence({ min: 2, max: 10 }),
            sender: isMe ? 'me' : 'them',
            time: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'read',
        });
    }

    return messages;
};

export const generateRandomPost = (): Partial<PostConfig> => {
    return {
        text: faker.lorem.paragraph({ min: 1, max: 3 }),
        likes: faker.helpers.replaceSymbols('##.#K'),
        comments: faker.helpers.replaceSymbols('#.###'),
        shares: faker.helpers.replaceSymbols('###'),
        image: Math.random() > 0.3 ? faker.image.urlLoremFlickr({ category: 'nature' }) : null,
    };
}
