import { Contact, Message, Platform } from "@/store/useChatStore";

export interface ChatTemplate {
    id: string;
    title: string;
    description: string;
    emoji: string;
    color: string;
    textColor: string;
    platform: Platform;
    contact: Partial<Contact>;
    messages: Omit<Message, "id">[];
}

export const CHAT_TEMPLATES: ChatTemplate[] = [
    {
        id: "couple-fight",
        title: "Couple Fight",
        description: "The silent treatment escalates fast",
        emoji: "💔",
        color: "bg-rose-500/10",
        textColor: "text-rose-500",
        platform: "imessage",
        contact: { name: "Alex 💙", status: "Last seen recently", avatar: null },
        messages: [
            { text: "Okay fine. Do whatever you want.", sender: "them", time: "11:02", status: "read" },
            { text: "I'm not doing anything wrong and you know it.", sender: "me", time: "11:03", status: "read" },
            { text: "Sure.", sender: "them", time: "11:04", status: "read" },
            { text: "Can you please stop doing that.", sender: "me", time: "11:05", status: "read" },
            { text: "Doing what?", sender: "them", time: "11:06", status: "read" },
            { text: "The one-word replies.", sender: "me", time: "11:06", status: "read" },
            { text: "Ok.", sender: "them", time: "11:07", status: "read" },
        ],
    },
    {
        id: "bestie-recap",
        title: "Bestie Recap",
        description: "Catching up over absolutely nothing",
        emoji: "🤣",
        color: "bg-yellow-400/10",
        textColor: "text-yellow-500",
        platform: "whatsapp",
        contact: { name: "Priya 🌸", status: "Online", avatar: null },
        messages: [
            { text: "omg okay you will NOT believe what just happened", sender: "them", time: "9:14", status: "read" },
            { text: "bestie WHAT", sender: "me", time: "9:14", status: "read" },
            { text: "so you know how I said I was done with him", sender: "them", time: "9:15", status: "read" },
            { text: "...yes...", sender: "me", time: "9:15", status: "read" },
            { text: "HE SHOWED UP AT MY OFFICE", sender: "them", time: "9:15", status: "read" },
            { text: "HE DID NOT", sender: "me", time: "9:16", status: "read" },
            { text: "WITH FLOWERS", sender: "them", time: "9:16", status: "read" },
            { text: "💀💀💀", sender: "me", time: "9:16", status: "read" },
        ],
    },
    {
        id: "work-standup",
        title: "Work Standup",
        description: "Corporate chaos in DMs",
        emoji: "💼",
        color: "bg-blue-500/10",
        textColor: "text-blue-500",
        platform: "slack",
        contact: { name: "Jordan — PM", status: "In a meeting", avatar: null },
        messages: [
            { text: "Hey — quick sync before the standup?", sender: "them", time: "9:57", status: "read" },
            { text: "Sure, what's up?", sender: "me", time: "9:58", status: "read" },
            { text: "The API is still blocked on design approval. Can you ping Rahul?", sender: "them", time: "9:58", status: "read" },
            { text: "Already on it. He said EOD today.", sender: "me", time: "9:59", status: "read" },
            { text: "Okay great. Also prod deploy is scheduled for Friday but we might need to push it.", sender: "them", time: "10:00", status: "read" },
            { text: "Let's discuss in standup. I'll add it to the agenda.", sender: "me", time: "10:01", status: "read" },
            { text: "Perfect. Starting in 2 minutes btw.", sender: "them", time: "10:01", status: "read" },
        ],
    },
    {
        id: "making-plans",
        title: "Making Plans",
        description: "Nobody can commit to anything",
        emoji: "🗓️",
        color: "bg-violet-500/10",
        textColor: "text-violet-500",
        platform: "telegram",
        contact: { name: "The Boys 🎮", status: "Online", avatar: null },
        messages: [
            { text: "guys what are we doing Friday", sender: "me", time: "6:30", status: "read" },
            { text: "idk what's everyone thinking", sender: "them", time: "6:31", status: "read" },
            { text: "could do laser tag again?", sender: "me", time: "6:32", status: "read" },
            { text: "nah bro we did that last time", sender: "them", time: "6:34", status: "read" },
            { text: "movies?", sender: "me", time: "6:40", status: "read" },
            { text: "depends what's playing", sender: "them", time: "6:55", status: "read" },
            { text: "why does this take us 3 days every time lmao", sender: "me", time: "7:01", status: "read" },
        ],
    },
    {
        id: "late-night",
        title: "Late Night",
        description: "The 2am totally-friends conversation",
        emoji: "🌙",
        color: "bg-indigo-500/10",
        textColor: "text-indigo-400",
        platform: "instagram",
        contact: { name: "Sam", status: "Active now", avatar: null },
        messages: [
            { text: "you up?", sender: "them", time: "2:04", status: "read" },
            { text: "yeah couldn't sleep", sender: "me", time: "2:06", status: "read" },
            { text: "same. been thinking a lot lately", sender: "them", time: "2:07", status: "read" },
            { text: "about what?", sender: "me", time: "2:08", status: "read" },
            { text: "idk everything ig. you ever feel like you're always waiting for something to start?", sender: "them", time: "2:10", status: "read" },
            { text: "yeah honestly all the time", sender: "me", time: "2:12", status: "read" },
            { text: "ok cool so it's not just me", sender: "them", time: "2:13", status: "read" },
        ],
    },
    {
        id: "post-party",
        title: "Post-Party Debrief",
        description: "The morning after recap",
        emoji: "🎉",
        color: "bg-pink-500/10",
        textColor: "text-pink-500",
        platform: "whatsapp",
        contact: { name: "Meera 🔥", status: "Last seen today at 11:32", avatar: null },
        messages: [
            { text: "okay WHAT happened last night", sender: "me", time: "11:45", status: "read" },
            { text: "lmaoo i literally blacked out at the pregame", sender: "them", time: "11:47", status: "read" },
            { text: "you were dancing on the table at 10pm", sender: "me", time: "11:48", status: "read" },
            { text: "NO I WAS NOT", sender: "them", time: "11:48", status: "read" },
            { text: "I have video evidence", sender: "me", time: "11:49", status: "read" },
            { text: "DELETE IT RIGHT NOW", sender: "them", time: "11:49", status: "read" },
            { text: "already sent it to the group chat 😇", sender: "me", time: "11:50", status: "read" },
            { text: "I HATE YOU", sender: "them", time: "11:50", status: "read" },
        ],
    },
];
