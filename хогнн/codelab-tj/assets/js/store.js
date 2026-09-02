const Store = {
    STORAGE_KEY: 'CODELAB_TJ_DATA',

    state: {
        user: {
            username: 'Кодери №1',
            level: 1,
            xp: 0,
            streak: 1,
            completedChallenges: [],
            achievements: ['ach_first_code']
        },
        projects: [
            { id: 'proj_default', name: 'Портфолиои ман', html: '<h1>Салом World!</h1>', css: 'h1 { color: #6366f1; }', js: 'console.log("Лоиҳа омода аст!");', updatedAt: 'Акнун' }
        ],
        activeProject: 'proj_default',
        currentFiles: {
            'index.html': '<h1>Hello CodeLab TJ!</h1>\n<button id="demoBtn">Пахш кунед</button>',
            'style.css': 'body { font-family: sans-serif; text-align: center; padding-top: 50px; }\nbutton { background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }',
            'script.js': 'document.getElementById("demoBtn").addEventListener("click", () => {\n  alert("Код бомуваффақият иҷро шуд!");\n  console.log("Тугма пахш шуд!");\n});'
        }
    },

    init() {
        const localData = localStorage.getItem(this.STORAGE_KEY);
        if (localData) {
            try {
                this.state = JSON.parse(localData);
            } catch (e) {
                console.error("Хатогӣ дар хондани LocalStorage", e);
            }
        } else {
            this.save();
        }
    },

    save() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    },

    addXP(points) {
        this.state.user.xp += points;
        const newLevel = Math.floor(this.state.user.xp / 100) + 1;
        if (newLevel > this.state.user.level) {
            this.state.user.level = newLevel;
            return true; // Leveled Up
        }
        this.save();
        return false;
    },

    saveProject(id, name, files) {
        const index = this.state.projects.findIndex(p => p.id === id);
        const projectData = {
            id: id || 'proj_' + Date.now(),
            name: name || 'Лоиҳаи нав',
            html: files['index.html'],
            css: files['style.css'],
            js: files['script.js'],
            updatedAt: 'Имрӯз'
        };

        if (index >= 0) {
            this.state.projects[index] = projectData;
        } else {
            this.state.projects.push(projectData);
        }
        this.save();
    }
};

Store.init();