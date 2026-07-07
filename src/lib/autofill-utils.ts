
import { faker } from '@faker-js/faker';
import { Contact, Message, PostConfig } from '@/store/useChatStore';

// Authentic chat messages for realistic autofill
const chatMessages = [
    "Hey, how are you doing?",
    "Did you see that video I sent?",
    "I'll be there in 5 minutes!",
    "Can we reschedule for tomorrow?",
    "That sounds amazing! 🎉",
    "Let me check my calendar.",
    "Sorry, I missed your call.",
    "Omg you won't believe what happened...",
    "Are you free this weekend?",
    "Sounds good to me.",
    "K.",
    "😂😂😂",
    "Where are we meeting?",
    "Just sent you the files.",
    "Happy Birthday!! 🎂",
    "On my way!",
    "Can you call me?",
    "No way!",
    "Dinner tonight?",
    "See you soon 👋"
];

// Authentic social media captions
const postCaptions = [
    "Just another day in paradise! 🌴 #vacation #vibes",
    "Coffee first, schemes later. ☕️",
    "So grateful for this amazing team! 🙌",
    "New project coming soon... stay tuned! 👀",
    "Weekend mood enabled.",
    "Can't believe it's already Friday!",
    "Throwback to this amazing trip.",
    "Work hard, play hard.",
    "Minimalist vibes today.",
    "Life is better when you're laughing.",
    "Nature is healing 🌿",
    "Just posted a new update! Link in bio.",
    "Monday blues...",
    "Golden hour ✨"
];

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
    const currentTime = new Date();
    // Go back some time to start the conversation
    currentTime.setMinutes(currentTime.getMinutes() - (count * 2));

    for (let i = 0; i < count; i++) {
        // Advance time by 1-5 minutes for next message
        currentTime.setMinutes(currentTime.getMinutes() + faker.number.int({ min: 1, max: 5 }));

        const isMe = faker.datatype.boolean(); // 50/50 chance

        messages.push({
            id: faker.string.uuid(),
            text: faker.helpers.arrayElement(chatMessages),
            sender: isMe ? 'me' : 'them',
            time: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'read',
        });
    }

    return messages;
};

export const generateRandomPost = (): Partial<PostConfig> => {
    return {
        text: faker.helpers.arrayElement(postCaptions),
        likes: faker.helpers.replaceSymbols('##.#K'),
        comments: faker.helpers.replaceSymbols('#.###'),
        shares: faker.helpers.replaceSymbols('###'),
        image: Math.random() > 0.3 ? faker.image.urlLoremFlickr({ category: 'nature' }) : null,
    };
}
