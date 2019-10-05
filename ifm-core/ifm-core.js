(function () {
    this.IFMCore = function () {
        this.el = null;
        this.id = null;
        this.tooltip = null;
        this.debug = true;
        this.options = {
            width: '',
            height: '',
            src: '',
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

    /**
     * Creates a button on the IFM Container with the proper attributes
     * @param data
     */
    IFMCore.prototype.addFeature = function(data) {
        const btn = document.createElement('span');
        btn.classList.add('ifm-core-btn');
        btn.style.top = data.y;
        btn.style.left = data.x;
        btn.title = data.text;

        // Handle other alignments
        if (data.hAlign && data.hAlign.toLocaleLowerCase() === 'right') {
            btn.style.left = 'auto';
            btn.style.right = data.x;
        }
        if (data.vAlign && data.vAlign.toLocaleLowerCase() === 'bottom') {
            btn.style.top = 'auto';
            btn.style.bottom = data.y;
        }

        btn.addEventListener('mouseenter', e => {
            this.updateTooltip(data);
            btn.title = '';
        });

        btn.addEventListener('mouseleave', e => {
            btn.title = data.text;
            this.hideTooltip();
        });

        // Add this button to the container
        this.el.children[0].appendChild(btn);

        // Creates the mobile element
        const li = document.createElement('li');
        li.textContent = data.text;
        this.mobileContainer.appendChild(li);
    };

    /**
     * Updates the IFM Tooltip with proper attributes
     * @param data
     */
    IFMCore.prototype.updateTooltip = function(data) {
        const tooltip = this.tooltip;

        // Reset tooltip
        tooltip.style.removeProperty('top');
        tooltip.style.removeProperty('right');
        tooltip.style.removeProperty('bottom');
        tooltip.style.removeProperty('left');
        tooltip.style.removeProperty('margin-top');
        tooltip.style.removeProperty('margin-bottom');
        tooltip.classList.remove('ifm-core-tooltip-right');
        tooltip.classList.remove('ifm-core-tooltip-bottom');

        // Show now
        tooltip.classList.add('ifm-core-show');
        tooltip.innerHTML = data.text;
        tooltip.style.top = data.y;
        tooltip.style.left = data.x;

        if (data.hAlign && data.hAlign.toLocaleLowerCase() === 'right') {
            tooltip.style.left = 'auto';
            tooltip.style.right = data.x;
            tooltip.classList.add('ifm-core-tooltip-right');
        }
        if (data.vAlign && data.vAlign.toLocaleLowerCase() === 'bottom') {
            tooltip.style.top = 'auto';
            tooltip.style.bottom = data.y;
            tooltip.classList.add('ifm-core-tooltip-bottom');
        }
    };

    /**
     * Hides the currently shown tooltip
     */
    IFMCore.prototype.hideTooltip = function() {
        this.tooltip.classList.remove('ifm-core-show');
    };

    /**
     * Builds the IFM Container, Image and Tooltip elements
     * @param IFM
     */
    function buildElement(IFM) {
        const container = document.createElement('div');
        container.id = IFM.id + '-container';
        container.classList.add('ifm-core-container');

        const mobileContainer = document.createElement('ul');
        mobileContainer.classList.add('ifm-core-mobile-container');

        const image = document.createElement('img');
        image.classList.add('ifm-core-image');
        image.src = IFM.options.src;
        image.style.maxWidth = '100%';

        const tooltip = document.createElement('div');
        tooltip.classList.add('ifm-core-tooltip');

        // Add elements to container
        container.appendChild(image);
        container.appendChild(mobileContainer);
        container.appendChild(tooltip);

        // Append the newly created container to the given element
        IFM.el.appendChild(container);
        // Update tooltip
        IFM.tooltip = tooltip;
        // Update mobile container
        IFM.mobileContainer = mobileContainer;
    }

    /**
     * Throws an error with a message
     * @param message
     * @returns {boolean}
     */
    function error(message) {
        console.error('IFMCore: ' + message);
        return false;
    }
}());