# Interactive Features Module

A native JavaScript plugin that enables you to produce interactive feature points on an image where you can describe what feature is being seen.

## Quick start

- Download the latest version from [GitHub](https://github.com/Dubbie/interactive-features-module).

## Getting started
### CSS
Copy-paste the downloaded stylesheet `<link>` into your `<head>`.
```
<link rel="stylesheet" href="./ifm-core/ifm-core.css">
```

### JavaScript
To have faster loading times I recommend putting the `<script>` into your `<head>` element with the `defer` attribute.
```
<script defer src="./ifm-core/ifm-core.js"></script>
```
After the `<script>` has been loaded you can start using the module.


## Example
The code of the features image at the top of the website.
```
<script>
    // As soon as the DOM is ready, initialize IFM Core
    document.addEventListener('DOMContentLoaded', () => {
        const ifm = new IFMCore('ifm-features', {
            src: './code-sample.png'
        });

        ifm.addFeature({
            x: '2%',
            y: '19%',
            text: 'Create an IFM object with the options you want.'
        });
        ifm.addFeature({
            x: '2%',
            y: '57%',
            text: 'Add your features easily in a single function',
            vAlign: 'bottom'
        });
        ifm.addFeature({
            x: '19%',
            y: '41%',
            text: 'Easily set the placement of your buttons',
            hAlign: 'right',
            vAlign: 'bottom'
        });
    });
</script>

```

### addFeature
The addFeature method requires an object passed to it that has at least the 3 required parameters set.

Key | Description
----|------------
**x**| 	Position of the button horizontally
**y**| 	Position of the button vertically
**text**| 	Text shown on hover
*hAlign (Optional)* | Horizontal alignment of the button
*vAlign (Optional)* | Vertical alignment of the button