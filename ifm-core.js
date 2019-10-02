(function () {
    // Define the constructor
    this.IFMCore = function () {
        this.el = null;
        this.id = null;
        this.debug = true;
        this.options = {
            width: '100%',
            height: '500px',
            src: './features.png',
        };

        // Based on the arguments, find the element first
        if (arguments.length === 0) {
            error('No arguments gives')
        } else if (typeof arguments[0] === 'string') {
            this.id = arguments[0];
            this.el = document.getElementById(this.id);
        } else {
            error('First argument should be the ID of the DOM element.')
        }

        // Find the correct ID
        this.el = document.getElementById(this.id);
        if (this.debug) {
            if (this.el) {
                logMessage('-- DOM Element found --');
                console.log(this.el);
            } else {
                error('Could not find DOM element with ID: ' + this.id);
            }
        }

        //
        if (arguments.length === 2 && typeof arguments[1] === 'object') {
            const opts = arguments[1];
            for (const prop in opts) {
                if (opts.hasOwnProperty(prop)) {
                    this.options[prop] = opts[prop];
                }
            }
        }

        // Start building the element
        buildElement(this);
    };

    function buildElement(IFM) {
        const container = document.createElement('div');
        container.id = IFM.id + '-container';
        container.classList.add('ifm-core-container');

        const image = document.createElement('img');
        image.classList.add('ifm-core-image');
        image.src = IFM.options.src;
        image.style.maxWidth = '100%';

        container.appendChild(image);

        // Append the newly created container to the given element
        IFM.el.appendChild(container);
    }

    function error(message) {
        console.error('IFMCore: ' + message);
        return false;
    }

    function logMessage(message) {
        console.log('IFMCore: ' + message);
    }
}());