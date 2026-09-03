/* Kitaak demo dataset - "Marmalade Robotics" (a fictional company). Plain browser JavaScript, no dependencies.
   Assigns a single global: window.KITAAK_DEMO (globalThis.KITAAK_DEMO outside browsers). */
(function (root) {
  "use strict";

  // tiny message helpers (kept inside the file so the dataset stays dependency-free)
  var T = function (from, minutesAgo, text) { return { from: from, kind: "text", text: text, minutesAgo: minutesAgo }; };
  var V = function (from, minutesAgo, text) { return { from: from, kind: "voice", text: text, minutesAgo: minutesAgo }; };
  var F = function (from, minutesAgo, name, kind, size) { return { from: from, kind: "file", text: name, minutesAgo: minutesAgo, file: { name: name, kind: kind, size: size } }; };

  var company = {
    name: "Marmalade Robotics",
    tagline: "Friendly little robots for stubborn little chores.",
    industry: "Consumer robotics",
    city: "Bristol",
    country: "United Kingdom",
    timezone: "Europe/London",
    founded: 2017,
    description: "Marmalade Robotics builds small, cheerful household robots: Pip waters your plants, Dusty keeps your shelves clean, and Otto, launching in twelve days, will finally do the windows. Around fifty people work from a converted jam factory in Bristol and a scattering of desks across Europe, united by tidy firmware and an ongoing argument about the office playlist.",
    departments: ["Product", "Engineering", "Design", "Hardware", "Marketing", "Operations", "People", "Customer Happiness"],
    adminName: "Priya Raman"
  };

  var me = {
    id: "allison",
    name: "Allison Marchetti",
    title: "Senior Product Manager, Otto",
    department: "Product",
    oNumber: "O7",
    initials: "AM",
    email: "allison.marchetti@marmaladerobotics.co",
    phone: "+44 117 496 0107",
    city: "Bristol",
    timezone: "Europe/London",
    bio: "Runs the Otto launch, keeps the countdown board honest and defends the right to play jazz before noon.",
    status: "online",
    favoriteGenres: ["jazz", "lofi", "funk"]
  };

  var people = [
    // Product
    { id: "greta-lindqvist", name: "Greta Lindqvist", title: "CEO & Co-founder", department: "Product", oNumber: "O1", initials: "GL", status: "online", city: "Bristol", timezone: "Europe/London", email: "greta.lindqvist@marmaladerobotics.co", phone: "+44 117 496 0101", bio: "Co-founded Marmalade with a soldering iron and a stubborn houseplant; still answers support tickets on Fridays.", favoriteGenre: "jazz", role: "admin" },
    { id: "dev-chaudhary", name: "Dev Chaudhary", title: "Head of Product", department: "Product", oNumber: "O4", initials: "DC", status: "online", city: "Bristol", timezone: "Europe/London", email: "dev.chaudhary@marmaladerobotics.co", phone: "+44 117 496 0104", bio: "Draws roadmaps in three colours, never fewer, and owns the launch countdown board.", favoriteGenre: "synthwave", role: "member" },
    { id: "marisol-quintero", name: "Marisol Quintero", title: "Product Manager, Pip", department: "Product", oNumber: "O15", initials: "MQ", status: "away", city: "Lisbon", timezone: "Europe/Lisbon", email: "marisol.quintero@marmaladerobotics.co", phone: "+351 21 555 0115", bio: "Runs the Pip roadmap and an unofficial ranking of every pastel de nata in Lisbon.", favoriteGenre: "afrobeat", role: "member" },
    { id: "henrik-solberg", name: "Henrik Solberg", title: "Product Analyst", department: "Product", oNumber: "O22", initials: "HS", status: "online", city: "Oslo", timezone: "Europe/Oslo", email: "henrik.solberg@marmaladerobotics.co", phone: "+47 22 55 01 22", bio: "Turns telemetry into charts and charts into arguments, politely.", favoriteGenre: "ambient", role: "member" },
    { id: "ngozi-eze", name: "Ngozi Eze", title: "Associate Product Manager", department: "Product", oNumber: "O33", initials: "NE", status: "online", city: "London", timezone: "Europe/London", email: "ngozi.eze@marmaladerobotics.co", phone: "+44 20 7946 0133", bio: "Moved over from support six months ago and still knows every customer by first name.", favoriteGenre: "afrobeat", role: "member" },
    // Engineering
    { id: "tomasz-wieczorek", name: "Tomasz Wieczorek", title: "Head of IT & Security", department: "Engineering", oNumber: "O2", initials: "TW", status: "dnd", city: "Bristol", timezone: "Europe/London", email: "tomasz.wieczorek@marmaladerobotics.co", phone: "+44 117 496 0102", bio: "Guardian of the password policy and the only person who knows where the server room key lives.", favoriteGenre: "synthwave", role: "admin" },
    { id: "yuki-tanaka", name: "Yuki Tanaka", title: "Staff Firmware Engineer", department: "Engineering", oNumber: "O9", initials: "YT", status: "online", city: "Bristol", timezone: "Europe/London", email: "yuki.tanaka@marmaladerobotics.co", phone: "+44 117 496 0109", bio: "Writes firmware so tidy the compiler sends thank-you notes.", favoriteGenre: "lofi", role: "member" },
    { id: "samuel-adeyemi", name: "Samuel Adeyemi", title: "Backend Engineer", department: "Engineering", oNumber: "O11", initials: "SA", status: "online", city: "Manchester", timezone: "Europe/London", email: "samuel.adeyemi@marmaladerobotics.co", phone: "+44 161 496 0111", bio: "Believes every problem is a queue problem and has the diagrams to prove it.", favoriteGenre: "afrobeat", role: "member" },
    { id: "lena-hoffmann", name: "Lena Hoffmann", title: "Mobile Engineer (iOS)", department: "Engineering", oNumber: "O14", initials: "LH", status: "away", city: "Berlin", timezone: "Europe/Berlin", email: "lena.hoffmann@marmaladerobotics.co", phone: "+49 30 5550 1140", bio: "Ships the app, tests it on her grandmother, ships it again.", favoriteGenre: "neoclassical", role: "member" },
    { id: "rafael-moreira", name: "Rafael Moreira", title: "Mobile Engineer (Android)", department: "Engineering", oNumber: "O16", initials: "RM", status: "online", city: "Porto", timezone: "Europe/Lisbon", email: "rafael.moreira@marmaladerobotics.co", phone: "+351 22 555 0116", bio: "Maintains fourteen test phones and names each one after a footballer.", favoriteGenre: "funk", role: "member" },
    { id: "aisha-khan", name: "Aisha Khan", title: "Cloud Platform Engineer", department: "Engineering", oNumber: "O19", initials: "AK", status: "online", city: "Bristol", timezone: "Europe/London", email: "aisha.khan@marmaladerobotics.co", phone: "+44 117 496 0119", bio: "Keeps the robot fleet online and keeps a running tally of every 3 a.m. pager alert.", favoriteGenre: "ambient", role: "member" },
    { id: "connor-mcbride", name: "Connor McBride", title: "QA Lead", department: "Engineering", oNumber: "O23", initials: "CM", status: "online", city: "Glasgow", timezone: "Europe/London", email: "connor.mcbride@marmaladerobotics.co", phone: "+44 141 496 0123", bio: "Has broken every prototype at least once, on purpose, with love.", favoriteGenre: "funk", role: "member" },
    { id: "ines-fernandez", name: "Ines Fernandez", title: "Data Engineer", department: "Engineering", oNumber: "O27", initials: "IF", status: "offline", city: "Madrid", timezone: "Europe/Madrid", email: "ines.fernandez@marmaladerobotics.co", phone: "+34 91 555 01 27", bio: "Makes the dashboards everyone screenshots for the board deck.", favoriteGenre: "jazz", role: "member" },
    { id: "jonas-petersen", name: "Jonas Petersen", title: "Robotics Software Engineer", department: "Engineering", oNumber: "O30", initials: "JP", status: "online", city: "Copenhagen", timezone: "Europe/Copenhagen", email: "jonas.petersen@marmaladerobotics.co", phone: "+45 32 55 01 30", bio: "Teaches robots to navigate windowsills; has taught his cat nothing.", favoriteGenre: "lofi", role: "member" },
    { id: "wei-zhang", name: "Wei Zhang", title: "Computer Vision Engineer", department: "Engineering", oNumber: "O36", initials: "WZ", status: "away", city: "Bristol", timezone: "Europe/London", email: "wei.zhang@marmaladerobotics.co", phone: "+44 117 496 0136", bio: "Can tell a smudge from a shadow at forty frames per second.", favoriteGenre: "neoclassical", role: "member" },
    { id: "bea-oduya", name: "Beatrice Oduya", title: "Junior Software Engineer", department: "Engineering", oNumber: "O44", initials: "BO", status: "online", city: "Bristol", timezone: "Europe/London", email: "bea.oduya@marmaladerobotics.co", phone: "+44 117 496 0144", bio: "First job out of university and already writes the best commit messages in the repo.", favoriteGenre: "afrobeat", role: "member" },
    // Design
    { id: "felix-brandt", name: "Felix Brandt", title: "Head of Design", department: "Design", oNumber: "O5", initials: "FB", status: "online", city: "Berlin", timezone: "Europe/Berlin", email: "felix.brandt@marmaladerobotics.co", phone: "+49 30 5550 1105", bio: "Will discuss the corner radius of anything for as long as you let him.", favoriteGenre: "neoclassical", role: "member" },
    { id: "chloe-dubois", name: "Chloe Dubois", title: "Industrial Designer", department: "Design", oNumber: "O12", initials: "CD", status: "online", city: "Bristol", timezone: "Europe/London", email: "chloe.dubois@marmaladerobotics.co", phone: "+44 117 496 0112", bio: "Sketches robots on napkins and then, alarmingly, builds them.", favoriteGenre: "indiefolk", role: "member" },
    { id: "omar-haddad", name: "Omar Haddad", title: "UX Researcher", department: "Design", oNumber: "O21", initials: "OH", status: "away", city: "Bristol", timezone: "Europe/London", email: "omar.haddad@marmaladerobotics.co", phone: "+44 117 496 0121", bio: "Has watched four hundred hours of people talking to robots and taken notes on every one.", favoriteGenre: "jazz", role: "member" },
    { id: "sanne-de-vries", name: "Sanne de Vries", title: "Product Designer, App", department: "Design", oNumber: "O29", initials: "SV", status: "online", city: "Amsterdam", timezone: "Europe/Amsterdam", email: "sanne.devries@marmaladerobotics.co", phone: "+31 20 555 0129", bio: "Designs the app screens, then rides her bike until they make sense.", favoriteGenre: "lofi", role: "member" },
    { id: "kwame-boateng", name: "Kwame Boateng", title: "Motion & Brand Designer", department: "Design", oNumber: "O38", initials: "KB", status: "offline", city: "London", timezone: "Europe/London", email: "kwame.boateng@marmaladerobotics.co", phone: "+44 20 7946 0138", bio: "Made Pip blink in a way that tests as 'delightful' with 92 percent of people and will not rest until it is 100.", favoriteGenre: "afrobeat", role: "member" },
    // Hardware
    { id: "astrid-nyberg", name: "Astrid Nyberg", title: "Head of Hardware", department: "Hardware", oNumber: "O3", initials: "AN", status: "online", city: "Bristol", timezone: "Europe/London", email: "astrid.nyberg@marmaladerobotics.co", phone: "+44 117 496 0103", bio: "Has a torque wrench for every occasion and an opinion about all of them.", favoriteGenre: "funk", role: "member" },
    { id: "diego-alvarez", name: "Diego Alvarez", title: "Mechanical Engineer", department: "Hardware", oNumber: "O10", initials: "DA", status: "online", city: "Bristol", timezone: "Europe/London", email: "diego.alvarez@marmaladerobotics.co", phone: "+44 117 496 0110", bio: "Designed Otto's suction cups and now cannot stop noticing dirty windows.", favoriteGenre: "synthwave", role: "member" },
    { id: "priyanka-nair", name: "Priyanka Nair", title: "Electrical Engineer", department: "Hardware", oNumber: "O17", initials: "PN", status: "dnd", city: "Bristol", timezone: "Europe/London", email: "priyanka.nair@marmaladerobotics.co", phone: "+44 117 496 0117", bio: "If it hums, buzzes or blinks, she has already measured it.", favoriteGenre: "neoclassical", role: "member" },
    { id: "lukas-meier", name: "Lukas Meier", title: "Test Lab Technician", department: "Hardware", oNumber: "O25", initials: "LM", status: "online", city: "Bristol", timezone: "Europe/London", email: "lukas.meier@marmaladerobotics.co", phone: "+44 117 496 0125", bio: "Runs the drop tests and keeps a Wall of Honor for every robot that survived.", favoriteGenre: "funk", role: "member" },
    { id: "fatima-al-sayed", name: "Fatima Al-Sayed", title: "Supply Chain Manager", department: "Hardware", oNumber: "O31", initials: "FA", status: "away", city: "Bristol", timezone: "Europe/London", email: "fatima.alsayed@marmaladerobotics.co", phone: "+44 117 496 0131", bio: "Knows the lead time of every component and the birthday of every supplier.", favoriteGenre: "ambient", role: "member" },
    { id: "mateo-rossi", name: "Mateo Rossi", title: "Prototyping Engineer", department: "Hardware", oNumber: "O39", initials: "MR", status: "online", city: "Turin", timezone: "Europe/Rome", email: "mateo.rossi@marmaladerobotics.co", phone: "+39 011 555 0139", bio: "3D prints a new bracket before you have finished describing the old one.", favoriteGenre: "funk", role: "member" },
    { id: "hannah-kowalski", name: "Hannah Kowalski", title: "Battery & Power Engineer", department: "Hardware", oNumber: "O46", initials: "HK", status: "online", city: "Bristol", timezone: "Europe/London", email: "hannah.kowalski@marmaladerobotics.co", phone: "+44 117 496 0146", bio: "Measures her day in milliamp hours and is usually right.", favoriteGenre: "indiefolk", role: "member" },
    // Marketing
    { id: "nadia-petrova", name: "Nadia Petrova", title: "Head of Marketing", department: "Marketing", oNumber: "O6", initials: "NP", status: "online", city: "London", timezone: "Europe/London", email: "nadia.petrova@marmaladerobotics.co", phone: "+44 20 7946 0106", bio: "Named the robots, named the kettle, and will happily name your pet.", favoriteGenre: "funk", role: "member" },
    { id: "ben-whitaker", name: "Ben Whitaker", title: "Content Lead", department: "Marketing", oNumber: "O18", initials: "BW", status: "online", city: "Bristol", timezone: "Europe/London", email: "ben.whitaker@marmaladerobotics.co", phone: "+44 117 496 0118", bio: "Writes the newsletter, the launch copy and the passive-aggressive kitchen signs.", favoriteGenre: "indiefolk", role: "member" },
    { id: "sofia-esposito", name: "Sofia Esposito", title: "Social Media Manager", department: "Marketing", oNumber: "O26", initials: "SE", status: "online", city: "Milan", timezone: "Europe/Rome", email: "sofia.esposito@marmaladerobotics.co", phone: "+39 02 5550 1126", bio: "Turned a video of Pip falling off a desk into two million views and a merch line.", favoriteGenre: "afrobeat", role: "member" },
    { id: "arjun-mehta", name: "Arjun Mehta", title: "Growth Marketer", department: "Marketing", oNumber: "O34", initials: "AM", status: "away", city: "Bristol", timezone: "Europe/London", email: "arjun.mehta@marmaladerobotics.co", phone: "+44 117 496 0134", bio: "Runs the experiments, reports the numbers and celebrates the tiny wins loudly.", favoriteGenre: "synthwave", role: "member" },
    { id: "isla-macleod", name: "Isla MacLeod", title: "Events & Community Lead", department: "Marketing", oNumber: "O42", initials: "IM", status: "offline", city: "Edinburgh", timezone: "Europe/London", email: "isla.macleod@marmaladerobotics.co", phone: "+44 131 496 0142", bio: "Organises the launch party and knows exactly how many chairs the venue has.", favoriteGenre: "indiefolk", role: "member" },
    // Operations
    { id: "priya-raman", name: "Priya Raman", title: "Head of Operations", department: "Operations", oNumber: "O8", initials: "PR", status: "online", city: "Bristol", timezone: "Europe/London", email: "priya.raman@marmaladerobotics.co", phone: "+44 117 496 0108", bio: "Keeps the lights on, the coffee stocked and the Kitaak workspace tidy; corporate admin by choice.", favoriteGenre: "jazz", role: "admin" },
    { id: "marcus-oyelaran", name: "Marcus Oyelaran", title: "Office Manager", department: "Operations", oNumber: "O13", initials: "MO", status: "online", city: "Bristol", timezone: "Europe/London", email: "marcus.oyelaran@marmaladerobotics.co", phone: "+44 117 496 0113", bio: "Custodian of Gerald the office kettle and chief investigator of the missing mugs.", favoriteGenre: "funk", role: "member" },
    { id: "elin-johansson", name: "Elin Johansson", title: "Logistics Coordinator", department: "Operations", oNumber: "O24", initials: "EJ", status: "online", city: "Gothenburg", timezone: "Europe/Stockholm", email: "elin.johansson@marmaladerobotics.co", phone: "+46 31 555 01 24", bio: "Tracks every pallet from Shenzhen to the loading bay and can recite the customs codes.", favoriteGenre: "ambient", role: "member" },
    { id: "david-okonkwo", name: "David Okonkwo", title: "Finance Manager", department: "Operations", oNumber: "O32", initials: "DO", status: "away", city: "Bristol", timezone: "Europe/London", email: "david.okonkwo@marmaladerobotics.co", phone: "+44 117 496 0132", bio: "Approves expenses with a smile and a spreadsheet, in that order.", favoriteGenre: "jazz", role: "member" },
    { id: "rosa-martinez", name: "Rosa Martinez", title: "Legal & Compliance Lead", department: "Operations", oNumber: "O41", initials: "RM", status: "online", city: "Bristol", timezone: "Europe/London", email: "rosa.martinez@marmaladerobotics.co", phone: "+44 117 496 0141", bio: "Reads every terms-of-service so nobody else has to, and genuinely enjoys it.", favoriteGenre: "neoclassical", role: "member" },
    // People
    { id: "grace-thompson", name: "Grace Thompson", title: "Head of People", department: "People", oNumber: "O20", initials: "GT", status: "online", city: "Bristol", timezone: "Europe/London", email: "grace.thompson@marmaladerobotics.co", phone: "+44 117 496 0120", bio: "Remembers every birthday, every work anniversary and every cake preference.", favoriteGenre: "indiefolk", role: "member" },
    { id: "leo-nakamura", name: "Leo Nakamura", title: "Talent Partner", department: "People", oNumber: "O35", initials: "LN", status: "online", city: "Bristol", timezone: "Europe/London", email: "leo.nakamura@marmaladerobotics.co", phone: "+44 117 496 0135", bio: "Interviews engineers about robots and somehow always ends up discussing bread.", favoriteGenre: "lofi", role: "member" },
    { id: "amelie-laurent", name: "Amelie Laurent", title: "People Operations Coordinator", department: "People", oNumber: "O47", initials: "AL", status: "away", city: "Lyon", timezone: "Europe/Paris", email: "amelie.laurent@marmaladerobotics.co", phone: "+33 4 55 50 01 47", bio: "Onboards every new hire with a welcome kit and an unnecessarily good spreadsheet.", favoriteGenre: "neoclassical", role: "member" },
    // Customer Happiness
    { id: "jamal-carter", name: "Jamal Carter", title: "Head of Customer Happiness", department: "Customer Happiness", oNumber: "O28", initials: "JC", status: "online", city: "Bristol", timezone: "Europe/London", email: "jamal.carter@marmaladerobotics.co", phone: "+44 117 496 0128", bio: "Answers tickets in under an hour and signs every one with a robot emoji.", favoriteGenre: "funk", role: "member" },
    { id: "maya-lindgren", name: "Maya Lindgren", title: "Support Specialist", department: "Customer Happiness", oNumber: "O37", initials: "ML", status: "online", city: "Stockholm", timezone: "Europe/Stockholm", email: "maya.lindgren@marmaladerobotics.co", phone: "+46 8 555 011 37", bio: "Has talked three hundred Pips back to life over the phone.", favoriteGenre: "lofi", role: "member" },
    { id: "oliver-hughes", name: "Oliver Hughes", title: "Support Specialist", department: "Customer Happiness", oNumber: "O40", initials: "OH", status: "dnd", city: "Cardiff", timezone: "Europe/London", email: "oliver.hughes@marmaladerobotics.co", phone: "+44 29 2018 0140", bio: "Keeps a spreadsheet of the funniest customer robot names, currently 1,204 entries.", favoriteGenre: "synthwave", role: "member" },
    { id: "zara-hussain", name: "Zara Hussain", title: "Community Manager", department: "Customer Happiness", oNumber: "O43", initials: "ZH", status: "online", city: "Birmingham", timezone: "Europe/London", email: "zara.hussain@marmaladerobotics.co", phone: "+44 121 496 0143", bio: "Runs the owners' forum and knows which Pip owners are secretly the same person.", favoriteGenre: "afrobeat", role: "member" },
    { id: "teo-ivanov", name: "Teodor Ivanov", title: "Technical Support Engineer", department: "Customer Happiness", oNumber: "O45", initials: "TI", status: "offline", city: "Sofia", timezone: "Europe/Sofia", email: "teo.ivanov@marmaladerobotics.co", phone: "+359 2 555 0145", bio: "Reads firmware logs for fun and has the pyjamas to prove it.", favoriteGenre: "ambient", role: "member" },
    { id: "nina-berg", name: "Nina Berg", title: "Customer Success Manager, B2B", department: "Customer Happiness", oNumber: "O48", initials: "NB", status: "online", city: "Bristol", timezone: "Europe/London", email: "nina.berg@marmaladerobotics.co", phone: "+44 117 496 0148", bio: "Looks after the hotel chains that bought Dusty by the hundred.", favoriteGenre: "jazz", role: "member" }
  ];

  var everyone = people.map(function (p) { return p.id; });
  var byDept = function (d) { return people.filter(function (p) { return p.department === d; }).map(function (p) { return p.id; }); };

  var groups = [
    {
      id: "all-hands",
      name: "# All Hands",
      topic: "Company-wide news, birthdays and the occasional kettle update",
      memberIds: everyone,
      adminId: "priya-raman",
      createdDaysAgo: 812,
      instantSpeech: { active: true, speakers: ["greta-lindqvist", "dev-chaudhary", "nadia-petrova"] },
      messages: [
        T("priya-raman", 4320, "Morning all. Reminder that the loading bay is closed Wednesday morning while the new racking goes in. If you ordered anything heavy, it will be waiting in Reception with a small sign and a large opinion."),
        T("marcus-oyelaran", 4290, "Also: Gerald the kettle has been descaled. He is in a good mood. Please do not ruin it."),
        T("ben-whitaker", 4280, "Gerald has never been in a good mood. Gerald tolerates us."),
        T("dev-chaudhary", 2900, "OTTO LAUNCH COUNTDOWN: 14 days. Firmware freeze is Friday, packaging sign-off Monday. The board in the kitchen is accurate; the board in the hardware lab is a work of fiction."),
        T("astrid-nyberg", 2880, "The hardware lab board is aspirational and we stand by it."),
        T("grace-thompson", 2700, "Happy birthday to Yuki Tanaka today! There is cake in the kitchen. It is a lemon drizzle. It has a small sugar Pip on top which Chloe made and which nobody is allowed to eat until Yuki has seen it."),
        T("yuki-tanaka", 2690, "Thank you all. The sugar Pip has been seen and photographed. It may now be eaten."),
        T("connor-mcbride", 2685, "The sugar Pip has been eaten. Quality assured."),
        F("kwame-boateng", 2680, "yuki-birthday-pip-cake.jpg", "image", "2.4 MB"),
        T("sofia-esposito", 2670, "That cake photo is going on the company socials whether anyone likes it or not."),
        T("allison", 1500, "Quick one from the Otto team: the beta units go out to the 40 test households tomorrow. If you see a robot on a window in Bristol this week, it is probably ours. Please wave."),
        T("diego-alvarez", 1490, "I have started noticing dirty windows everywhere. On buses. On trains. In my dreams."),
        T("nadia-petrova", 1480, "Diego, that is the marketing campaign writing itself. Thank you."),
        T("tomasz-wieczorek", 1200, "Security reminder: the password 'otto2026' is not a password, it is a suggestion to burglars. Three of you know who you are. Kitaak will nudge you."),
        T("henrik-solberg", 1195, "In my defence it was 'Otto2026!' with the exclamation mark."),
        T("tomasz-wieczorek", 1190, "Henrik."),
        T("priya-raman", 600, "Today's all-hands is at 4 pm in the big room and on Kitaak. Agenda: launch status, Q4 hiring, and a short mystery item from Marcus."),
        T("marcus-oyelaran", 590, "The mystery item concerns mugs. Thirty-one mugs. That is all I will say."),
        T("oliver-hughes", 580, "Customer robot name of the week, for a Dusty in a Cardiff hotel: 'Sir Dustalot'. Adding it to the spreadsheet. We are at 1,204."),
        T("zara-hussain", 575, "The owners' forum voted 'Squeegee Todd' as the most popular pre-order name for Otto. Please tell the naming committee."),
        T("nadia-petrova", 570, "The naming committee is me and I approve."),
        T("greta-lindqvist", 240, "Popping in to say the beta feedback is the best I have seen in nine years of doing this. Whatever you are all doing, keep doing it, and then go home on time."),
        V("greta-lindqvist", 235, "Seriously, everyone, go home on time tonight. I will be checking. That is the whole voice note."),
        T("jamal-carter", 120, "Support inbox is at zero for the first time since April. Framing the screenshot."),
        T("maya-lindgren", 115, "It lasted four minutes but we cherish them."),
        T("dev-chaudhary", 30, "COUNTDOWN: 12 days. Firmware is frozen. Nobody breathe on it."),
        T("connor-mcbride", 25, "I breathed on it. It is fine. I checked.")
      ]
    },
    {
      id: "friday-five",
      name: "# Friday Five PM Meeting",
      topic: "Agenda, notes and excuses for the weekly Friday 5 pm wrap-up",
      memberIds: ["greta-lindqvist", "dev-chaudhary", "astrid-nyberg", "felix-brandt", "nadia-petrova", "priya-raman", "tomasz-wieczorek", "jamal-carter", "grace-thompson", "marisol-quintero", "yuki-tanaka", "chloe-dubois", "ben-whitaker", "henrik-solberg", "marcus-oyelaran", "hannah-kowalski", "isla-macleod", "lukas-meier", "connor-mcbride"],
      adminId: "greta-lindqvist",
      createdDaysAgo: 610,
      instantSpeech: { active: false, speakers: ["greta-lindqvist", "priya-raman"] },
      messages: [
        T("priya-raman", 10100, "Agenda for tomorrow's Friday Five: 1) Otto beta readiness (Allison) 2) Pip 2 battery decision (Hannah, Astrid) 3) Q4 hiring (Grace) 4) The kettle budget (Marcus, two minutes, strictly)."),
        T("marcus-oyelaran", 10090, "I need four minutes for the kettle budget."),
        T("priya-raman", 10085, "Three."),
        T("allison", 10000, "Otto beta readiness deck attached. Short version: 40 units, 38 ready, 2 with a suction-cup issue that Diego is on."),
        F("allison", 9995, "otto-beta-readiness-v3.pdf", "pdf", "3.1 MB"),
        T("astrid-nyberg", 9900, "Battery decision: hardware recommends the larger cell. It adds 11 grams and 40 minutes. Hannah has the graphs."),
        F("hannah-kowalski", 9895, "pip2-battery-options.xlsx", "sheet", "412 KB"),
        T("felix-brandt", 9800, "For the record, the larger cell changes the rear radius from 6 mm to 6.5 mm and I have made my peace with it."),
        T("chloe-dubois", 9795, "He has not made his peace with it."),
        T("felix-brandt", 9790, "I have not made my peace with it."),
        T("greta-lindqvist", 8600, "Good meeting. Notes: larger cell approved; Otto beta ships Monday; hiring plan approved for two engineers and one support role; kettle budget approved, in three minutes, Marcus."),
        T("marcus-oyelaran", 8590, "Three minutes and a new kettle. Gerald will be retiring to the hardware lab as a thermal test load."),
        T("lukas-meier", 8585, "Gerald will be honoured on the Wall."),
        T("ben-whitaker", 8580, "Gerald's farewell newsletter section is drafted. It is 400 words. Nadia has cut it to 60."),
        T("nadia-petrova", 8575, "Forty."),
        T("priya-raman", 2880, "Agenda for this Friday's Five: 1) Otto launch T-minus 11 (Allison, Dev) 2) Launch event logistics (Isla) 3) Support staffing for launch week (Jamal) 4) New kettle unboxing (Marcus, one minute, I am serious)."),
        T("jamal-carter", 2870, "Support staffing: extended hours all launch week. Maya and Oliver have volunteered. Teo has volunteered from Sofia, which is technically two hours ahead, which technically helps."),
        T("isla-macleod", 2860, "Venue confirmed for the launch party: 120 chairs, one stage, one very large window for Otto to demo on. Yes, I checked whether the window opens. No, it does not."),
        T("dev-chaudhary", 2000, "Adding an item: naming the firmware release. Options are 'Clear Skies', 'Streak-Free' and Connor's suggestion, which is 'Bob'."),
        T("connor-mcbride", 1995, "Bob is a strong name."),
        T("allison", 1400, "Pre-read for Friday attached. Please actually read it this time. Yes, Henrik, I saw the analytics."),
        F("allison", 1395, "otto-launch-t-minus-11.pdf", "pdf", "2.2 MB"),
        T("henrik-solberg", 1390, "Average read time last week was 41 seconds. It is a nine-page deck."),
        T("grace-thompson", 1300, "Reminder that the Friday Five is optional for anyone with childcare, trains, or a strong desire to go home. Notes are always posted here."),
        T("tomasz-wieczorek", 300, "I will be dialling in from the server room because the air-conditioning contractor is coming and I do not trust him alone with the racks.")
      ]
    },
    {
      id: "product-lab",
      name: "# Product Lab",
      topic: "Otto launch, Pip 2, and every idea that came out of a shower",
      memberIds: ["dev-chaudhary", "marisol-quintero", "henrik-solberg", "ngozi-eze", "felix-brandt", "chloe-dubois", "omar-haddad", "sanne-de-vries", "astrid-nyberg", "diego-alvarez", "yuki-tanaka", "jonas-petersen", "wei-zhang", "connor-mcbride", "greta-lindqvist"],
      adminId: "dev-chaudhary",
      createdDaysAgo: 420,
      instantSpeech: { active: true, speakers: ["dev-chaudhary", "omar-haddad", "sanne-de-vries"] },
      messages: [
        T("omar-haddad", 7200, "Beta household interview summary is in. Top three quotes: 'It looks like it is thinking', 'My cat has accepted it', and 'Why does it hum in D minor'."),
        T("wei-zhang", 7190, "The hum is the vision motor. D minor is a coincidence. A moody coincidence."),
        T("yuki-tanaka", 7180, "It is 147 Hz. I can shift it to 165 Hz if we want E. Do we want E?"),
        T("felix-brandt", 7170, "We want whatever key makes the corner radius feel intentional."),
        T("dev-chaudhary", 7100, "Serious item: three beta units reported Otto stopping at the window frame and reconsidering its life choices. Jonas, is that the edge detection?"),
        T("jonas-petersen", 7050, "It is the edge detection. It is being cautious near frames with dark trim. Fix is in review. Otto will be braver by Thursday."),
        T("connor-mcbride", 7045, "I will test Otto's bravery personally."),
        T("allison", 6000, "Decision needed by Wednesday: do we ship the 'schedule a clean' feature in the app at launch or in 1.1? Sanne has both designs. My lean is 1.1 so we can watch how people actually use Otto first."),
        F("sanne-de-vries", 5990, "otto-app-schedule-flow-v2.png", "image", "1.8 MB"),
        T("marisol-quintero", 5980, "Speaking from the Pip side: we shipped scheduling at launch and 70 percent of people set it once and never touched it again. 1.1 is fine."),
        T("henrik-solberg", 5975, "Data agrees with Marisol. 68 percent, technically, but yes."),
        T("ngozi-eze", 5970, "Support side: the top question in pre-order emails is 'can I schedule it'. So we should at least say 'coming soon' in the app."),
        T("allison", 5960, "Great. Decision: 1.1, with a 'coming in October' card at launch. Thanks all."),
        T("chloe-dubois", 4300, "New packaging sample arrived. The insert holds Otto like a tiny sleeping astronaut. Photos in a sec."),
        F("chloe-dubois", 4295, "otto-packaging-sample-03.jpg", "image", "3.3 MB"),
        T("astrid-nyberg", 4290, "Approved from hardware. Tell the supplier the foam density is right this time."),
        T("diego-alvarez", 4280, "Suction cup revision B passed 500 cycles on the test window. On the test window which, I would like to note, was cleaned by Otto."),
        T("greta-lindqvist", 4200, "This is the most self-sufficient robot we have ever built. Proud of this room."),
        T("dev-chaudhary", 2900, "T-minus 12. Launch checklist: firmware freeze (done), app store submission (Lena, Rafael, today), packaging (done), support macros (Ngozi, Jamal), launch video (Kwame, Sofia), press kit (Ben)."),
        T("yuki-tanaka", 2890, "Firmware freeze confirmed. Build 1.0.0-clearskies is tagged. If anyone names it Bob I will rename the repo."),
        T("connor-mcbride", 2885, "Bob."),
        V("dev-chaudhary", 2000, "Hey everyone, quick heads up: the app store review came back with one question about the camera permission text. Lena is handling it. Nothing scary, carry on."),
        T("omar-haddad", 1500, "Small thing that will make a big difference: beta users said the first-run screen is too clever. Suggest we say 'Put Otto on the window' instead of 'Let the adventure begin'."),
        T("allison", 1490, "Agreed. Sanne, can we swap the copy today? Ben will forgive us."),
        T("sanne-de-vries", 1480, "Swapped. 'Put Otto on the window.' Beautiful. Boring. Correct."),
        T("wei-zhang", 300, "Edge detection fix merged. Otto is now brave near dark trim. Not reckless. Brave."),
        T("jonas-petersen", 290, "Tested on nine windows including the ugly one in the kitchen. Nine out of nine.")
      ]
    },
    {
      id: "lunch-crew",
      name: "# Lunch Crew",
      topic: "Where are we eating and who forgot their wallet",
      memberIds: ["marcus-oyelaran", "ben-whitaker", "chloe-dubois", "bea-oduya", "lukas-meier", "diego-alvarez", "hannah-kowalski", "leo-nakamura", "aisha-khan", "jamal-carter", "nina-berg"],
      adminId: "marcus-oyelaran",
      createdDaysAgo: 300,
      instantSpeech: { active: false, speakers: ["marcus-oyelaran", "ben-whitaker"] },
      messages: [
        T("marcus-oyelaran", 5900, "Lunch poll: 1) the falafel van 2) the noodle place 3) sad desk sandwich. Vote with emoji or with dignity."),
        T("bea-oduya", 5895, "Falafel. Always falafel."),
        T("lukas-meier", 5890, "Noodles. The falafel van judges me for ordering extra pickles."),
        T("ben-whitaker", 5885, "The falafel van judges everyone. It is part of the experience."),
        T("chloe-dubois", 5880, "Falafel, but can someone bring me one back? I am gluing a robot."),
        T("diego-alvarez", 5875, "Bringing Chloe a falafel. Chloe, what are you gluing?"),
        T("chloe-dubois", 5870, "Do not worry about it."),
        T("marcus-oyelaran", 4500, "Result: falafel 7, noodles 3, desk sandwich 1 (Hannah, who was in a meeting)."),
        T("hannah-kowalski", 4495, "The sandwich was fine. The meeting was not."),
        T("leo-nakamura", 3100, "New place opened on the corner. It does Thai food and has a cat. The cat is not on the menu; it is on the counter."),
        T("aisha-khan", 3095, "Cat lunch. Cat lunch. Cat lunch."),
        T("jamal-carter", 3090, "Support team votes cat lunch too."),
        T("nina-berg", 3085, "I have a customer call at one but I will accept a cat photo as a form of remote participation."),
        T("allison", 3080, "In. Can we go at 12:30 so I can finish the beta email first?"),
        T("marcus-oyelaran", 3075, "12:30 at the lifts. Bring cash, the card machine there is 'thinking about it'."),
        F("leo-nakamura", 2980, "cat-on-counter.jpg", "image", "1.9 MB"),
        T("ben-whitaker", 2975, "The cat has more followers than our newsletter."),
        T("marcus-oyelaran", 1440, "PSA: the fridge is being cleaned Friday. Anything unlabelled will be assumed to belong to Gerald and disposed of accordingly."),
        T("bea-oduya", 1435, "There is a yoghurt in there from before I joined. I have been watching it. It has become a friend."),
        T("lukas-meier", 1430, "Name it and it can go on the Wall."),
        T("diego-alvarez", 200, "Today: it is raining. Motion to order in and eat in the big room while we watch Otto clean the meeting room window?"),
        T("hannah-kowalski", 195, "That is the most on-brand lunch plan I have ever heard. Yes."),
        T("marcus-oyelaran", 190, "Ordering from the noodle place, votes in the thread by 12:15. Chloe, you are still gluing, I assume."),
        T("chloe-dubois", 185, "I am always gluing.")
      ]
    },
    {
      id: "music-swap",
      name: "# Music Swap",
      topic: "Office playlist politics and the songs we cannot stop playing",
      memberIds: ["nadia-petrova", "ben-whitaker", "kwame-boateng", "sofia-esposito", "henrik-solberg", "jonas-petersen", "yuki-tanaka", "felix-brandt", "marcus-oyelaran", "priya-raman", "samuel-adeyemi", "rafael-moreira", "sanne-de-vries", "maya-lindgren"],
      adminId: "nadia-petrova",
      createdDaysAgo: 240,
      instantSpeech: { active: true, speakers: ["nadia-petrova", "kwame-boateng", "henrik-solberg", "marcus-oyelaran"] },
      messages: [
        T("marcus-oyelaran", 8700, "The office speaker rules, again, for the new starters: mornings are lo-fi, afternoons are open season, nobody plays whale sounds. Henrik."),
        T("henrik-solberg", 8690, "Whale sounds improved my focus by 12 percent. I have the data."),
        T("nadia-petrova", 8685, "You have one data point and it is you."),
        T("kwame-boateng", 8000, "New from Kofi Mensah-Adjei just dropped on Kitaak: 'Sunrise on Oxford Street'. Track 3 is the launch video soundtrack if Legal clears it."),
        T("nadia-petrova", 7995, "Rosa is checking the licence. In the meantime it is playing on repeat in Marketing and nobody has complained."),
        T("ben-whitaker", 7990, "One person complained. It was me. Then it grew on me. Now I am the problem."),
        T("yuki-tanaka", 6500, "Request: the 'Deep Focus Mondays' playlist has a track with lyrics at minute 14. Whoever added it, I hear the word 'baby' every Monday at 9:14 and it ruins me."),
        T("jonas-petersen", 6495, "That was me. It is a good song. But I will move it to Friday Five PM."),
        T("felix-brandt", 6490, "Thank you. Monday is for piano and quiet suffering."),
        T("sofia-esposito", 5200, "Launch teaser is cut to 'Gold Dust Hour' by Amara Sol. Chef's kiss. Listen with the sound on."),
        F("sofia-esposito", 5195, "otto-teaser-audio-mix.mp3", "audio", "6.8 MB"),
        T("samuel-adeyemi", 5190, "Listened in the Manchester office. People from the other company on our floor asked what it was. We are a hit."),
        T("rafael-moreira", 4300, "Playlist idea: 'Hardware Lab Loud'. Lukas plays the same three Velvet Sprockets songs and I think we can do better."),
        T("marcus-oyelaran", 4295, "Lukas is not in this group, but he can feel this message."),
        T("allison", 4290, "I have made 'Hardware Lab Loud' on Kitaak. Twelve tracks. Two Velvet Sprockets, out of respect."),
        T("priya-raman", 4280, "Allison making playlists at 3 pm on a Tuesday is either a very good sign or a very bad sign for the launch."),
        T("allison", 4275, "Very good. The launch is fine. The playlist is also fine."),
        T("maya-lindgren", 3600, "Vote: what plays on the office speaker at the exact moment Otto goes live? I propose 'Get Down to Business'."),
        T("kwame-boateng", 3595, "The 'Launch Day Hype' playlist exists for exactly this reason. Track one is that. Track two is Neon Meridian. Track three is a surprise."),
        T("henrik-solberg", 3590, "If track three is whale sounds I will be vindicated."),
        T("nadia-petrova", 3585, "It is not whale sounds."),
        T("kwame-boateng", 3580, "It is not whale sounds."),
        T("sanne-de-vries", 2000, "Amsterdam desk report: Wren & Bramble's 'Two Small Rivers' is the best bike-to-work album of the year. Will not be taking questions."),
        T("ben-whitaker", 1995, "Taking one question: track 4 or track 6?"),
        T("sanne-de-vries", 1990, "Six. Obviously."),
        V("nadia-petrova", 600, "OK, playlist meeting, five minutes, Friday, right before the Five. We settle the whale question forever and then we never speak of it again."),
        T("henrik-solberg", 595, "Finally."),
        T("marcus-oyelaran", 590, "The whale question was settled in March. The answer was no."),
        T("jonas-petersen", 100, "Just discovered Eliza Fenwick's 'Winter Practice Room' on the recommended shelf. Working with it on. Otto is being very brave near the dark trim.")
      ]
    },
    {
      id: "engineering",
      name: "# Engineering",
      topic: "Deploys, firmware, and the pager that shall not be named",
      memberIds: byDept("Engineering"),
      adminId: "tomasz-wieczorek",
      createdDaysAgo: 812,
      instantSpeech: { active: false, speakers: ["yuki-tanaka", "aisha-khan"] },
      messages: [
        T("aisha-khan", 5760, "Pager tally for August: 6 alerts, 2 real, 1 caused by a robot vacuum unplugging the test rack. Not one of ours. A competitor's. It was a gift. It has been relocated."),
        T("samuel-adeyemi", 5750, "The queue backlog from Sunday was the telemetry batch job retrying itself into a corner. Fixed with a backoff and a stern comment."),
        T("ines-fernandez", 5740, "Dashboards are back to normal. Please stop refreshing them, Henrik, I can see you."),
        T("yuki-tanaka", 4400, "Firmware 1.0.0-clearskies release candidate is on the beta fleet. Known issues: none. Suspected issues: Connor."),
        T("connor-mcbride", 4395, "I found one. Otto's status light blinks twice when charging, three times when fully charged, and four times when I look at it funny."),
        T("wei-zhang", 4390, "The fourth blink is a reflection off your glasses. The vision team has verified this."),
        T("connor-mcbride", 4385, "I do not wear glasses."),
        T("wei-zhang", 4380, "Then we have a bug."),
        T("lena-hoffmann", 3600, "iOS build 2.4.0 submitted. Camera permission copy updated per app store review: 'Otto uses the camera to find your window, not you.' Legal approved, Omar approved, my grandmother approved."),
        T("rafael-moreira", 3595, "Android build 2.4.0 is on the internal track. Tested on all fourteen phones. Ronaldo (the old one) crashed once but Ronaldo always crashes."),
        T("bea-oduya", 3500, "First PR to the firmware repo merged today. It was a one-line fix but I wrote a 40-line commit message and Yuki approved it, so."),
        T("yuki-tanaka", 3495, "Best commit message this year. Pinning it."),
        T("tomasz-wieczorek", 2900, "Security: rotating the fleet certificates Thursday 07:00. Otto units will reconnect within 2 minutes. Pip units within 5, because Pip is older and needs a moment."),
        T("jonas-petersen", 2895, "Pip needs a moment. Same."),
        F("samuel-adeyemi", 2500, "telemetry-pipeline-runbook.md", "doc", "88 KB"),
        T("aisha-khan", 2495, "Runbook is great. Section 4, 'What to do if it is 3 a.m.', is just the word 'Sleep' and I respect it."),
        T("allison", 2000, "Product question for the room: how long do we keep beta telemetry after launch? Rosa needs a number for the privacy page."),
        T("ines-fernandez", 1995, "90 days raw, aggregated forever, nothing personal. Same as Pip."),
        T("tomasz-wieczorek", 1990, "Confirmed. 90 days. Rosa has the doc."),
        T("lena-hoffmann", 1400, "App store approved. 2.4.0 is live in the phased rollout. Nobody touch anything."),
        T("connor-mcbride", 1395, "Touched it. Fine."),
        V("yuki-tanaka", 700, "Reminder that the firmware freeze means frozen. No hotfixes without me, Connor, and a cup of tea in the room. All three."),
        T("jonas-petersen", 300, "Edge detection fix merged. Otto no longer treats dark window frames as the edge of the known universe."),
        T("wei-zhang", 295, "Nine windows tested. Otto is brave."),
        T("bea-oduya", 290, "Otto is brave."),
        T("aisha-khan", 100, "Fleet health: 100 percent of beta units reporting. It is a beautiful day.")
      ]
    },
    {
      id: "hardware-lab",
      name: "# Hardware Lab",
      topic: "Torque values, drop tests and the Wall of Honor",
      memberIds: byDept("Hardware").concat(["chloe-dubois", "connor-mcbride", "yuki-tanaka"]),
      adminId: "astrid-nyberg",
      createdDaysAgo: 780,
      instantSpeech: { active: true, speakers: ["astrid-nyberg", "lukas-meier", "diego-alvarez"] },
      messages: [
        T("lukas-meier", 7300, "Drop test results, Otto production sample 7: survived 1.2 m onto tile, three times. Wall of Honor entry granted."),
        F("lukas-meier", 7295, "drop-test-otto-ps7.xlsx", "sheet", "220 KB"),
        T("astrid-nyberg", 7290, "Excellent. Make the plaque. Small one."),
        T("diego-alvarez", 7280, "Suction cup revision B: 500 cycles, no loss of grip. Also I have now measured every window in this building. The kitchen one is not square."),
        T("mateo-rossi", 7100, "Printed a bracket for the not-square kitchen window. It is a beautiful bracket for an ugly window."),
        T("priyanka-nair", 6800, "Otto charging dock: measured 0.3 W idle draw. Target was 0.5. Pleased. Do not touch my oscilloscope."),
        T("hannah-kowalski", 6795, "Battery cycling test at 300 cycles: 96 percent capacity. Ahead of Pip at the same point. Otto is a good child."),
        T("fatima-al-sayed", 6000, "Supply update: suction cup moulds ship Friday, brushes are already in Rotterdam, the little rubber feet are on a boat and the boat is where it should be."),
        T("astrid-nyberg", 5995, "'The boat is where it should be' is my favourite sentence this week."),
        T("chloe-dubois", 5200, "Packaging foam sample 3 approved by Astrid. I have also drawn a face on the sample. It is not in the spec. It is in my heart."),
        T("connor-mcbride", 5195, "Requesting a face in the spec."),
        T("astrid-nyberg", 5190, "Denied. Requested. Considered. Denied."),
        T("yuki-tanaka", 4400, "Firmware freeze is in place. If hardware changes anything now I need to know before it happens, not after, not during."),
        T("mateo-rossi", 4395, "Understood. I will print quietly."),
        T("lukas-meier", 3700, "Gerald the kettle has arrived in the lab as a thermal test load. He is now heating water for science. He is also heating water for tea. Both are science."),
        T("priyanka-nair", 3695, "Gerald draws 2.9 kW and has a personality. Logged."),
        T("allison", 3000, "Question for the lab: can we show a production unit at the launch event on a real window, or are we still on beta units?"),
        T("astrid-nyberg", 2995, "Production sample 9 is yours. It is the good one. Do not let Connor near it."),
        T("connor-mcbride", 2990, "I would never."),
        V("diego-alvarez", 2000, "Hey, just tested the rev B cups on the big window in the meeting room and they hold at every angle. Even upside down. We should not do upside down, but they hold."),
        T("hannah-kowalski", 1500, "Final battery firmware constants sent to Yuki. Estimated runtime 42 minutes per charge: one large window or two normal ones."),
        F("fatima-al-sayed", 1400, "otto-supplier-timeline-sept.pdf", "pdf", "1.4 MB"),
        T("mateo-rossi", 600, "Printed twelve tiny Ottos for the launch party. Each one has a tiny suction cup. Each one works. Each one has a name and I will not be sharing them."),
        T("lukas-meier", 595, "Twelve entries on the Wall. Tiny plaques ordered."),
        T("astrid-nyberg", 90, "Lab is closed 5 pm sharp today. Go home. That includes me. Especially me.")
      ]
    }
  ];

  var dms = [
    { personId: "greta-lindqvist", messages: [
      T("greta-lindqvist", 15000, "Allison, do you have twenty minutes this week? I want to hear the beta story from you before I hear it from the numbers."),
      T("allison", 14980, "Of course. Thursday at 11? I will bring the three best quotes and the one worst one."),
      T("greta-lindqvist", 14970, "The worst one is always the useful one. Thursday at 11."),
      T("allison", 8600, "Beta recap sent. The worst quote was 'it is slower than I expected but I kind of like watching it', which I think is a compliment wearing a disguise."),
      T("greta-lindqvist", 8500, "It is. We built a slow robot that people watch. That is the whole company in one sentence."),
      T("greta-lindqvist", 2800, "Also: I heard you moved the schedule feature to 1.1. Good call. Shipping less at launch is a skill."),
      T("allison", 2790, "Thank you. Henrik has the graph to prove it was correct, which is the only way to win that argument."),
      T("greta-lindqvist", 400, "Go home on time tonight. That is not a suggestion, it is an all-hands message with your name on it."),
      T("allison", 390, "Leaving at 5:30. Otto is watching me.")
    ] },
    { personId: "dev-chaudhary", messages: [
      T("dev-chaudhary", 12000, "Countdown board update: I made it three colours. Green is done, amber is in progress, red is 'Allison is worried'."),
      T("allison", 11990, "There is only one red item and it is the packaging foam, which is now green. Please update your fiction."),
      T("dev-chaudhary", 11980, "Updated. Board is now 90 percent green and 10 percent Connor."),
      T("allison", 7000, "Can we move the app store submission to Wednesday? Lena wants one more pass at the permission copy."),
      T("dev-chaudhary", 6990, "Yes. Also I want the 'coming in October' card to say something warmer than 'coming in October'."),
      T("allison", 6980, "'Scheduling arrives in October. Otto is practising.'"),
      T("dev-chaudhary", 6970, "Sold."),
      T("dev-chaudhary", 1500, "T-minus 12. Are you sleeping?"),
      T("allison", 1490, "Seven hours. Recorded. Henrik has a graph."),
      T("dev-chaudhary", 200, "Launch dry run at 2 tomorrow in the big room. Bring the good production unit and a spare suction cup.")
    ] },
    { personId: "marisol-quintero", messages: [
      T("marisol-quintero", 18000, "Bom dia! Pip 2 planning question: did Otto's app keep the little 'thinking' animation? Kwame wants to reuse it."),
      T("allison", 17980, "Kept it. Users love it. One of them named the animation 'the ponder'."),
      T("marisol-quintero", 17970, "The ponder. I am stealing that for the Pip 2 release notes."),
      T("allison", 9000, "How did Pip handle the first week of support after launch? I want to be ready."),
      T("marisol-quintero", 8980, "Three things: people put it in the wrong pot, people put it in the right pot with no water, and people asked if it could water the neighbour's plants. Have macros for all three."),
      T("allison", 8970, "Wrong window, no power, neighbour's window. Got it."),
      F("marisol-quintero", 3000, "pastel-de-nata-ranking-2026.xlsx", "sheet", "64 KB"),
      T("marisol-quintero", 2990, "Updated ranking. The bakery near the office moved up to number 2. Come to Lisbon and dispute it."),
      T("allison", 2980, "After launch I am flying out purely to argue with this spreadsheet.")
    ] },
    { personId: "henrik-solberg", messages: [
      T("henrik-solberg", 13000, "Beta dashboard is live. Average clean time 38 minutes, median 34. One outlier of three hours, which was a user who let Otto do the conservatory."),
      T("allison", 12980, "The conservatory is a hero story. Can you flag that household to Omar?"),
      T("henrik-solberg", 12970, "Flagged. Also, whale sounds: 12 percent focus improvement. I have added it as an appendix."),
      T("allison", 12960, "Henrik."),
      T("henrik-solberg", 12950, "Removed the appendix."),
      F("henrik-solberg", 4000, "otto-beta-week2.xlsx", "sheet", "1.1 MB"),
      T("allison", 3990, "This is great. Can we get the 'windows per week' chart on one slide for Friday?"),
      T("henrik-solberg", 3980, "Already done. Slide 4. Predicted read time: 41 seconds."),
      T("allison", 3970, "I will read it for a full minute out of spite.")
    ] },
    { personId: "ngozi-eze", messages: [
      T("ngozi-eze", 16000, "Hi Allison! Draft support macros for the Otto launch are ready. Three big ones: wrong window, no power, and 'it is looking at me'."),
      T("allison", 15980, "'It is looking at me' is going to be 40 percent of tickets. Let's make that one warm."),
      T("ngozi-eze", 15970, "Draft: 'Otto is checking the window edge, not you. He is a little shy about it.'"),
      T("allison", 15960, "Perfect. Keep 'he'. The beta households all call it he."),
      T("ngozi-eze", 7000, "Customer from the beta, Mrs Achebe in Bath, wants to know if she can keep the unit. She says Otto and her cat are friends now."),
      T("allison", 6980, "Tell her yes, and ask for a photo of the cat."),
      F("ngozi-eze", 6970, "otto-and-cat-bath.jpg", "image", "2.1 MB"),
      T("allison", 6960, "That is going in the launch deck. Slide one."),
      T("ngozi-eze", 800, "Six months in today! Still cannot believe I get to name macros for a living."),
      T("allison", 790, "Six months and you are already the reason support will survive launch week. Cake at 3?")
    ] },
    { personId: "tomasz-wieczorek", messages: [
      T("tomasz-wieczorek", 14000, "Your Kitaak session on the old laptop is still active. Is that you or is that a laptop in a drawer?"),
      T("allison", 13980, "Drawer. Kill it."),
      T("tomasz-wieczorek", 13970, "Killed. The drawer laptop has been very quiet since."),
      T("tomasz-wieczorek", 6000, "For the launch event I am setting up a separate guest network so 120 journalists do not sit on the same Wi-Fi as the demo unit."),
      T("allison", 5980, "Thank you. Can the demo unit have a wired backup as well?"),
      T("tomasz-wieczorek", 5970, "It already does. I ran the cable myself. Nobody else is allowed to touch it."),
      T("allison", 2000, "Henrik's password thing at all-hands. Was it really him?"),
      T("tomasz-wieczorek", 1990, "I never name names in public. It was Henrik."),
      T("allison", 1980, "Understood."),
      T("tomasz-wieczorek", 300, "Certificate rotation is done. Your Otto reconnected in 41 seconds. Fastest in the fleet. Tell it well done.")
    ] },
    { personId: "yuki-tanaka", messages: [
      T("allison", 9000, "Happy birthday! The sugar Pip was Chloe's idea but I ate a leg, sorry."),
      T("yuki-tanaka", 8980, "Thank you. The leg was structurally the weakest part; you did it a kindness."),
      T("allison", 5000, "Quick one: is there any risk to the freeze if hardware changes the battery constants?"),
      T("yuki-tanaka", 4980, "Hannah's constants are already in the build. Anything after this is 1.0.1. I have said this to Mateo in three languages."),
      T("allison", 4970, "Perfect. I will stop asking."),
      T("yuki-tanaka", 4960, "You may ask. You may not change."),
      V("yuki-tanaka", 1200, "The build is tagged, the release notes are in the repo, and I am going for a walk. Do not let Connor name anything while I am gone."),
      T("allison", 1190, "Connor has been contained."),
      T("yuki-tanaka", 100, "Kitaak recommended me a Kettle Static album, presumably because I said 'kettle' in this chat. It is quite good.")
    ] },
    { personId: "samuel-adeyemi", messages: [
      T("samuel-adeyemi", 11000, "Everything is a queue. The launch is a queue. The pre-orders are a queue. Your inbox is a queue."),
      T("allison", 10980, "My inbox is a landfill."),
      T("samuel-adeyemi", 10970, "A landfill is a queue with no consumer."),
      T("allison", 7000, "Can the telemetry backend handle 5,000 Ottos coming online on launch day?"),
      T("samuel-adeyemi", 6980, "Load tested to 50,000 this morning. Aisha and I are bored. Send more robots."),
      F("allison", 6970, "otto-preorder-forecast.xlsx", "sheet", "310 KB"),
      T("samuel-adeyemi", 6960, "Ha. 11,000 pre-orders. That is a nice queue."),
      T("samuel-adeyemi", 900, "Manchester office question: is there an Otto I can borrow for the window here? It is disgusting and I want to show off."),
      T("allison", 890, "Beta unit 39 is yours. Return it clean. It will return itself clean.")
    ] },
    { personId: "lena-hoffmann", messages: [
      T("lena-hoffmann", 12500, "Grandmother test result for 2.4.0: she found the 'start clean' button in four seconds and then asked why it does not do the dishes."),
      T("allison", 12480, "Put her on the roadmap committee."),
      T("lena-hoffmann", 12470, "She would run it better than us."),
      T("allison", 6000, "The app store question came back. Do you need anything from product for the camera permission text?"),
      T("lena-hoffmann", 5980, "Sorted. 'Otto uses the camera to find your window, not you.' Omar loved it. Rosa loved it. My grandmother said 'obviously'."),
      T("allison", 5970, "The strongest possible approval."),
      T("lena-hoffmann", 1400, "Approved and rolling out. Berlin is celebrating with a pretzel."),
      T("allison", 1390, "Bristol is celebrating with Gerald's replacement. It is a mixed mood."),
      T("lena-hoffmann", 200, "Listening to Eliza Fenwick while watching the rollout graph go up. This is peak calm.")
    ] },
    { personId: "rafael-moreira", messages: [
      T("rafael-moreira", 13000, "Otto app tested on Ronaldo, Figo, Eusebio, Pepe and the ten others. Only Ronaldo crashed. Ronaldo always crashes. Ronaldo is from 2016."),
      T("allison", 12980, "Can we retire Ronaldo?"),
      T("rafael-moreira", 12970, "Never. Ronaldo is our minimum supported device and our emotional support device."),
      T("allison", 5500, "Any difference between Android and iOS on the first-run copy? Omar wants both to say 'Put Otto on the window'."),
      T("rafael-moreira", 5480, "Both say it. Both are boring. Both are correct."),
      F("rafael-moreira", 2000, "android-2.4.0-test-matrix.xlsx", "sheet", "140 KB"),
      T("allison", 1990, "Thank you for the matrix. Fifteen phones is a lot of phones."),
      T("rafael-moreira", 1980, "Fourteen phones and Ronaldo."),
      T("rafael-moreira", 300, "Porto is sunny. The window here is filthy. I am considering ordering an Otto with my own money like a normal customer.")
    ] },
    { personId: "aisha-khan", messages: [
      T("aisha-khan", 14000, "Fleet is healthy. Pager is quiet. I am suspicious."),
      T("allison", 13980, "What would make you less suspicious?"),
      T("aisha-khan", 13970, "A small, easily solvable alert at 2 pm. Just to keep me sharp."),
      T("aisha-khan", 7000, "Load test done with Samuel. 50,000 simulated Ottos, all reconnecting at once. Autoscaling behaved. I have never been so calm."),
      T("allison", 6980, "This is the most reassuring message I have had all week. Framing it."),
      T("aisha-khan", 6970, "Do not frame it. Framing it is how you get paged."),
      T("allison", 1500, "Launch day: what do you need from product?"),
      T("aisha-khan", 1480, "A launch time, a fallback launch time, and nobody 'just trying something' in production between 9 and 12."),
      T("allison", 1470, "10 am, 11 am fallback, and I will personally sit on Connor."),
      T("aisha-khan", 90, "Ambient playlist on, dashboards green, tea hot. If you need me I will be exactly here.")
    ] },
    { personId: "connor-mcbride", messages: [
      T("connor-mcbride", 15000, "Broke Otto today. Put it on a mirror. It cleaned its own reflection for twelve minutes and then gave up."),
      T("allison", 14980, "Is that a bug or a feature?"),
      T("connor-mcbride", 14970, "It is a philosophy."),
      T("connor-mcbride", 8000, "Bug report attached. Severity: low. Title: 'Otto hums in D minor and it makes me sad'."),
      F("connor-mcbride", 7995, "bug-0412-hum-d-minor.pdf", "pdf", "180 KB"),
      T("allison", 7980, "Closing as 'working as intended, please listen to Kitaak instead'."),
      T("connor-mcbride", 7970, "Accepted. I have opened a new one: 'Kitaak recommended me whale sounds'."),
      T("allison", 3000, "Please do not breathe on the frozen firmware."),
      T("connor-mcbride", 2990, "Too late. It is fine. It is always fine. That is the job."),
      T("connor-mcbride", 500, "Glasgow update: it is raining sideways and I have tested Otto on the outside of the window. Do not tell Astrid."),
      T("allison", 490, "Astrid can feel this message.")
    ] },
    { personId: "ines-fernandez", messages: [
      T("ines-fernandez", 16000, "Your beta dashboard now updates every five minutes instead of hourly. You are welcome. Please refresh less."),
      T("allison", 15980, "I refreshed once. Henrik refreshed the other 400 times."),
      T("ines-fernandez", 15970, "I know. I can see the logs. I have named the pattern 'the Henrik'."),
      T("allison", 7000, "Question for the privacy page: raw telemetry retention?"),
      T("ines-fernandez", 6980, "90 days raw, aggregated after. Rosa has it in writing, with my signature, which I added for the drama."),
      F("ines-fernandez", 2500, "board-deck-charts-sept.pdf", "pdf", "2.6 MB"),
      T("ines-fernandez", 2490, "Charts for the board deck. Screenshot them, everyone does."),
      T("allison", 2480, "Already screenshotted. Slide 6 is beautiful."),
      T("ines-fernandez", 400, "Madrid is 34 degrees. I am working from the one cafe with air conditioning and a jazz playlist. Kitaak's, obviously.")
    ] },
    { personId: "jonas-petersen", messages: [
      T("jonas-petersen", 14000, "Edge detection story: Otto was treating dark trim as 'the end of the world' and reversing. Now it checks twice and proceeds. Like a Dane crossing a road."),
      T("allison", 13980, "Is that in the release notes?"),
      T("jonas-petersen", 13970, "The release notes say 'improved edge detection near dark frames'. The real story is in my heart."),
      T("allison", 5000, "Any windows Otto still cannot do?"),
      T("jonas-petersen", 4980, "Stained glass. Round portholes. And the one in our kitchen, because it is not square, but that is a building problem."),
      T("allison", 4970, "Adding 'no stained glass' to the FAQ."),
      T("jonas-petersen", 2000, "My cat sat on Otto today while it was charging. Otto did not mind. The cat did not mind. I minded, briefly, for the camera."),
      V("jonas-petersen", 1200, "Nine windows tested, all clean, the ugly kitchen one included. I am going to go and look at some more windows now."),
      T("allison", 1190, "You and Diego need a support group.")
    ] },
    { personId: "wei-zhang", messages: [
      T("wei-zhang", 12000, "Fun fact: the vision model has seen 200,000 smudges. It could recognise your fingerprint on glass from across the room. It will not, because that would be rude."),
      T("allison", 11980, "Please put that in the privacy page exactly like that."),
      T("wei-zhang", 11970, "Rosa said no. Rosa said 'Otto does not identify people'. Same thing, fewer jokes."),
      T("allison", 5000, "The 'it is looking at me' support question: what does Otto actually do?"),
      T("wei-zhang", 4980, "It looks at the edge of the frame for 0.4 seconds and then at the glass. It never looks at the room. There is no room in its world. Only glass."),
      T("allison", 4970, "Only glass. That is going on a t-shirt."),
      F("wei-zhang", 1500, "vision-model-v7-summary.pdf", "pdf", "980 KB"),
      T("wei-zhang", 300, "Edge fix merged with Jonas. Nine windows tested. If you tell Henrik, I will add whale sounds to the vision model.")
    ] },
    { personId: "bea-oduya", messages: [
      T("bea-oduya", 17000, "Hi Allison! Leo said you are the person to ask about how product decisions actually get made here. Is there a doc, or is it vibes?"),
      T("allison", 16980, "Forty percent doc, sixty percent vibes, one hundred percent Henrik's graphs. Come to Product Lab on Tuesday and watch."),
      T("bea-oduya", 16970, "Thank you! I will bring a notebook and no opinions."),
      T("allison", 16960, "Bring opinions. Small ones."),
      T("bea-oduya", 3500, "MY FIRST PR MERGED. It was one line. The commit message was forty. Yuki pinned it."),
      T("allison", 3480, "Forty lines of commit message is the correct amount for a first PR. Congratulations. Screenshot it."),
      F("bea-oduya", 3470, "first-pr-screenshot.png", "image", "640 KB"),
      T("allison", 3460, "Framed. Emotionally."),
      T("bea-oduya", 600, "The yoghurt in the fridge is now called Gerald Junior. Lukas has made a plaque.")
    ] }
  ];

  dms = dms.concat([
    { personId: "felix-brandt", messages: [
      T("felix-brandt", 13000, "The launch deck uses a 4 px radius on the screenshots and a 6 px radius on the buttons. I have fixed it. It is 6 everywhere now. You are welcome."),
      T("allison", 12980, "I did not notice."),
      T("felix-brandt", 12970, "Nobody notices. Everybody feels."),
      T("allison", 7000, "Otto's status light: users say 'it looks like it is thinking'. Is that the pulse timing?"),
      T("felix-brandt", 6980, "1.4 seconds in, 1.8 out. Kwame tuned it for a year. It is the most designed thing in the building."),
      F("felix-brandt", 3000, "otto-launch-visual-language.pdf", "pdf", "4.2 MB"),
      T("allison", 2980, "This is beautiful. Page 9 with the tiny Ottos is my favourite."),
      T("felix-brandt", 2970, "Page 9 has a 6.5 mm radius. I have not made my peace with it."),
      T("allison", 2960, "You said that in the Friday Five."),
      T("felix-brandt", 2950, "And I will say it again.")
    ] },
    { personId: "chloe-dubois", messages: [
      T("chloe-dubois", 15000, "Sketched a robot that dusts the tops of door frames. On a napkin. At lunch. It is called 'Lofty'. Do not tell Dev."),
      T("allison", 14980, "Dev will see this."),
      T("chloe-dubois", 14970, "Dev is not in this chat. Which is the point of this chat."),
      T("allison", 8000, "The packaging insert: can the foam be a slightly softer grey? Nadia says it photographs cold."),
      T("chloe-dubois", 7980, "Already changed it to 'warm pebble'. It is a colour I made up. The supplier accepted it."),
      F("chloe-dubois", 4000, "lofty-napkin-sketch.jpg", "image", "1.5 MB"),
      T("allison", 3990, "I love it and I am going to pretend I did not see it until after launch."),
      T("chloe-dubois", 3980, "That is all I ask."),
      T("chloe-dubois", 300, "Still gluing. Nobody ask what.")
    ] },
    { personId: "omar-haddad", messages: [
      T("omar-haddad", 14000, "Beta interview reel is ready. Twelve households, nine minutes. I cut the cat in three times because the cat is the best participant we have ever had."),
      T("allison", 13980, "The cat is our target market."),
      T("omar-haddad", 13970, "The cat has no purchasing power but enormous influence."),
      T("omar-haddad", 6000, "Finding you should know: three users put Otto on the window and then stood there watching for the whole 38 minutes. Two said it was 'relaxing'. One said 'I did not know what else to do'."),
      T("allison", 5980, "We should tell them to go and make tea. In the app. 'Otto has this. Go and make tea.'"),
      T("omar-haddad", 5970, "I have written it down. It is the best copy we have."),
      T("allison", 3000, "First-run screen is now 'Put Otto on the window'. Confirmed with Sanne. Thank you for pushing on it."),
      T("omar-haddad", 2980, "Boring is a feature. Clever is a cost."),
      F("omar-haddad", 400, "beta-interview-summary.pdf", "pdf", "1.7 MB")
    ] },
    { personId: "sanne-de-vries", messages: [
      T("sanne-de-vries", 12000, "Schedule flow v2 attached. I cycled 14 km before it made sense. The trick was removing the calendar."),
      F("sanne-de-vries", 11995, "otto-schedule-flow-v2.png", "image", "1.8 MB"),
      T("allison", 11980, "Removing the calendar was the entire problem. This is great."),
      T("sanne-de-vries", 11970, "The calendar is now a single sentence: 'Clean every Sunday at 10.' People know what Sunday is."),
      T("allison", 5000, "Copy change: 'Put Otto on the window' for first run. Can you swap it today?"),
      T("sanne-de-vries", 4980, "Swapped. It is the least clever screen in the app. It is my favourite."),
      T("allison", 4970, "Boring is a feature."),
      T("sanne-de-vries", 4960, "Omar has been talking to you."),
      T("sanne-de-vries", 600, "Amsterdam is windy. Cycling home into it. Wren & Bramble on. Track six. Obviously.")
    ] },
    { personId: "kwame-boateng", messages: [
      T("kwame-boateng", 13000, "Pip's blink is 92 percent 'delightful' in testing. Otto's status pulse is at 88. I will not rest."),
      T("allison", 12980, "What is the other 12 percent?"),
      T("kwame-boateng", 12970, "Four percent 'fine', eight percent 'what is it doing'. The eight percent are the ones I think about at night."),
      T("allison", 6000, "Launch video: how is the cut?"),
      T("kwame-boateng", 5980, "Sofia's cut to Amara Sol is the one. 47 seconds. Otto goes up the window at the drop. I cried, professionally."),
      F("kwame-boateng", 5970, "otto-launch-video-storyboard.pdf", "pdf", "3.8 MB"),
      T("allison", 5960, "Frame 14 with the cat. Yes."),
      T("kwame-boateng", 2000, "Launch Day Hype playlist is done. Track three is a surprise. It is not whale sounds. Henrik has asked four times."),
      T("allison", 1990, "Do not tell me. I want to be surprised at the exact moment of launch.")
    ] },
    { personId: "astrid-nyberg", messages: [
      T("astrid-nyberg", 15000, "Production sample 9 is the good one. It is yours for the event. It has been torqued by me personally."),
      T("allison", 14980, "Does it have a name?"),
      T("astrid-nyberg", 14970, "It has a number. Numbers are names for things that work."),
      T("allison", 7000, "Any hardware risk I should know about for launch week?"),
      T("astrid-nyberg", 6980, "Suction cup moulds ship Friday. If the boat sinks, we have a problem. The boat is not going to sink. Fatima has a relationship with the boat."),
      T("allison", 6970, "Fatima has a relationship with everything."),
      T("astrid-nyberg", 6960, "That is why she is in Hardware."),
      F("astrid-nyberg", 2000, "otto-production-readiness.pdf", "pdf", "2.9 MB"),
      T("allison", 1990, "Read all fourteen pages. Henrik will confirm."),
      T("astrid-nyberg", 100, "Lab closed 5 pm. Go home. I am telling you what I told the lab.")
    ] },
    { personId: "diego-alvarez", messages: [
      T("diego-alvarez", 14000, "I counted the windows on my bus this morning. Twenty-two. Nine were dirty. Two were disgraceful."),
      T("allison", 13980, "Have you considered a hobby?"),
      T("diego-alvarez", 13970, "This is the hobby now."),
      T("allison", 6000, "Suction cup rev B: any concerns for the big meeting room window at the event?"),
      T("diego-alvarez", 5980, "None. Holds at every angle. I tested upside down. We are not doing upside down."),
      T("allison", 5970, "We are not doing upside down."),
      T("diego-alvarez", 5960, "We are not doing upside down."),
      V("diego-alvarez", 2000, "So I went to the venue and tested the rev B cups on the tempered glass there. They hold. Isla let me in. The window does not open. Otto does not need it to open."),
      T("diego-alvarez", 300, "Kitaak is playing Neon Meridian and I have cleaned my own kitchen window three times.")
    ] },
    { personId: "priyanka-nair", messages: [
      T("priyanka-nair", 16000, "Charging dock idle draw: 0.3 W. Target was 0.5. This is the best number in the building."),
      T("allison", 15980, "Can I put it in the launch deck?"),
      T("priyanka-nair", 15970, "You can put it in the launch deck. You cannot round it."),
      T("allison", 15960, "0.3 W. Not rounded."),
      T("priyanka-nair", 6000, "My status is 'do not disturb' because I am measuring the status light ripple. Nobody has respected it. You are the fourth."),
      T("allison", 5980, "Sorry. Is the ripple fine?"),
      T("priyanka-nair", 5970, "The ripple is fine. It is always fine. That is why it needs measuring."),
      F("priyanka-nair", 1000, "otto-power-budget-final.xlsx", "sheet", "260 KB"),
      T("priyanka-nair", 990, "Final power budget. If anyone touches my oscilloscope tonight it will show up on this spreadsheet.")
    ] },
    { personId: "lukas-meier", messages: [
      T("lukas-meier", 13000, "Production sample 7 is on the Wall. Plaque says 'Fell three times, rose three times'. Astrid said 'small plaque'. It is medium."),
      T("allison", 12980, "Is there a plaque for Gerald yet?"),
      T("lukas-meier", 12970, "Gerald's plaque is being engraved. 'He boiled.'"),
      T("allison", 6000, "The twelve tiny Ottos for the party: do they need drop tests?"),
      T("lukas-meier", 5980, "They have had drop tests. Twelve out of twelve. Twelve plaques. Mateo is furious about the plaque budget."),
      F("lukas-meier", 5970, "wall-of-honor-sept.jpg", "image", "2.7 MB"),
      T("allison", 5960, "This wall is the best thing in the building."),
      T("lukas-meier", 5950, "The Wall knows."),
      T("lukas-meier", 400, "Velvet Sprockets on in the lab. Rafael says I only play three songs. I play four.")
    ] },
    { personId: "fatima-al-sayed", messages: [
      T("fatima-al-sayed", 14000, "The suction cup mould supplier's daughter got into university. I sent a card from Marmalade. This is why our moulds ship on time."),
      T("allison", 13980, "You are the reason this company works."),
      T("fatima-al-sayed", 13970, "I am one of eleven reasons. I keep a list."),
      T("allison", 7000, "Any launch week risk on brushes or feet?"),
      T("fatima-al-sayed", 6980, "Brushes in Rotterdam, feet on the boat, boat where it should be. I check the boat every morning with my coffee."),
      F("fatima-al-sayed", 2000, "otto-supplier-timeline-sept.pdf", "pdf", "1.4 MB"),
      T("allison", 1990, "The chart is colour coded by boat. I love it."),
      T("fatima-al-sayed", 1980, "Every good chart has a boat."),
      T("fatima-al-sayed", 500, "Low Tide Cartography's 'Salt Rooms' is the correct album for tracking shipping. I do not make the rules.")
    ] },
    { personId: "mateo-rossi", messages: [
      T("mateo-rossi", 12000, "Printed the tiny Ottos. Twelve. Each has a cup, each has a name. I will not share the names."),
      T("allison", 11980, "One name. Please."),
      T("mateo-rossi", 11970, "One is called Allisotto. Do not read into it."),
      T("allison", 11960, "I am reading into it."),
      T("allison", 5000, "Yuki said no hardware changes during the freeze. Are you printing quietly?"),
      T("mateo-rossi", 4980, "I am printing so quietly the printer has started to whisper."),
      F("mateo-rossi", 2500, "tiny-otto-print-farm.jpg", "image", "2.2 MB"),
      T("allison", 2490, "Twelve tiny robots on a windowsill in Turin. This is the launch party invitation photo."),
      T("mateo-rossi", 300, "Turin is hot. The printer is hot. The funk playlist is hot. Everything is hot.")
    ] },
    { personId: "hannah-kowalski", messages: [
      T("hannah-kowalski", 15000, "Runtime is 42 minutes. One large window or two normal ones. I have measured 'normal' and it is a real number."),
      T("allison", 14980, "What is normal?"),
      T("hannah-kowalski", 14970, "1.2 square metres. Do not ask me about the conservatory."),
      T("allison", 7000, "Someone in the beta did the conservatory. Three hours."),
      T("hannah-kowalski", 6980, "Three hours means four charges. That user is a hero and a menace."),
      F("hannah-kowalski", 3000, "otto-battery-cycles-300.xlsx", "sheet", "520 KB"),
      T("allison", 2990, "96 percent at 300 cycles. That is a slide."),
      T("hannah-kowalski", 2980, "That is my whole year."),
      T("hannah-kowalski", 200, "Wren & Bramble on while I watch the cycler. Battery and folk. My brand.")
    ] },
    { personId: "nadia-petrova", messages: [
      T("nadia-petrova", 13000, "Otto tagline shortlist: 'Finally, the windows.' or 'Otto does the windows.' I am 60/40 for the first."),
      T("allison", 12980, "First. It sounds like a sigh of relief."),
      T("nadia-petrova", 12970, "That is exactly the brief."),
      T("allison", 6000, "Squeegee Todd as an official nickname?"),
      T("nadia-petrova", 5980, "Unofficial forever. Official never. The forum can keep it."),
      F("nadia-petrova", 3000, "otto-launch-press-kit.pdf", "pdf", "8.4 MB"),
      T("allison", 2990, "The page 3 quote is perfect. Ben is a wizard."),
      T("nadia-petrova", 2980, "Ben writes 400 words and I cut 360. That is the wizardry."),
      T("nadia-petrova", 500, "Also I named the new kettle. It is Gerald II. Marcus is furious. It is done.")
    ] },
    { personId: "ben-whitaker", messages: [
      T("ben-whitaker", 14000, "New kitchen sign draft: 'Your mother does not work here. Neither does Otto, yet.' Too much?"),
      T("allison", 13980, "Exactly enough."),
      T("ben-whitaker", 13970, "Nadia cut it to 'Wash your mug.'"),
      T("allison", 6000, "Launch email: can we lead with the cat photo?"),
      T("ben-whitaker", 5980, "Leading with the cat. Second paragraph is Otto. Third paragraph is the price. This is how the internet works."),
      F("ben-whitaker", 3000, "otto-launch-email-draft-v5.docx", "doc", "72 KB"),
      T("allison", 2990, "V5 is good. The 'Finally, the windows' line at the end is perfect."),
      T("ben-whitaker", 2980, "Nadia cut it to 'Finally.' I fought for 'the windows'. I won."),
      T("ben-whitaker", 400, "Gerald's farewell paragraph is 40 words now. Every one of them a tear.")
    ] },
    { personId: "sofia-esposito", messages: [
      T("sofia-esposito", 15000, "The Pip-falls-off-desk video hit two million. The merch line is called 'Pip Fell' and it is sold out. Do we have an Otto equivalent?"),
      T("allison", 14980, "Please do not make Otto fall off a window."),
      T("sofia-esposito", 14970, "I would never. Unless it is very funny."),
      T("allison", 6000, "How is the launch teaser cut?"),
      T("sofia-esposito", 5980, "Cut to Amara Sol, 47 seconds, Otto goes up at the drop. Kwame cried. I cried. The cat did not cry."),
      F("sofia-esposito", 5970, "otto-teaser-audio-mix.mp3", "audio", "6.8 MB"),
      T("allison", 5960, "This is beautiful. Do we have the licence?"),
      T("sofia-esposito", 5950, "Rosa is on it. Rosa is always on it."),
      T("sofia-esposito", 300, "The Milan office window is being cleaned by an Otto on camera for a 'day in the life' story. It is very slow content and the internet loves it.")
    ] },
    { personId: "arjun-mehta", messages: [
      T("arjun-mehta", 13000, "Pre-order page experiment: the version with the cat converted 31 percent better. Cats are not a variable. Cats are a constant."),
      T("allison", 12980, "So we lead with the cat."),
      T("arjun-mehta", 12970, "We lead with the cat. We follow with the cat. We close with the cat."),
      T("allison", 6000, "Pre-order number?"),
      T("arjun-mehta", 5980, "11,204 as of this morning. Small win: the 'schedule coming in October' card did not hurt conversion at all. Celebrating loudly."),
      F("arjun-mehta", 5970, "preorder-dashboard-sept.xlsx", "sheet", "410 KB"),
      T("allison", 5960, "Loud celebration approved."),
      T("arjun-mehta", 300, "Neon Meridian on and a conversion graph going up. This is my whole personality now.")
    ] },
    { personId: "isla-macleod", messages: [
      T("isla-macleod", 14000, "The venue has 120 chairs. I counted. Twice. The venue said 130. The venue was wrong."),
      T("allison", 13980, "How many people are we expecting?"),
      T("isla-macleod", 13970, "118. I have a margin of two chairs and I am not comfortable with it."),
      T("allison", 6000, "The demo window: does it open?"),
      T("isla-macleod", 5980, "It does not open. Diego came and tested the cups on it. He also cleaned it. The venue wants to hire him."),
      F("isla-macleod", 5970, "launch-party-run-of-show.pdf", "pdf", "540 KB"),
      T("allison", 5960, "This run of show is perfect. '7:42 pm: Otto goes up' is a dramatic timestamp."),
      T("isla-macleod", 5950, "It is when the light is best. Kwame checked."),
      T("isla-macleod", 400, "Train down from Edinburgh on Thursday. Bringing a tablet, cable ties, and four extra chairs in spirit.")
    ] }
  ]);

  dms = dms.concat([
    { personId: "priya-raman", messages: [
      T("priya-raman", 16000, "Admin note: I have added you as an owner of the Product Lab channel. Please do not rename it 'Bob'."),
      T("allison", 15980, "That was Connor's idea."),
      T("priya-raman", 15970, "Everything is Connor's idea. That is why he is not an admin."),
      T("allison", 7000, "Can we get a Kitaak guest room for the beta households during launch week?"),
      T("priya-raman", 6980, "Done. Guest room 'Otto Beta Owners'. Zara moderates. Tomasz has set it to expire in 30 days, because Tomasz."),
      T("allison", 6970, "Thank you. Also: the mystery mug item?"),
      T("priya-raman", 6960, "Thirty-one mugs in the hardware lab. Marcus is presenting with slides."),
      F("priya-raman", 2000, "all-hands-notes-sept.docx", "doc", "44 KB"),
      T("allison", 1990, "Notes read. The mug slide is a masterpiece."),
      T("priya-raman", 200, "Also: go home on time tonight. Greta asked me to check. I am checking.")
    ] },
    { personId: "marcus-oyelaran", messages: [
      T("marcus-oyelaran", 15000, "The mugs. Thirty-one. All in the hardware lab. Fourteen of them have tea in them. Three of them have something that is not tea."),
      T("allison", 14980, "What is in the three?"),
      T("marcus-oyelaran", 14970, "Lukas says 'science'. I say 'mould'. We have agreed on 'a project'."),
      T("allison", 6000, "Gerald's retirement: is there a ceremony?"),
      T("marcus-oyelaran", 5980, "Friday, 4:55 pm, kitchen. Ben reads forty words. Lukas presents a plaque. Gerald boils one last time. Then he goes to the lab as a test load."),
      T("marcus-oyelaran", 5970, "Nadia named the new one Gerald II without asking. I am not speaking to Marketing."),
      T("allison", 5960, "You are in Music Swap with her."),
      T("marcus-oyelaran", 5950, "Music Swap is neutral ground."),
      T("marcus-oyelaran", 300, "Noodles ordered. Big room. Otto is on the window. Everyone is watching it instead of eating. Working as intended.")
    ] },
    { personId: "elin-johansson", messages: [
      T("elin-johansson", 13000, "Pallet 14 (suction cups) cleared customs in Rotterdam. Pallet 15 (feet) is on the boat. Pallet 16 (brushes) is already in the loading bay because the driver was early and nobody was there. I was there. Remotely."),
      T("allison", 12980, "You are the eyes of the loading bay."),
      T("elin-johansson", 12970, "I am the eyes of every loading bay between here and Shenzhen."),
      T("allison", 6000, "Launch day: when do the first customer units leave?"),
      T("elin-johansson", 5980, "Courier pickup 6 am on launch day. 3,000 units in the first wave. I have the customs code memorised and I will recite it at the party if asked."),
      F("elin-johansson", 5970, "launch-wave-1-shipping-plan.xlsx", "sheet", "380 KB"),
      T("allison", 5960, "Do not let anyone ask you at the party."),
      T("elin-johansson", 400, "Ambient on, boat tracking open, coffee number three. Gothenburg is grey and I love it.")
    ] },
    { personId: "david-okonkwo", messages: [
      T("david-okonkwo", 14000, "Your expense for 'twelve tiny suction cups, launch demo' has been approved. With a smile. And a spreadsheet."),
      T("allison", 13980, "The spreadsheet or the smile first?"),
      T("david-okonkwo", 13970, "Spreadsheet. Always. The smile is a formula."),
      T("allison", 6000, "Launch party budget: are we OK?"),
      T("david-okonkwo", 5980, "Under by 4 percent because Isla negotiated the chairs. I do not know how. I did not ask."),
      F("david-okonkwo", 5970, "q3-launch-budget-actuals.xlsx", "sheet", "290 KB"),
      T("allison", 5960, "Row 12, 'Gerald II', is a line item."),
      T("david-okonkwo", 5950, "Gerald II is a capital expense. He will be depreciated over five years. With respect."),
      T("david-okonkwo", 300, "Oskar Blume Quartet on while I close the month. Jazz and reconciliations. Nobody understands.")
    ] },
    { personId: "rosa-martinez", messages: [
      T("rosa-martinez", 13000, "The Amara Sol licence for the launch video is cleared. I read 41 pages. Page 27 has a clause about llamas. It does not apply to us."),
      T("allison", 12980, "I want to know about the llamas."),
      T("rosa-martinez", 12970, "It is a very good clause. Ask me at the party."),
      T("allison", 6000, "Privacy page: 90 days raw telemetry, Ines confirmed. Anything else you need from me?"),
      T("rosa-martinez", 5980, "One sentence: 'Otto does not identify people.' Wei wanted 'Otto has no room in its world, only glass'. I said no. I am a little sorry."),
      F("rosa-martinez", 5970, "otto-privacy-page-final.pdf", "pdf", "320 KB"),
      T("allison", 5960, "Approved. The llama clause is my favourite thing you have ever said."),
      T("rosa-martinez", 400, "Neo-classical on while I read the warranty terms. It is the only way.")
    ] },
    { personId: "grace-thompson", messages: [
      T("grace-thompson", 15000, "Yuki's birthday is Wednesday. Lemon drizzle. Chloe is making a sugar Pip. Do not eat the sugar Pip."),
      T("allison", 14980, "I ate a leg."),
      T("grace-thompson", 14970, "I know. Yuki forgave you. I have not."),
      T("allison", 6000, "Hiring: are the two engineering roles up?"),
      T("grace-thompson", 5980, "Up since Monday. Leo has sixty applicants and has discussed bread with at least twenty of them."),
      F("grace-thompson", 5970, "q4-hiring-plan.pdf", "pdf", "410 KB"),
      T("allison", 5960, "Thank you. Also: the launch week wellbeing note?"),
      T("grace-thompson", 5950, "Going out tomorrow. Short version: extended hours are voluntary, cake is mandatory, go home on time."),
      T("grace-thompson", 300, "Your work anniversary is next month. Three years. I already know your cake preference. Do not tell me it has changed.")
    ] },
    { personId: "leo-nakamura", messages: [
      T("leo-nakamura", 13000, "Interviewed a robotics engineer today. Forty minutes on path planning, twenty on sourdough. Strong hire."),
      T("allison", 12980, "Which was the deciding factor?"),
      T("leo-nakamura", 12970, "Path planning. But the sourdough was very good."),
      T("allison", 6000, "Bea asked me how product decisions get made. I said forty percent docs, sixty percent vibes."),
      T("leo-nakamura", 5980, "That is what I tell candidates. I add 'and one hundred percent Henrik'."),
      T("leo-nakamura", 2500, "The Thai place with the cat. Thursday. I have already told the cat."),
      T("allison", 2490, "In. 12:30."),
      T("leo-nakamura", 300, "Lo-fi on, sixty CVs open, bread proving at home. Balanced life.")
    ] },
    { personId: "amelie-laurent", messages: [
      T("amelie-laurent", 14000, "Bonjour Allison! The onboarding kit for the two new engineers: do we include a tiny Otto? Mateo has offered. Mateo has offered very strongly."),
      T("allison", 13980, "Yes to the tiny Otto. Each one has a name, apparently."),
      T("amelie-laurent", 13970, "Then I need the names for the welcome cards. Mateo refuses. This is a standoff."),
      T("allison", 13960, "One of them is Allisotto."),
      T("amelie-laurent", 13950, "I will put that on a card and see what happens."),
      F("amelie-laurent", 6000, "onboarding-checklist-v9.xlsx", "sheet", "96 KB"),
      T("allison", 5980, "V9 has a tab called 'Kettle etiquette'. This is the greatest spreadsheet I have ever seen."),
      T("amelie-laurent", 5970, "Marcus wrote the tab. I only made it pretty."),
      T("amelie-laurent", 300, "Lyon is warm, Eliza Fenwick is on, and the welcome cards are printed. Allisotto is on one of them.")
    ] },
    { personId: "jamal-carter", messages: [
      T("jamal-carter", 15000, "Support inbox hit zero for four minutes. Screenshot attached. I am framing it."),
      F("jamal-carter", 14995, "inbox-zero-4-minutes.png", "image", "410 KB"),
      T("allison", 14980, "Four minutes is a long time in support."),
      T("jamal-carter", 14970, "It is a lifetime. We lived well."),
      T("allison", 6000, "Launch week staffing: are you OK?"),
      T("jamal-carter", 5980, "Extended hours, Maya and Oliver in the room, Teo two hours ahead in Sofia, Ngozi's macros loaded. We are as ready as support ever is, which is 'nervous but caffeinated'."),
      T("allison", 5970, "Anything you need from product?"),
      T("jamal-carter", 5960, "A single page that says what Otto cannot do. Stained glass, portholes, conservatories over three hours. Jonas has it in his heart; I need it in a doc."),
      T("allison", 5950, "On it today."),
      T("jamal-carter", 300, "Velvet Sprockets in the support room. Morale: high. Tickets: 12. Robot emoji: deployed.")
    ] },
    { personId: "maya-lindgren", messages: [
      T("maya-lindgren", 13000, "Talked Pip number 300 back to life today. The customer had put it in a plant pot with no plant. Pip was confused. Pip is fine now."),
      T("allison", 12980, "What does Otto's version of that look like?"),
      T("maya-lindgren", 12970, "Otto on a mirror. Connor already found it. I have a macro: 'Otto is not vain, but he is confused.'"),
      T("allison", 6000, "Launch week extended hours: you volunteered. Thank you."),
      T("maya-lindgren", 5980, "I volunteered because Jamal promised the Velvet Sprockets and I have not yet regretted it."),
      F("maya-lindgren", 3000, "otto-launch-support-faq.docx", "doc", "58 KB"),
      T("allison", 2990, "Q7, 'Is Otto looking at me', has the perfect answer."),
      T("maya-lindgren", 2980, "Ngozi wrote it. I added 'a little shy'."),
      T("maya-lindgren", 300, "Stockholm is dark at six already. Lo-fi and tickets. I am at peace.")
    ] },
    { personId: "oliver-hughes", messages: [
      T("oliver-hughes", 14000, "Spreadsheet update: 1,204 customer robot names. New entries this week: 'Sir Dustalot', 'Pipothy', 'Dame Judi Dust', 'Sudsy Malone'."),
      T("allison", 13980, "Dame Judi Dust is a knighthood-level name."),
      T("oliver-hughes", 13970, "It is the top entry. It has been the top entry for a year. Nothing will beat it."),
      T("allison", 6000, "Otto pre-order names?"),
      T("oliver-hughes", 5980, "Forum favourite is Squeegee Todd. Second is 'Window Pain'. Third is just 'Otto', which I respect."),
      F("oliver-hughes", 5970, "customer-robot-names-1204.xlsx", "sheet", "180 KB"),
      T("allison", 5960, "This spreadsheet should be in a museum."),
      T("oliver-hughes", 5950, "It is in a shared drive, which is the museum of our time."),
      T("oliver-hughes", 300, "Status is 'do not disturb' because I am on the phone to a customer whose Dusty is called 'Mr Bins'. It is a long call. It is a good call.")
    ] },
    { personId: "zara-hussain", messages: [
      T("zara-hussain", 15000, "Forum poll: 'Squeegee Todd' won with 61 percent. 'Window Pain' got 22. A write-in for 'Gerald' got 4 percent and I suspect Marcus."),
      T("allison", 14980, "Marcus is not on the forum."),
      T("zara-hussain", 14970, "Marcus has three accounts. I know because they all post at 4:55 pm."),
      T("allison", 6000, "The beta owners guest room on Kitaak: you are moderating?"),
      T("zara-hussain", 5980, "Moderating, welcoming, and gently telling Mrs Achebe that the cat photo cannot be her profile picture for legal reasons. She has agreed. The cat has not."),
      F("zara-hussain", 5970, "beta-owner-community-guidelines.pdf", "pdf", "210 KB"),
      T("allison", 5960, "Perfect. The guidelines have a section on 'robot naming disputes'. I love this company."),
      T("zara-hussain", 300, "Afrobeat on and forty forum threads open. Launch week is going to be wild and I am ready.")
    ] },
    { personId: "teo-ivanov", messages: [
      T("teo-ivanov", 13000, "Read the Otto beta logs last night. For fun. Unit 22 reconnects every four hours exactly. It is the router in that house, not us. I have written to the router."),
      T("allison", 12980, "You have written to the router?"),
      T("teo-ivanov", 12970, "To the owner of the router. The router does not read Kitaak. Yet."),
      T("allison", 6000, "Launch week: being two hours ahead helps a lot. Thank you."),
      T("teo-ivanov", 5980, "Sofia is awake at 7 your time. I will have the logs read before Bristol has coffee."),
      F("teo-ivanov", 5970, "otto-beta-log-patterns.pdf", "pdf", "640 KB"),
      T("allison", 5960, "Page 3, 'the four-hour router', is going into support training."),
      T("teo-ivanov", 5950, "I have pyjamas with a log pattern on them. This is not a joke. Maya has seen them."),
      T("teo-ivanov", 300, "Offline for the evening. Ambient on. Logs closed. Router unwritten to.")
    ] },
    { personId: "nina-berg", messages: [
      T("nina-berg", 14000, "The hotel chain wants 400 Ottos for their lobbies. Four hundred. I have said 'let me check with product' in my calmest voice."),
      T("allison", 13980, "Launch first. Hotels in November. Tell them Otto is practising."),
      T("nina-berg", 13970, "Told them. They loved 'practising'. They want to see it practise. I have booked a demo."),
      T("allison", 6000, "Demo date?"),
      T("nina-berg", 5980, "Week after launch. Production unit 9 if Astrid allows. She said 'do not let Connor near it' before I had finished asking."),
      F("nina-berg", 5970, "hotel-chain-dusty-renewal.pdf", "pdf", "760 KB"),
      T("allison", 5960, "Renewal for 300 Dustys. That is a lot of shelves."),
      T("nina-berg", 5950, "That is a lot of lobbies. They call the Dustys 'the fleet'. I have adopted the term."),
      T("nina-berg", 300, "Blue Hour Sessions on while I write the hotel deck. Jazz makes 400 robots feel manageable.")
    ] }
  ]);

  var autoReplies = {
    "greta-lindqvist": ["Good. Now go home on time.", "Tell me the worst quote first; it is always the useful one.", "That is the whole company in one sentence.", "Proud of this. Keep going, but slower."],
    "dev-chaudhary": ["Updating the board. It is now slightly more green.", "T-minus something. I have lost count. No I have not, it is 12.", "Can we make that warmer? Everything can be warmer.", "Put it on the countdown board and it becomes real."],
    "marisol-quintero": ["Bom dia! Pip says hello.", "We learned that the hard way on Pip 1. Happy to share the scars.", "Adding that to the pastel de nata spreadsheet, somehow.", "Come to Lisbon and we will argue about it over coffee."],
    "henrik-solberg": ["I have a chart for that. Give me four minutes.", "Technically 68 percent, but yes.", "Predicted read time: 41 seconds.", "The whale data stands.", "Adding it to the dashboard. Please refresh less."],
    "ngozi-eze": ["On it! Drafting a macro now.", "Mrs Achebe would agree with you.", "I will make it warm. Otto is a little shy about it.", "Six months in and still the best job. Thank you!"],
    "tomasz-wieczorek": ["Noted. I will not name names. It was Henrik.", "That needs a stronger password.", "I ran the cable myself. It is fine.", "Rotating that at 07:00 Thursday. You will not notice."],
    "yuki-tanaka": ["Frozen means frozen.", "Tagged, noted, walking.", "That is a 1.0.1 conversation.", "Thank you. Do not let Connor name anything."],
    "samuel-adeyemi": ["Everything is a queue.", "Load tested. Bored. Send more robots.", "Adding a backoff and a stern comment.", "The Manchester window thanks you."],
    "lena-hoffmann": ["Shipped it. Grandmother approved.", "Obviously.", "Rolling out. Nobody touch anything.", "Berlin says hi, with a pretzel."],
    "rafael-moreira": ["Tested on all fourteen phones and Ronaldo.", "Ronaldo crashed. Ronaldo always crashes.", "Both boring, both correct.", "Porto is sunny and the window is filthy."],
    "aisha-khan": ["Fleet is healthy. Pager is quiet. Still suspicious.", "Do not frame it, that is how you get paged.", "Autoscaling behaved. I am calm.", "Dashboards green, tea hot."],
    "connor-mcbride": ["Broke it. It is fine. It is always fine.", "Bob is a strong name.", "I will test that personally.", "Do not tell Astrid.", "Severity: low. Title: something sad."],
    "ines-fernandez": ["I can see you refreshing.", "90 days raw, aggregated forever.", "Screenshot it, everyone does.", "Madrid is 34 degrees. Sending charts from the cafe."],
    "jonas-petersen": ["Otto is brave now. Not reckless. Brave.", "Like a Dane crossing a road: check twice, proceed.", "The cat sat on it again. Both are fine.", "Going to look at some more windows."],
    "wei-zhang": ["Only glass. There is no room in its world.", "That is a reflection, not a blink. Probably.", "Forty frames per second says yes.", "If you tell Henrik, I add whale sounds to the model."],
    "bea-oduya": ["Noted in my notebook! Small opinion incoming.", "Forty-line commit message on its way.", "Gerald Junior sends regards from the fridge.", "Thank you! Learning so much."],
    "felix-brandt": ["Six pixels. Everywhere. You are welcome.", "Nobody notices. Everybody feels.", "I have not made my peace with it.", "Kwame tuned that for a year."],
    "chloe-dubois": ["Still gluing. Do not ask.", "Sketched it on a napkin already.", "Warm pebble. I made it up. The supplier accepted it.", "Lofty is not real until after launch."],
    "omar-haddad": ["Boring is a feature. Clever is a cost.", "The cat is our best participant.", "I have it on tape. Nine minutes, three cats.", "Writing that down. It is good copy."],
    "sanne-de-vries": ["Cycling on it. Will make sense by the canal.", "Removed the calendar. Everyone knows what Sunday is.", "Swapped. Boring. Correct.", "Track six. Obviously."],
    "kwame-boateng": ["1.4 in, 1.8 out. It is thinking.", "I cried, professionally.", "Track three is a surprise. Not whale sounds.", "The eight percent keep me up at night."],
    "astrid-nyberg": ["Numbers are names for things that work.", "The boat is where it should be.", "Do not let Connor near it.", "Lab closes at 5. Go home.", "Denied. Requested. Considered. Denied."],
    "diego-alvarez": ["They hold. Even upside down. We are not doing upside down.", "Counted the windows. Nine dirty.", "This is the hobby now.", "I cleaned it. I could not help it."],
    "priyanka-nair": ["Measured. Logged. Do not touch the oscilloscope.", "0.3 W. Do not round it.", "The ripple is fine. It is always fine.", "Status is DND for a reason. You are the fourth."],
    "lukas-meier": ["Wall of Honor entry granted.", "Plaque ordered. Medium.", "Twelve out of twelve survived.", "I play four songs, not three."],
    "fatima-al-sayed": ["Boat is where it should be. Checked with coffee.", "I sent a card. This is why it ships on time.", "Every good chart has a boat.", "Lead time is six weeks and I know the supplier's birthday."],
    "mateo-rossi": ["Printing quietly. The printer whispers.", "Allisotto says hello.", "Bracket printed before you finished the sentence.", "Turin is hot. Everything is hot."],
    "hannah-kowalski": ["42 minutes. One big window or two normal ones.", "Normal is 1.2 square metres. It is a real number.", "96 percent at 300 cycles. My whole year.", "Do not ask me about the conservatory."],
    "nadia-petrova": ["Cut it to four words. Better.", "Finally, the windows.", "Squeegee Todd is unofficial forever.", "Gerald II. It is done.", "I will name it. I name everything."],
    "ben-whitaker": ["Draft is 400 words. Nadia will cut 360.", "Wash your mug.", "Leading with the cat. That is how the internet works.", "Every one of the forty words a tear."],
    "sofia-esposito": ["Sound on. Trust me.", "Two million views and a merch line.", "It is very slow content and the internet loves it.", "Rosa is on it. Rosa is always on it."],
    "arjun-mehta": ["Cats are not a variable. Cats are a constant.", "11,204 and climbing. Loud celebration.", "Ran the test. Small win. Celebrating.", "Graph going up. That is my personality."],
    "isla-macleod": ["120 chairs. I counted twice.", "The window does not open. Otto does not need it to.", "7:42 pm, when the light is best.", "Bringing cable ties and spirit chairs."],
    "priya-raman": ["Done. Tomasz set it to expire, because Tomasz.", "Please do not rename it Bob.", "Go home on time. I am checking.", "Adding it to the all-hands agenda. Two minutes, strictly."],
    "marcus-oyelaran": ["Gerald is in a good mood. Do not ruin it.", "Thirty-one mugs. That is all I will say.", "Lunch poll is open. Vote with dignity.", "Music Swap is neutral ground.", "Fridge cleaned Friday. You have been warned."],
    "elin-johansson": ["Cleared customs. Boat where it should be.", "I am the eyes of the loading bay.", "Courier at 6 am. Customs code memorised.", "Gothenburg is grey and I love it."],
    "david-okonkwo": ["Approved. With a smile. And a spreadsheet.", "The smile is a formula.", "Under budget by 4 percent. I did not ask how.", "Depreciated over five years, with respect."],
    "rosa-martinez": ["I read all 41 pages. Ask me about the llamas.", "Otto does not identify people. Fewer jokes, same meaning.", "Cleared. In writing. With my signature, for drama.", "Reading the warranty. Neo-classical on."],
    "grace-thompson": ["Cake is mandatory. Extended hours are not.", "I know your cake preference. Do not tell me it changed.", "Go home on time. Greta asked me to check.", "Adding it to the birthday calendar."],
    "leo-nakamura": ["Strong hire. Great sourdough.", "Forty percent doc, sixty percent vibes, one hundred percent Henrik.", "The cat has been informed. 12:30.", "Sixty CVs open. Bread proving."],
    "amelie-laurent": ["Bonjour! Adding it to the checklist, tab 7.", "Marcus wrote the kettle tab. I made it pretty.", "Allisotto is on a card now. No going back.", "Welcome kits packed. Tiny Otto included."],
    "jamal-carter": ["Inbox at 12. Robot emoji deployed.", "Nervous but caffeinated. Standard.", "I need that in a doc, not in Jonas's heart.", "Framing it. Four minutes of glory."],
    "maya-lindgren": ["Talked another Pip back to life. Number 301.", "Otto is not vain, but he is confused.", "Lo-fi and tickets. At peace.", "Ngozi wrote it. I added 'a little shy'."],
    "oliver-hughes": ["Adding it to the spreadsheet. 1,205.", "Dame Judi Dust remains undefeated.", "On a long call with Mr Bins. It is a good call.", "Squeegee Todd, Window Pain, or just Otto."],
    "zara-hussain": ["The forum has opinions. Forty threads of them.", "Marcus has three accounts. They post at 4:55.", "The cat cannot be a profile picture. The cat disagrees.", "Ready for launch week. Afrobeat on."],
    "teo-ivanov": ["Read the logs. For fun. It is the router.", "Sofia is awake before Bristol has coffee.", "Pyjamas with a log pattern. Not a joke.", "Offline for the evening. Ambient on."],
    "nina-berg": ["The hotel wants 400. I said 'practising'.", "Production unit 9, if Astrid allows.", "They call the Dustys 'the fleet'. I have adopted it.", "Jazz makes 400 robots manageable."],
    "_generic": ["Sounds good, thanks!", "On it. Give me a few minutes.", "Ha, fair point.", "Can we pick this up after the Friday Five?", "Adding it to my list.", "Thanks Allison, that helps.", "Yes! Let's do that.", "Will check and get back to you before 5."]
  };

  var files = [
    { id: "f01", name: "otto-beta-readiness-v3.pdf", kind: "pdf", size: "3.1 MB", fromId: "allison", roomId: "friday-five", daysAgo: 7, note: "Beta readiness: 40 units, 38 ready" },
    { id: "f02", name: "pip2-battery-options.xlsx", kind: "sheet", size: "412 KB", fromId: "hannah-kowalski", roomId: "friday-five", daysAgo: 7, note: "Larger cell: +11 g, +40 min" },
    { id: "f03", name: "otto-launch-t-minus-11.pdf", kind: "pdf", size: "2.2 MB", fromId: "allison", roomId: "friday-five", daysAgo: 1, note: "Friday pre-read. Nine pages. Read it." },
    { id: "f04", name: "yuki-birthday-pip-cake.jpg", kind: "image", size: "2.4 MB", fromId: "kwame-boateng", roomId: "all-hands", daysAgo: 2, note: "Lemon drizzle with sugar Pip" },
    { id: "f05", name: "otto-app-schedule-flow-v2.png", kind: "image", size: "1.8 MB", fromId: "sanne-de-vries", roomId: "product-lab", daysAgo: 4, note: "Scheduling flow, no calendar" },
    { id: "f06", name: "otto-packaging-sample-03.jpg", kind: "image", size: "3.3 MB", fromId: "chloe-dubois", roomId: "product-lab", daysAgo: 3, note: "Tiny sleeping astronaut" },
    { id: "f07", name: "cat-on-counter.jpg", kind: "image", size: "1.9 MB", fromId: "leo-nakamura", roomId: "lunch-crew", daysAgo: 2, note: "The Thai place cat" },
    { id: "f08", name: "otto-teaser-audio-mix.mp3", kind: "audio", size: "6.8 MB", fromId: "sofia-esposito", roomId: "music-swap", daysAgo: 4, note: "Launch teaser, cut to Amara Sol" },
    { id: "f09", name: "telemetry-pipeline-runbook.md", kind: "doc", size: "88 KB", fromId: "samuel-adeyemi", roomId: "engineering", daysAgo: 2, note: "Section 4 is just the word Sleep" },
    { id: "f10", name: "drop-test-otto-ps7.xlsx", kind: "sheet", size: "220 KB", fromId: "lukas-meier", roomId: "hardware-lab", daysAgo: 5, note: "Fell three times, rose three times" },
    { id: "f11", name: "otto-supplier-timeline-sept.pdf", kind: "pdf", size: "1.4 MB", fromId: "fatima-al-sayed", roomId: "hardware-lab", daysAgo: 1, note: "Colour coded by boat" },
    { id: "f12", name: "otto-beta-week2.xlsx", kind: "sheet", size: "1.1 MB", fromId: "henrik-solberg", roomId: "dm:henrik-solberg", daysAgo: 3, note: "Windows per week, slide 4" },
    { id: "f13", name: "otto-and-cat-bath.jpg", kind: "image", size: "2.1 MB", fromId: "ngozi-eze", roomId: "dm:ngozi-eze", daysAgo: 5, note: "Mrs Achebe's cat, launch deck slide one" },
    { id: "f14", name: "bug-0412-hum-d-minor.pdf", kind: "pdf", size: "180 KB", fromId: "connor-mcbride", roomId: "dm:connor-mcbride", daysAgo: 6, note: "Severity: low. Mood: low." },
    { id: "f15", name: "board-deck-charts-sept.pdf", kind: "pdf", size: "2.6 MB", fromId: "ines-fernandez", roomId: "dm:ines-fernandez", daysAgo: 2, note: "Screenshot them, everyone does" },
    { id: "f16", name: "otto-launch-visual-language.pdf", kind: "pdf", size: "4.2 MB", fromId: "felix-brandt", roomId: "dm:felix-brandt", daysAgo: 2, note: "6 px everywhere" },
    { id: "f17", name: "lofty-napkin-sketch.jpg", kind: "image", size: "1.5 MB", fromId: "chloe-dubois", roomId: "dm:chloe-dubois", daysAgo: 3, note: "Do not tell Dev" },
    { id: "f18", name: "otto-launch-press-kit.pdf", kind: "pdf", size: "8.4 MB", fromId: "nadia-petrova", roomId: "dm:nadia-petrova", daysAgo: 2, note: "Finally, the windows." },
    { id: "f19", name: "otto-launch-video-storyboard.pdf", kind: "pdf", size: "3.8 MB", fromId: "kwame-boateng", roomId: "dm:kwame-boateng", daysAgo: 4, note: "Frame 14 has the cat" },
    { id: "f20", name: "wall-of-honor-sept.jpg", kind: "image", size: "2.7 MB", fromId: "lukas-meier", roomId: "dm:lukas-meier", daysAgo: 4, note: "The Wall knows" },
    { id: "f21", name: "launch-party-run-of-show.pdf", kind: "pdf", size: "540 KB", fromId: "isla-macleod", roomId: "dm:isla-macleod", daysAgo: 4, note: "7:42 pm: Otto goes up" },
    { id: "f22", name: "customer-robot-names-1204.xlsx", kind: "sheet", size: "180 KB", fromId: "oliver-hughes", roomId: "dm:oliver-hughes", daysAgo: 4, note: "Dame Judi Dust remains undefeated" },
    { id: "f23", name: "otto-launch-deck-draft.pptx", kind: "slides", size: "12.6 MB", fromId: "allison", roomId: "product-lab", daysAgo: 1, note: "Launch deck, slide one is the cat" },
    { id: "f24", name: "q3-launch-budget-actuals.xlsx", kind: "sheet", size: "290 KB", fromId: "david-okonkwo", roomId: "dm:david-okonkwo", daysAgo: 4, note: "Row 12 is Gerald II" }
  ];

  var music = {
    genres: [
      { id: "lofi", name: "Lo-fi Beats", description: "Soft drums and warm tape hiss for the first coffee of the day.", cover: "covers/cover-01.jpg" },
      { id: "synthwave", name: "Synthwave", description: "Neon arpeggios and big drums for the last hour before a deadline.", cover: "covers/cover-02.jpg" },
      { id: "jazz", name: "Modern Jazz", description: "Small groups, long solos and the good kind of quiet.", cover: "covers/cover-03.jpg" },
      { id: "ambient", name: "Ambient & Drone", description: "Slow-moving textures for dashboards, spreadsheets and boat tracking.", cover: "covers/cover-04.jpg" },
      { id: "indiefolk", name: "Indie Folk", description: "Guitars, harmonies and songs about rivers, orchards and bicycles.", cover: "covers/cover-05.jpg" },
      { id: "afrobeat", name: "Afrobeat & Highlife", description: "Horns, percussion and grooves that make a Tuesday feel like a Friday.", cover: "covers/cover-06.jpg" },
      { id: "neoclassical", name: "Neo-Classical", description: "Solo piano and strings for reading contracts and writing release notes.", cover: "covers/cover-07.jpg" },
      { id: "funk", name: "Funk & Disco", description: "Basslines and brass for the hardware lab and the launch countdown.", cover: "covers/cover-08.jpg" }
    ],
    artists: [
      { id: "paper-lantern", name: "Paper Lantern Collective", blurb: "A rotating cast of bedroom producers who record on rainy afternoons only.", genreId: "lofi" },
      { id: "kettle-static", name: "Kettle Static", blurb: "One producer, one sampler, one very loud kettle.", genreId: "lofi" },
      { id: "neon-meridian", name: "Neon Meridian", blurb: "Duo from the coast making driving music for people without cars.", genreId: "synthwave" },
      { id: "vesper-drive", name: "Vesper Drive", blurb: "Late-night synth epics with a cinematic streak.", genreId: "synthwave" },
      { id: "ilse-marrow", name: "The Ilse Marrow Trio", blurb: "Piano, bass and brushes, recorded live in a bar that no longer exists.", genreId: "jazz" },
      { id: "oskar-blume", name: "Oskar Blume Quartet", blurb: "Muted trumpet and patient rhythm section; music for closing the month.", genreId: "jazz" },
      { id: "low-tide", name: "Low Tide Cartography", blurb: "Field recordings from harbours, stretched into slow ambient tides.", genreId: "ambient" },
      { id: "wren-bramble", name: "Wren & Bramble", blurb: "Two voices, one guitar, and an orchard in the west of England.", genreId: "indiefolk" },
      { id: "kofi-mensah", name: "Kofi Mensah-Adjei & The Sunrise Band", blurb: "Twelve-piece highlife band with horns that wake up whole streets.", genreId: "afrobeat" },
      { id: "amara-sol", name: "Amara Sol", blurb: "Warm, modern afrobeat with choruses built for launch videos.", genreId: "afrobeat" },
      { id: "eliza-fenwick", name: "Eliza Fenwick", blurb: "Pianist who writes nocturnes about small flats and cold practice rooms.", genreId: "neoclassical" },
      { id: "velvet-sprockets", name: "The Velvet Sprockets", blurb: "Eight-piece funk band of former factory workers with a brass section to match.", genreId: "funk" }
    ],
    albums: [
      { id: "alb-pl-rainy", title: "Rainy Window Study", artistId: "paper-lantern", year: 2023, genreId: "lofi", cover: "covers/cover-01.jpg", tracks: [
        { id: "pl1-01", title: "Condensation", duration: "2:48" }, { id: "pl1-02", title: "Bus Stop Loop", duration: "3:12" }, { id: "pl1-03", title: "Tea for the Third Time", duration: "2:55" }, { id: "pl1-04", title: "Grey Sky Metronome", duration: "3:30" }, { id: "pl1-05", title: "Half a Crossword", duration: "2:41" }, { id: "pl1-06", title: "Warm Lamp, Cold Street", duration: "3:05" }, { id: "pl1-07", title: "Pencil Shavings", duration: "2:36" }, { id: "pl1-08", title: "Study Break (Reprise)", duration: "3:19" }
      ] },
      { id: "alb-pl-latebus", title: "Late Bus Home", artistId: "paper-lantern", year: 2024, genreId: "lofi", cover: "covers/cover-04.jpg", tracks: [
        { id: "pl2-01", title: "Night Route 42", duration: "3:08" }, { id: "pl2-02", title: "Fogged Glasses", duration: "2:52" }, { id: "pl2-03", title: "Headphones Low", duration: "3:21" }, { id: "pl2-04", title: "Empty Upper Deck", duration: "2:47" }, { id: "pl2-05", title: "Kebab Shop Glow", duration: "3:02" }, { id: "pl2-06", title: "Last Stop Lullaby", duration: "3:44" }, { id: "pl2-07", title: "Keys in the Door", duration: "2:39" }
      ] },
      { id: "alb-ks-steam", title: "Steam & Signal", artistId: "kettle-static", year: 2022, genreId: "lofi", cover: "covers/cover-07.jpg", tracks: [
        { id: "ks-01", title: "Boil", duration: "2:58" }, { id: "ks-02", title: "Descale Sunday", duration: "3:15" }, { id: "ks-03", title: "Two Sugars", duration: "2:44" }, { id: "ks-04", title: "Standby Light", duration: "3:33" }, { id: "ks-05", title: "Chipped Mug", duration: "2:50" }, { id: "ks-06", title: "Steam & Signal", duration: "4:01" }
      ] },
      { id: "alb-nm-highway", title: "Highway Heartbeat", artistId: "neon-meridian", year: 2021, genreId: "synthwave", cover: "covers/cover-02.jpg", tracks: [
        { id: "nm1-01", title: "Ignition", duration: "3:45" }, { id: "nm1-02", title: "Highway Heartbeat", duration: "4:12" }, { id: "nm1-03", title: "Chrome Rain", duration: "3:58" }, { id: "nm1-04", title: "Tail Lights", duration: "4:30" }, { id: "nm1-05", title: "Midnight Toll", duration: "3:36" }, { id: "nm1-06", title: "Grid Runner", duration: "4:05" }, { id: "nm1-07", title: "Neon Meridian", duration: "5:02" }, { id: "nm1-08", title: "Dawn Exit", duration: "3:49" }
      ] },
      { id: "alb-nm-arcade", title: "Arcade Sunset", artistId: "neon-meridian", year: 2024, genreId: "synthwave", cover: "covers/cover-09.jpg", tracks: [
        { id: "nm2-01", title: "Insert Coin", duration: "3:40" }, { id: "nm2-02", title: "High Score", duration: "4:08" }, { id: "nm2-03", title: "Pixel Beach", duration: "3:55" }, { id: "nm2-04", title: "Continue?", duration: "4:21" }, { id: "nm2-05", title: "Boss Level", duration: "4:44" }, { id: "nm2-06", title: "Arcade Sunset", duration: "4:16" }, { id: "nm2-07", title: "Credits Roll", duration: "3:33" }
      ] },
      { id: "alb-vd-chrome", title: "Chrome Horizon", artistId: "vesper-drive", year: 2023, genreId: "synthwave", cover: "covers/cover-05.jpg", tracks: [
        { id: "vd-01", title: "Overdrive", duration: "4:02" }, { id: "vd-02", title: "Glass City", duration: "4:35" }, { id: "vd-03", title: "Static Kiss", duration: "3:51" }, { id: "vd-04", title: "Chrome Horizon", duration: "5:10" }, { id: "vd-05", title: "Night Shift", duration: "4:19" }, { id: "vd-06", title: "Last Transmission", duration: "4:47" }
      ] },
      { id: "alb-im-blue", title: "Blue Hour Sessions", artistId: "ilse-marrow", year: 2020, genreId: "jazz", cover: "covers/cover-03.jpg", tracks: [
        { id: "im-01", title: "Blue Hour", duration: "5:42" }, { id: "im-02", title: "Corner Table", duration: "4:58" }, { id: "im-03", title: "Rain on Brass", duration: "6:13" }, { id: "im-04", title: "Small Talk", duration: "4:21" }, { id: "im-05", title: "Streetlight Waltz", duration: "5:05" }, { id: "im-06", title: "Last Orders", duration: "6:40" }, { id: "im-07", title: "Walk Home", duration: "4:36" }
      ] },
      { id: "alb-ob-quiet", title: "Quiet Brass", artistId: "oskar-blume", year: 2022, genreId: "jazz", cover: "covers/cover-08.jpg", tracks: [
        { id: "ob-01", title: "Quiet Brass", duration: "5:20" }, { id: "ob-02", title: "Ledger Lines", duration: "4:44" }, { id: "ob-03", title: "Seven for Six", duration: "5:58" }, { id: "ob-04", title: "Marmalade Morning", duration: "4:12" }, { id: "ob-05", title: "Brushes Only", duration: "3:57" }, { id: "ob-06", title: "The Long Reconciliation", duration: "6:31" }, { id: "ob-07", title: "Muted", duration: "4:49" }, { id: "ob-08", title: "Closing Time Blues", duration: "5:36" }
      ] },
      { id: "alb-lt-fathoms", title: "Fathoms", artistId: "low-tide", year: 2021, genreId: "ambient", cover: "covers/cover-06.jpg", tracks: [
        { id: "lt1-01", title: "Sounding", duration: "7:12" }, { id: "lt1-02", title: "Fathoms", duration: "8:40" }, { id: "lt1-03", title: "Slack Water", duration: "6:55" }, { id: "lt1-04", title: "Harbour Lights", duration: "7:30" }, { id: "lt1-05", title: "Drift", duration: "9:02" }, { id: "lt1-06", title: "Ebb", duration: "6:18" }
      ] },
      { id: "alb-lt-salt", title: "Salt Rooms", artistId: "low-tide", year: 2024, genreId: "ambient", cover: "covers/cover-10.jpg", tracks: [
        { id: "lt2-01", title: "Salt Rooms", duration: "7:44" }, { id: "lt2-02", title: "Container Ship at Dawn", duration: "8:12" }, { id: "lt2-03", title: "Bell Buoy", duration: "6:36" }, { id: "lt2-04", title: "Customs Hall", duration: "7:05" }, { id: "lt2-05", title: "Pallet Fourteen", duration: "5:58" }, { id: "lt2-06", title: "Fog Signal", duration: "8:50" }, { id: "lt2-07", title: "Arrivals", duration: "6:22" }
      ] },
      { id: "alb-wb-field", title: "Field Notes from the Orchard", artistId: "wren-bramble", year: 2019, genreId: "indiefolk", cover: "covers/cover-11.jpg", tracks: [
        { id: "wb1-01", title: "Orchard Gate", duration: "3:22" }, { id: "wb1-02", title: "Windfall", duration: "3:48" }, { id: "wb1-03", title: "Bramble Song", duration: "4:05" }, { id: "wb1-04", title: "Ladder in the Long Grass", duration: "3:31" }, { id: "wb1-05", title: "First Frost", duration: "4:18" }, { id: "wb1-06", title: "Cider Press", duration: "3:09" }, { id: "wb1-07", title: "The Wren's Reply", duration: "3:55" }, { id: "wb1-08", title: "Field Notes", duration: "4:27" }, { id: "wb1-09", title: "Last Light on the Hill", duration: "4:41" }
      ] },
      { id: "alb-wb-two", title: "Two Small Rivers", artistId: "wren-bramble", year: 2023, genreId: "indiefolk", cover: "covers/cover-01.jpg", tracks: [
        { id: "wb2-01", title: "Two Small Rivers", duration: "4:02" }, { id: "wb2-02", title: "Bicycle Bell", duration: "3:27" }, { id: "wb2-03", title: "Canal Path", duration: "3:50" }, { id: "wb2-04", title: "Headwind", duration: "4:11" }, { id: "wb2-05", title: "Where They Meet", duration: "3:39" }, { id: "wb2-06", title: "Tailwind Home", duration: "4:24" }, { id: "wb2-07", title: "Bridge at Dusk", duration: "3:58" }
      ] },
      { id: "alb-km-sunrise", title: "Sunrise on Oxford Street", artistId: "kofi-mensah", year: 2022, genreId: "afrobeat", cover: "covers/cover-02.jpg", tracks: [
        { id: "km-01", title: "Sunrise on Oxford Street", duration: "5:12" }, { id: "km-02", title: "Trotro Rush", duration: "4:48" }, { id: "km-03", title: "Good Morning, Accra", duration: "6:03" }, { id: "km-04", title: "Market Day", duration: "5:35" }, { id: "km-05", title: "Sunrise Band Anthem", duration: "4:29" }, { id: "km-06", title: "Highlife Hour", duration: "5:50" }, { id: "km-07", title: "Kelewele", duration: "4:14" }, { id: "km-08", title: "Late Sunset", duration: "6:26" }
      ] },
      { id: "alb-as-gold", title: "Gold Dust Hour", artistId: "amara-sol", year: 2024, genreId: "afrobeat", cover: "covers/cover-03.jpg", tracks: [
        { id: "as-01", title: "Gold Dust Hour", duration: "3:52" }, { id: "as-02", title: "Lagos Window", duration: "4:05" }, { id: "as-03", title: "Shine Slowly", duration: "3:38" }, { id: "as-04", title: "Rooftop", duration: "4:21" }, { id: "as-05", title: "Sol", duration: "3:47" }, { id: "as-06", title: "Everybody Up", duration: "4:33" }, { id: "as-07", title: "Evening Gold", duration: "4:10" }
      ] },
      { id: "alb-ef-nocturnes", title: "Nocturnes for a Small Flat", artistId: "eliza-fenwick", year: 2021, genreId: "neoclassical", cover: "covers/cover-04.jpg", tracks: [
        { id: "ef1-01", title: "Nocturne No. 1 (Kitchen)", duration: "4:32" }, { id: "ef1-02", title: "Radiator", duration: "3:48" }, { id: "ef1-03", title: "Nocturne No. 2 (Hallway)", duration: "5:14" }, { id: "ef1-04", title: "Upstairs Neighbour", duration: "3:21" }, { id: "ef1-05", title: "Nocturne No. 3 (Window)", duration: "5:40" }, { id: "ef1-06", title: "Kettle at Midnight", duration: "3:55" }, { id: "ef1-07", title: "Nocturne No. 4 (Balcony)", duration: "4:47" }, { id: "ef1-08", title: "Lights Out", duration: "6:02" }
      ] },
      { id: "alb-ef-winter", title: "Winter Practice Room", artistId: "eliza-fenwick", year: 2024, genreId: "neoclassical", cover: "covers/cover-05.jpg", tracks: [
        { id: "ef2-01", title: "Practice Room", duration: "4:18" }, { id: "ef2-02", title: "Scales in the Dark", duration: "3:52" }, { id: "ef2-03", title: "Cold Hands", duration: "4:40" }, { id: "ef2-04", title: "Etude for a Dark Frame", duration: "5:03" }, { id: "ef2-05", title: "Metronome", duration: "3:36" }, { id: "ef2-06", title: "Thaw", duration: "6:15" }
      ] },
      { id: "alb-vs-business", title: "Get Down to Business", artistId: "velvet-sprockets", year: 2020, genreId: "funk", cover: "covers/cover-06.jpg", tracks: [
        { id: "vs1-01", title: "Get Down to Business", duration: "4:12" }, { id: "vs1-02", title: "Torque It Up", duration: "3:48" }, { id: "vs1-03", title: "Sprocket Strut", duration: "4:05" }, { id: "vs1-04", title: "Drop Test", duration: "3:33" }, { id: "vs1-05", title: "Wall of Honor", duration: "4:26" }, { id: "vs1-06", title: "Funky Bracket", duration: "3:57" }, { id: "vs1-07", title: "Overtime Boogie", duration: "4:40" }, { id: "vs1-08", title: "Clock Out", duration: "3:29" }
      ] },
      { id: "alb-vs-office", title: "Office Party", artistId: "velvet-sprockets", year: 2023, genreId: "funk", cover: "covers/cover-07.jpg", tracks: [
        { id: "vs2-01", title: "Office Party", duration: "4:08" }, { id: "vs2-02", title: "Kitchen Sign", duration: "3:44" }, { id: "vs2-03", title: "Inbox Zero (For Four Minutes)", duration: "4:15" }, { id: "vs2-04", title: "Mug Thief", duration: "3:52" }, { id: "vs2-05", title: "Friday Five", duration: "4:30" }, { id: "vs2-06", title: "Photocopier Groove", duration: "3:38" }, { id: "vs2-07", title: "Lift Lobby", duration: "4:02" }, { id: "vs2-08", title: "All Hands", duration: "4:47" }, { id: "vs2-09", title: "Go Home on Time", duration: "5:01" }
      ] }
    ],
    playlists: [
      { id: "pl-deep-focus", name: "Deep Focus Mondays", description: "Piano, tape hiss and slow tides. No lyrics before noon, Jonas.", cover: "covers/cover-04.jpg", trackIds: ["pl1-01", "pl1-04", "ks-04", "lt1-03", "ef1-01", "ef2-01", "pl2-03", "lt2-01", "ef1-05", "ks-01"] },
      { id: "pl-friday-five", name: "Friday Five PM", description: "The wrap-up meeting soundtrack: brass, basslines and one song with the word baby in it.", cover: "covers/cover-08.jpg", trackIds: ["vs2-05", "vs1-01", "as-06", "km-06", "nm1-02", "vs2-09", "as-01", "nm2-06", "km-01"] },
      { id: "pl-hardware-loud", name: "Hardware Lab Loud", description: "Twelve tracks for torque wrenches and drop tests. Two Velvet Sprockets, out of respect.", cover: "covers/cover-06.jpg", trackIds: ["vs1-02", "vs1-04", "nm1-06", "vd-01", "km-02", "as-04", "as-02", "nm2-05", "vd-05", "km-05", "vd-02", "nm1-01"] },
      { id: "pl-coffee-jazz", name: "Coffee Machine Jazz", description: "Trios and quartets for the queue at the coffee machine.", cover: "covers/cover-03.jpg", trackIds: ["im-01", "ob-01", "im-02", "ob-04", "im-05", "ob-05", "im-07", "ob-02"] },
      { id: "pl-commute", name: "Allison's Commute", description: "Twenty-two minutes on the bus, nine of them spent noticing dirty windows.", cover: "covers/cover-11.jpg", trackIds: ["wb2-02", "pl2-01", "im-04", "as-03", "wb1-02", "ks-03", "ob-07", "wb2-06", "pl1-06"] },
      { id: "pl-launch-hype", name: "Launch Day Hype", description: "For the exact moment Otto goes live. Track three is a surprise. It is not whale sounds.", cover: "covers/cover-02.jpg", trackIds: ["vs1-01", "nm1-02", "ob-04", "as-01", "km-01", "vs2-08", "nm2-02", "as-06", "vd-04", "vs2-09"] }
    ],
    sections: [
      { title: "New this week", kind: "albums", itemIds: ["alb-nm-arcade", "alb-as-gold", "alb-ef-winter", "alb-lt-salt", "alb-pl-latebus"] },
      { title: "Focus for the workday", kind: "playlists", itemIds: ["pl-deep-focus", "pl-coffee-jazz", "pl-commute", "pl-hardware-loud"] },
      { title: "Team favorites", kind: "tracks", itemIds: ["vs1-01", "as-01", "pl1-01", "nm1-02", "im-01", "wb2-06", "ef1-05", "km-03"] },
      { title: "Genres", kind: "genres", itemIds: ["lofi", "synthwave", "jazz", "ambient", "indiefolk", "afrobeat", "neoclassical", "funk"] },
      { title: "Kitaak recommendations for Allison", kind: "albums", itemIds: ["alb-im-blue", "alb-ob-quiet", "alb-ks-steam", "alb-vs-office", "alb-pl-rainy", "alb-ef-nocturnes"] },
      { title: "Fresh from independent suppliers", kind: "albums", itemIds: ["alb-wb-two", "alb-vd-chrome", "alb-km-sunrise", "alb-lt-fathoms", "alb-wb-field"] }
    ]
  };

  var announcements = [
    { id: "ann-countdown", title: "Otto launches in 12 days", body: "Firmware 1.0.0-clearskies is frozen, the app is in phased rollout and packaging is signed off. Launch dry run is tomorrow at 2 pm in the big room. The countdown board in the kitchen is the source of truth; the one in the hardware lab remains a work of fiction.", fromId: "dev-chaudhary", daysAgo: 0 },
    { id: "ann-gerald", title: "Gerald the kettle retires on Friday", body: "After seven years of loyal, slightly moody service, Gerald is retiring to the hardware lab as a thermal test load. A short ceremony will be held in the kitchen at 4:55 pm on Friday: forty words from Ben, a plaque from Lukas, one final boil. Gerald II arrives Monday.", fromId: "marcus-oyelaran", daysAgo: 1 },
    { id: "ann-party", title: "Launch party: 120 chairs, one very large window", body: "The venue is confirmed for launch night. Doors at 6:30 pm, Otto goes up the window at 7:42 pm when the light is best, and there will be twelve tiny Ottos on the tables, each with a name Mateo refuses to share. Plus-ones welcome, cats sadly not.", fromId: "isla-macleod", daysAgo: 2 },
    { id: "ann-hiring", title: "Q4 hiring: two engineers and one support role", body: "The Friday Five approved two robotics software roles and one technical support role for launch season. Referrals are very welcome and come with the usual bonus and an unusual amount of cake. Leo will be discussing bread with every candidate whether they like it or not.", fromId: "grace-thompson", daysAgo: 5 }
  ];

  var statuses = [
    "In a meeting - back at 3",
    "Heads down on the Otto launch",
    "Working from the hardware lab",
    "Lunch - the Thai place with the cat",
    "On a train - replies will be slow",
    "Listening on Kitaak - do not disturb"
  ];

  var DEMO = {
    company: company,
    me: me,
    people: people,
    groups: groups,
    dms: dms,
    autoReplies: autoReplies,
    files: files,
    music: music,
    announcements: announcements,
    statuses: statuses
  };

  root.KITAAK_DEMO = DEMO;
  if (typeof module !== "undefined" && module.exports) { module.exports = DEMO; }
})(typeof window !== "undefined" ? window : globalThis);
