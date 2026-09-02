const App = {
    init() {
        I18N.setLanguage('tg');
        this.bindNavigation();
        this.bindEvents();
        this.renderLanguages();
        this.renderLessons();
        this.renderChallenges();
        this.renderProjects();
        this.renderLeaderboard();
        this.renderProfile();
        
        EditorEngine.init();
    },

    // Navigation and SPA Section Routing
    bindNavigation() {
        document.querySelectorAll('[data-view]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetView = btn.getAttribute('data-view');
                this.navigateTo(targetView);
            });
        });

        document.getElementById('langSelect').addEventListener('change', (e) => {
            I18N.setLanguage(e.target.value);
        });

        document.getElementById('mobileMenuBtn').addEventListener('click', () => {
            document.getElementById('navMenu').classList.toggle('mobile-active');
        });
    },

    navigateTo(viewId) {
        document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

        const targetSection = document.getElementById(`view-${viewId}`);
        if (targetSection) targetSection.classList.add('active');

        const activeNavBtn = document.querySelector(`.nav-link[data-view="${viewId}"]`);
        if (activeNavBtn) activeNavBtn.classList.add('active');

        document.getElementById('navMenu').classList.remove('mobile-active');
    },

    // Render Programming Languages Grid
    renderLanguages() {
        const grid = document.getElementById('languagesGrid');
        grid.innerHTML = PROGRAMMING_LANGUAGES.map(lang => `
            <div class="lang-card">
                <div>
                    <div class="lang-card-header">
                        <i class="${lang.icon}" style="color: ${lang.color}"></i>
                        <div>
                            <h3>${lang.name}</h3>
                            <span class="badge badge-${lang.level.toLowerCase()}">${lang.level}</span>
                        </div>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 0.85rem;">${lang.desc}</p>
                </div>
                <button class="btn btn-primary btn-sm" style="margin-top: 1rem;" onclick="App.startLanguage('${lang.id}', ${lang.isBrowserExecutable})">
                    <i class="fa-solid fa-play"></i> Оғози рамзнависӣ
                </button>
            </div>
        `).join('');
    },

    startLanguage(langId, isExecutable) {
        if (!isExecutable) {
            this.showToast(`⚠️ Забони ${langId.toUpperCase()} муҳити серверӣ (Backend)-ро талаб мекунад. Демонстратсия дар браузер дастгирӣ намешавад.`, 'warning');
            return;
        }
        this.navigateTo('editor');
    },

    // Render Lessons Navigation Hierarchy
    renderLessons() {
        const container = document.getElementById('lessonsAccordion');
        let html = '';
        for (const [langKey, lessons] of Object.entries(LESSONS_DATABASE)) {
            html += `<div class="topic-group"><h4>${langKey.toUpperCase()}</h4>`;
            lessons.forEach(lesson => {
                html += `<button class="lesson-btn" onclick="App.loadLesson('${langKey}', '${lesson.id}')">${lesson.title}</button>`;
            });
            html += `</div>`;
        }
        container.innerHTML = html;
    },

    loadLesson(langKey, lessonId) {
        const lesson = LESSONS_DATABASE[langKey].find(l => l.id === lessonId);
        if (!lesson) return;

        const viewer = document.getElementById('lessonViewer');
        viewer.innerHTML = `
            <h2>${lesson.title}</h2>
            <hr style="border-color: var(--border-color); margin: 1rem 0;">
            <p>${lesson.content}</p>
            <h4 style="margin-top: 1.5rem;">Намунаи Код:</h4>
            <pre style="background: var(--bg-primary); padding: 1rem; border-radius: 4px; font-family: var(--font-mono); font-size: 0.9rem; margin-top: 0.5rem; overflow-x: auto;">${lesson.defaultCode}</pre>
            <button class="btn btn-primary" style="margin-top: 1.5rem;" onclick="App.openLessonInEditor(\`${encodeURIComponent(lesson.defaultCode)}\`)">
                <i class="fa-solid fa-code"></i> Оғози амалиёт дар Муҳаррир
            </button>
        `;
    },

    openLessonInEditor(encodedCode) {
        const code = decodeURIComponent(encodedCode);
        Store.state.currentFiles['index.html'] = code;
        EditorEngine.switchFile('index.html');
        this.navigateTo('editor');
    },

    // Render Challenges System
    renderChallenges() {
        const grid = document.getElementById('challengesGrid');
        grid.innerHTML = CHALLENGES_DATABASE.map(ch => `
            <div class="challenge-card">
                <div>
                    <span class="badge badge-${ch.difficulty.toLowerCase()}">${ch.difficulty}</span>
                    <h3 style="margin: 0.5rem 0;">${ch.title}</h3>
                    <p style="color: var(--text-secondary); font-size: 0.85rem;">${ch.task}</p>
                </div>
                <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: var(--warning); font-weight: 700;">+${ch.xp} XP</span>
                    <button class="btn btn-primary btn-sm" onclick="App.openChallenge('${ch.id}')">Ҳал кардан</button>
                </div>
            </div>
        `).join('');
    },

    openChallenge(chId) {
        const ch = CHALLENGES_DATABASE.find(c => c.id === chId);
        if (!ch) return;

        Store.state.currentFiles['index.html'] = ch.initialCode;
        EditorEngine.switchFile('index.html');
        this.navigateTo('editor');
        this.showToast(`Супориш ба муҳаррир бор шуд: ${ch.title}`, 'info');
    },

    // Render User Projects Grid
    renderProjects() {
        const grid = document.getElementById('projectsGrid');
        grid.innerHTML = Store.state.projects.map(p => `
            <div class="project-card">
                <h3>${p.name}</h3>
                <p style="color: var(--text-secondary); font-size: 0.8rem; margin-top: 0.25rem;">HTML • CSS • JavaScript</p>
                <div class="project-actions">
                    <button class="btn btn-primary btn-sm" onclick="App.loadProject('${p.id}')">Кушодан</button>
                    <button class="btn btn-secondary btn-sm" onclick="App.deleteProject('${p.id}')">Узафидан</button>
                </div>
            </div>
        `).join('');
    },

    loadProject(id) {
        const project = Store.state.projects.find(p => p.id === id);
        if (!project) return;

        Store.state.currentFiles['index.html'] = project.html;
        Store.state.currentFiles['style.css'] = project.css;
        Store.state.currentFiles['script.js'] = project.js;
        
        EditorEngine.switchFile('index.html');
        this.navigateTo('editor');
        this.showToast(`Лоиҳаи "${project.name}" бор карда шуд!`, 'success');
    },

    deleteProject(id) {
        Store.state.projects = Store.state.projects.filter(p => p.id !== id);
        Store.save();
        this.renderProjects();
        this.showToast('Лоиҳа нест карда шуд.', 'info');
    },

    // Leaderboard Data Engine
    renderLeaderboard() {
        const body = document.getElementById('leaderboardBody');
        const mockUsers = [
            { rank: 1, name: 'Сомон Шарипов', level: 12, xp: 2450, completed: 42 },
            { rank: 2, name: 'Фарзона К.', level: 10, xp: 1980, completed: 35 },
            { rank: 3, name: Store.state.user.username, level: Store.state.user.level, xp: Store.state.user.xp, completed: Store.state.user.completedChallenges.length }
        ];

        body.innerHTML = mockUsers.map(u => `
            <tr>
                <td><strong>#${u.rank}</strong></td>
                <td>${u.name}</td>
                <td><span class="badge badge-medium">Lvl ${u.level}</span></td>
                <td>${u.xp} XP</td>
                <td>${u.completed}</td>
            </tr>
        `).join('');
    },

    // Render Profile & User Gamification Engine
    renderProfile() {
        document.getElementById('profileUsername').innerText = Store.state.user.username;
        document.getElementById('profileXP').innerText = Store.state.user.xp;
        document.getElementById('profileLevel').innerText = Store.state.user.level;
        
        const achGrid = document.getElementById('achievementsGrid');
        achGrid.innerHTML = ACHIEVEMENTS_DATABASE.map(ach => {
            const unlocked = Store.state.user.achievements.includes(ach.id);
            return `
                <div class="g-box" style="opacity: ${unlocked ? '1' : '0.4'}">
                    <i class="${ach.icon}"></i>
                    <div>
                        <span class="g-val">${ach.title}</span>
                        <span class="g-lbl">${ach.desc}</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    // Global Keybindings & Event Handlers
    bindEvents() {
        document.getElementById('btnRunCode').addEventListener('click', () => {
            EditorEngine.executeCode();
            this.showToast('Код бомуваффақият иҷро шуд!', 'success');
        });

        document.getElementById('btnSaveCode').addEventListener('click', () => {
            Store.saveProject(Store.state.activeProject, 'Лоиҳаи захирашуда', Store.state.currentFiles);
            this.renderProjects();
            this.showToast('Лоиҳа ба LocalStorage захира шуд!', 'success');
        });

        document.getElementById('btnNewProject').addEventListener('click', () => {
            const name = prompt('Номи лоиҳаи навро ворид кунед:');
            if (name) {
                Store.saveProject(null, name, { 'index.html': '<h1>Нов</h1>', 'style.css': '', 'script.js': '' });
                this.renderProjects();
            }
        });

        // Keyboard Shortcuts (Ctrl + Enter, Ctrl + S, Ctrl + K)
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                EditorEngine.executeCode();
            }
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                document.getElementById('btnSaveCode').click();
            }
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.toggleCommandPalette();
            }
        });

        // Editor File Tab Switcher
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
                const target = e.currentTarget;
                target.classList.add('active');
                const file = target.getAttribute('data-file');
                EditorEngine.switchFile(file);
            });
        });

        // Editor Panel Tab Switcher (Preview / Console / Errors)
        document.querySelectorAll('.panel-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.panel-view').forEach(v => v.classList.remove('active'));
                const target = e.currentTarget;
                target.classList.add('active');
                const panel = target.getAttribute('data-panel');
                document.getElementById(`panel-${panel}`).classList.add('active');
            });
        });
    },

    toggleCommandPalette() {
        const palette = document.getElementById('commandPalette');
        palette.classList.toggle('hidden');
        if (!palette.classList.contains('hidden')) {
            document.getElementById('commandInput').focus();
        }
    },

    showToast(msg, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerText = msg;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3500);
    }
};

// Initialize Application when DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());