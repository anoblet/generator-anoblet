var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.argument('element', {type: String, required: true});
    }

    method1() {
        this.data = {};
        this.data.element = this.options.element;

        var parts = this.options.element.split('-');

        var namespace = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        var element = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);

        this.data._class = namespace + element;

        var prompts = [{
            type: 'input',
            name: '_path',
            message: 'Path',
            default: './',
            store: true
        }, {
            type: 'confirm',
            name: 'separateDirectory',
            message: 'Seperate directory?',
            default: false,
            store: true
        }];

        return this.prompt(prompts).then((data) => {
            this.options._path = data._path;
            this.options.separateDirectory = data.separateDirectory;
        });
    }

    method2() {
        this.log(this.options.separateDirectory);
        this.log(this.contextRoot);
        const path = require('path');

        var relative = true;

        if (relative) this.elementPath = path.join(this.contextRoot, '');

        this.log(this.elementPath);

        if (this.options._path == './') ;
        else {
            this.elementPath = path.join(this.elementPath, this.options._path);
        }

        if (this.options.separateDirectory) {
            this.elementPath = path.join(this.elementPath, this.options.element);
        }
        this.elementDir = this.elementPath;
        this.elementPath = path.join(this.elementPath, this.options.element + '.html');

        this.log(this.elementPath);

        this.fs.copyTpl(
            this.templatePath('element.html'),
            this.destinationPath(this.elementPath),
            this.data
        );
    }

    method3() {
        /*
        this.log(this.elementDir);
        if (this.options.separateDirectory) {
            process.chdir(this.elementPath);
            this.spawnCommandSync('git', ['init']);
        }
        */
    }
};