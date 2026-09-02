const PROGRAMMING_LANGUAGES = [
    { id: 'html', name: 'HTML', icon: 'fa-brands fa-html5', color: '#e34c26', level: 'Beginner', isBrowserExecutable: true, desc: 'Забони нишонагузории гиперматнӣ барои сохтани сохтори веб-саҳифаҳо.' },
    { id: 'css', name: 'CSS', icon: 'fa-brands fa-css3-alt', color: '#264de4', level: 'Beginner', isBrowserExecutable: true, desc: 'Забони услубҳо барои тарҳрезӣ ва зебосозии саҳифаҳои веб.' },
    { id: 'javascript', name: 'JavaScript', icon: 'fa-brands fa-js', color: '#f7df1e', level: 'Intermediate', isBrowserExecutable: true, desc: 'Забони барномасозии пуриқтидор барои илова кардани динамика ба веб.' },
    { id: 'python', name: 'Python', icon: 'fa-brands fa-python', color: '#3776ab', level: 'Beginner', isBrowserExecutable: false, desc: 'Забони содда ва муосир барои AI, Data Science ва веб-бакенд.' },
    { id: 'java', name: 'Java', icon: 'fa-brands fa-java', color: '#007396', level: 'Intermediate', isBrowserExecutable: false, desc: 'Забони объектгаро барои барномаҳои кросс-платформавӣ ва Android.' },
    { id: 'cpp', name: 'C++', icon: 'fa-solid fa-code', color: '#00599c', level: 'Advanced', isBrowserExecutable: false, desc: 'Забони зудаммал барои сохтани бозиҳо ва системаҳои оперативӣ.' },
    { id: 'csharp', name: 'C#', icon: 'fa-solid fa-hashtag', color: '#239120', level: 'Intermediate', isBrowserExecutable: false, desc: 'Забони фаъоли Microsoft барои платформаи .NET ва бозиҳои Unity.' },
    { id: 'php', name: 'PHP', icon: 'fa-brands fa-php', color: '#777bb4', level: 'Beginner', isBrowserExecutable: false, desc: 'Забони маъмули серверӣ барои сохтани сайтҳои динамикӣ.' },
    { id: 'typescript', name: 'TypeScript', icon: 'fa-solid fa-code-commit', color: '#3178c6', level: 'Intermediate', isBrowserExecutable: true, desc: 'Абмиқдори JavaScript бо дастгирии типизатсияи статикӣ.' },
    { id: 'sql', name: 'SQL', icon: 'fa-solid fa-database', color: '#4479a1', level: 'Beginner', isBrowserExecutable: false, desc: 'Забони дархостҳо барои кор бо пойгоҳи додаҳо (Databases).' },
    { id: 'golang', name: 'Go', icon: 'fa-brands fa-golang', color: '#00add8', level: 'Advanced', isBrowserExecutable: false, desc: 'Забони муосири Google барои системаҳои баландбор ва микрохидматҳо.' },
    { id: 'rust', name: 'Rust', icon: 'fa-solid fa-gear', color: '#cea277', level: 'Advanced', isBrowserExecutable: false, desc: 'Забони бехатар ва фавқулодда зуд барои барномасозии системӣ.' }
];

const LESSONS_DATABASE = {
    html: [
        { id: 'html_intro', title: '01. Муқаддима ба HTML', content: 'HTML (HyperText Markup Language) сохтори асосии веб-саҳифаҳоро месозад.', defaultCode: '<h1>Салом CodeLab TJ!</h1>\n<p>Ин аввалин коди HTML-и ман аст.</p>' },
        { id: 'html_elements', title: '02. Элементҳо ва Тегҳо', content: 'Тегҳо барои муайян кардани унсурҳо истифода мешаванд. Мисол: &lt;button&gt;, &lt;p&gt;.', defaultCode: '<button>Тугомаи ман</button>' }
    ],
    css: [
        { id: 'css_intro', title: '01. Селекторҳои CSS', content: 'CSS барои зебо кардани элементҳои HTML хизмат мекунад.', defaultCode: 'body {\n  background-color: #0f172a;\n  color: #10b981;\n}' }
    ],
    javascript: [
        { id: 'js_variables', title: '01. Тағйирёбандаҳо (Variables)', content: 'Дар JS тағйирёбандаҳо бо let ва const эълон карда мешаванд.', defaultCode: 'let name = "Душанбе";\nconsole.log("Шаҳри ман: " + name);' }
    ]
};

const CHALLENGES_DATABASE = [
    {
        id: 'ch_1',
        title: 'Супориши #01: Сохтани тугма',
        difficulty: 'Easy',
        xp: 50,
        task: 'Теги HTML button созед, ки дар дохилаш матни "Click Me" дошта бошад.',
        initialCode: '<!-- Кодро дар ин ҷо нависед -->\n',
        validate: (html) => html.includes('<button>') && html.includes('Click Me') && html.includes('</button>')
    },
    {
        id: 'ch_2',
        title: 'Супориши #02: Ранги матни CSS',
        difficulty: 'Easy',
        xp: 75,
        task: 'Ба маҷмӯи h1 бо CSS ранги сурх (red) диҳед.',
        initialCode: '<style>\n  /* CSS нависед */\n</style>\n<h1>Матни Сурх</h1>',
        validate: (html) => html.includes('color:') && html.includes('red')
    }
];

const ACHIEVEMENTS_DATABASE = [
    { id: 'ach_first_code', title: 'Аввалин Код', desc: 'Аввалин коди худро иҷро кардед', icon: 'fa-solid fa-code' },
    { id: 'ach_streak_7', title: '7 Рӯзи пайваста', desc: '7 рӯз паиҳам бо система кор кардед', icon: 'fa-solid fa-fire' },
    { id: 'ach_10_projects', title: '10 Лоиҳа', desc: '10 лоиҳаи шахсӣ сохтед', icon: 'fa-solid fa-folder-plus' }
];