export const NavLinks = [
    {
        Name:"Home",
        path:"/",
        clicked:true,
    },
    {
        Name:"About Us",
        path:"/#about",
        clicked:false,
    },
    {
        Name:"How To Start",
        path:"/#How_To_Start",
        clicked:false,
    },
] as const

export const HowToStartSteps =[
    {
        id:"1",
        StepNum:"Step 1",
        Title:"Sign up for an account ",
        Body:"it's free for now ✨"
    },
    {
        id:"2",
        StepNum:"Step 2",
        Title:"Start write your note's ",
        Body:"after you sign up you will be redirect to your dashboard "
    },
    {
        id:"3",
        StepNum:"Step 3",
        Title:"Start asking your note ",
        Body:"if you want to remember what you were writing you can ask your note "
    },
]as const 

export const aboutCard = [
    {
        id:"1",
        Title:"Talk to Your Notes",
        Body:"Our advanced AI allows you to interact with your notes naturally. Ask questions, get summaries, and explore insights seamlessly.",
    },
    {
        id:"2",
        Title:"Smart Categorization and Tagging",
        Body:"Automatically organize your notes with smart tags and categories, making it easy to find what you need when you need it.",
    },
    {
        id:"3",
        Title:"Task Management",
        Body:"Convert your notes into tasks and set reminders to stay on top of your projects and deadlines.",
    },
    {
        id:"4",
        Title:"Sync Across Devices",
        Body:"Access your notes from anywhere with seamless syncing across all your devices.",
    },
] as const 