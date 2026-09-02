const EditorEngine = {
    monacoInstance: null,
    activeFile: 'index.html',

    init() {
        this.initMonaco();
        this.bindEvents();
    },

    initMonaco() {
        if (typeof require !== 'undefined') {
            require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs' }});
            require(['vs/editor/editor.main'], () => {
                document.getElementById('fallbackTextarea').style.display = 'none';
                this.monacoInstance = monaco.editor.create(document.getElementById('monacoEditorContainer'), {
                    value: Store.state.currentFiles[this.activeFile],
                    language: this.getLanguageByFile(this.activeFile),
                    theme: 'vs-dark',
                    automaticLayout: true,
                    fontSize: 14,
                    tabSize: 2
                });

                this.monacoInstance.onDidChangeModelContent(() => {
                    Store.state.currentFiles[this.activeFile] = this.monacoInstance.getValue();
                });
            });
        }
    },

    getLanguageByFile(filename) {
        if (filename.endsWith('.html')) return 'html';
        if (filename.endsWith('.css')) return 'css';
        if (filename.endsWith('.js')) return 'javascript';
        return 'plaintext';
    },

    switchFile(filename) {
        this.activeFile = filename;
        const code = Store.state.currentFiles[filename] || '';
        if (this.monacoInstance) {
            const model = monaco.editor.createModel(code, this.getLanguageByFile(filename));
            this.monacoInstance.setModel(model);
        } else {
            document.getElementById('fallbackTextarea').value = code;
        }
    },

    executeCode() {
        const previewFrame = document.getElementById('previewFrame');
        const consoleOutput = document.getElementById('consoleOutput');
        const errorBox = document.getElementById('errorBox');
        
        consoleOutput.innerHTML = '';
        errorBox.innerHTML = '<div class="no-errors"><i class="fa-solid fa-circle-check"></i> Ҳеҷ хатое ёфт нашуд.</div>';

        const html = Store.state.currentFiles['index.html'] || '';
        const css = `<style>${Store.state.currentFiles['style.css'] || ''}</style>`;
        
        // Console Interception Script injected into the Sandboxed Frame
        const consoleOverrideScript = `
            <script>
                (function() {
                    const _log = console.log;
                    const _error = console.error;
                    console.log = function(...args) {
                        window.parent.postMessage({ type: 'CONSOLE_LOG', data: args.join(' ') }, '*');
                        _log.apply(console, args);
                    };
                    window.onerror = function(msg, url, line) {
                        window.parent.postMessage({ type: 'CONSOLE_ERROR', msg: msg, line: line }, '*');
                        return true;
                    };
                })();
            </script>
        `;

        const js = `<script>${Store.state.currentFiles['script.js'] || ''}</script>`;

        const combinedSource = `
            <!DOCTYPE html>
            <html>
            <head>${css}</head>
            <body>
                ${consoleOverrideScript}
                ${html}
                ${js}
            </body>
            </html>
        `;

        previewFrame.srcdoc = combinedSource;
    },

    bindEvents() {
        window.addEventListener('message', (event) => {
            if (!event.data) return;
            if (event.data.type === 'CONSOLE_LOG') {
                const line = document.createElement('div');
                line.className = 'console-line console-log';
                line.innerText = `> ${event.data.data}`;
                document.getElementById('consoleOutput').appendChild(line);
            }
            if (event.data.type === 'CONSOLE_ERROR') {
                const errorBox = document.getElementById('errorBox');
                errorBox.innerHTML = `
                    <div class="error-card">
                        <h4>❌ Хатогии Ҷоваскрипт</h4>
                        <p><strong>Сатҳ ${event.data.line}:</strong> ${event.data.msg}</p>
                        <p><em>Тавсия:</em> Код ва аломатҳои қавсро дар сатри овардашуда санҷед.</p>
                    </div>
                `;
            }
        });
    }
};