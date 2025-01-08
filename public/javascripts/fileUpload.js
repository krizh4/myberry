const rootStyles = window.getComputedStyle(document.documentElement)

if (rootStyles.getPropertyValue('--book-cover-width-large') != null && rootStyles.getPropertyValue('--book-cover-width-large') != '') {
    ready()
} else {
    document.getElementById('main-css')
    .addEventListener('load', ready)
}

function ready(){
    const coverWidth = parseFloat(rootStyles.getPropertyValue('--book-cover-width-large'))
    const coverAspectRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-raito'))
    const coverHeight = coverWidth / coverAspectRatio

    document.addEventListener('DOMContentLoaded', function() {
        FilePond.registerPlugin(FilePondPluginImagePreview);
        FilePond.registerPlugin(FilePondPluginImageResize);
        FilePond.registerPlugin(FilePondPluginFileEncode);
    
        const inputElement = document.querySelector('input[type="file"]');
        const pond = FilePond.create(inputElement);
        pond.setOptions({
            stylePanelAspectRatio: 1 / coverAspectRatio,
            imageResizeTargetWidth: coverWidth,
            imageResizeTargetHeight: coverHeight,
        });
    
        FilePond.parse(document.body);
    });
}

