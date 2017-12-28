var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.argument('element', {type: String, required: true});
        // this.argument('ns', {type: String, required: true});
        // this.argument('el', {type: String, required: true});
    }

    method1() {
        this.data = {};
        this.data.element = this.options.element;
        var p = this.options.element.split('-');

        var namespace = p[0].charAt(0).toUpperCase() + p[0].slice(1);
        var element = p[1].charAt(0).toUpperCase() + p[1].slice(1);

        this.data._class = namespace + element;

        this.log(this.data.element);
        this.log('method 1 just ran');

        /*
        return this.prompt([
            {
                type: 'input',
                name: 'namespace',
                message: 'Namespace',
                default: this.appname // Default to current folder name
            },
            {
                type: 'input',
                name: 'element',
                message: 'Element name',
                default: this.appname // Default to current folder name
            }
        ]).then((answers) => {
            this.log('app name', answers.name);
            this.log('cool feature', answers.cool);
            this.answers = answers;
        });
        */
        return this.prompt([
            {
                type: 'input',
                name: 'path',
                message: 'Path',
                default: 'src', // Default to current folder name
                store   : true
            }
        ]).then((data) => {
            this.options.path = data.path;
            /*
            this.log('app name', answers.name);
            this.log('cool feature', answers.cool);
            this.answers = answers;
            */
        });
    }

    method2() {
        this.fs.copyTpl(
            this.templatePath('element.html'),
            this.destinationPath(this.options.path + '/' + this.options.element + '.html'),
            this.data
        );
    }
};