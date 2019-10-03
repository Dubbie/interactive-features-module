(function () {
    // Define the constructor
    this.IFMCore = function () {
        this.el = null;
        this.id = null;
        this.tooltip = null;
        this.debug = true;
        this.options = {
            width: '100%',
            height: '500px',
            src: './features.png',
        };
        this.addFeature = createFeatureButton;

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

        // Extend defaults
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

    function createFeatureButton(data) {
        const btn = document.createElement('span');
        btn.classList.add('ifm-core-btn');
        btn.style.top = data.y;
        btn.style.left = data.x;

        // Handle other alignments
        if (data.hAlign && data.hAlign.toLocaleLowerCase() === 'right') {
            btn.style.left = 'auto';
            btn.style.right = data.x;
        }
        if (data.vAlign && data.vAlign.toLocaleLowerCase() === 'bottom') {
            btn.style.top = 'auto';
            btn.style.bottom = data.y;
        }

        // Fallback
        btn.title = data.text;

        btn.addEventListener('mouseenter', e => {
            updateTooltip(this, data);
            btn.title = '';
        });

        btn.addEventListener('mouseleave', e => {
            btn.title = data.text;
            hideTooltip(this);
        });

        // Add this button to the container
        this.el.children[0].appendChild(btn);
    }

    function updateTooltip(ifm, data) {
        const tooltip = ifm.tooltip;

        // Reset tooltip
        tooltip.style.removeProperty('top');
        tooltip.style.removeProperty('right');
        tooltip.style.removeProperty('bottom');
        tooltip.style.removeProperty('left');
        tooltip.style.removeProperty('margin-top');
        tooltip.style.removeProperty('margin-bottom');

        // Show now
        tooltip.classList.add('ifm-core-show');
        tooltip.innerText = data.text;
        tooltip.style.top = data.y;
        tooltip.style.left = data.x;

        if (data.hAlign && data.hAlign.toLocaleLowerCase() === 'right') {
            tooltip.style.left = 'auto';
            tooltip.style.right = data.x;
        }
        if (data.vAlign && data.vAlign.toLocaleLowerCase() === 'bottom') {
            tooltip.style.top = 'auto';
            tooltip.style.bottom = data.y;
            tooltip.style.marginTop = '0';
            tooltip.style.marginBottom = 'calc(25px + 10px)';
        }

        ifm.tooltip = tooltip;
    }

    function hideTooltip(ifm) {
        ifm.tooltip.classList.remove('ifm-core-show');
    }


    function buildElement(IFM) {
        const container = document.createElement('div');
        container.id = IFM.id + '-container';
        container.classList.add('ifm-core-container');

        const image = document.createElement('img');
        image.classList.add('ifm-core-image');
        image.src = IFM.options.src;
        image.style.maxWidth = '100%';

        const tooltip = document.createElement('div');
        tooltip.classList.add('ifm-core-tooltip');

        // Add elements to container
        container.appendChild(image);
        container.appendChild(tooltip);

        // Append the newly created container to the given element
        IFM.el.appendChild(container);
        // Update tooltip
        IFM.tooltip = tooltip;
    }

    function error(message) {
        console.error('IFMCore: ' + message);
        return false;
    }

    function logMessage(message) {
        console.log('IFMCore: ' + message);
    }
}());