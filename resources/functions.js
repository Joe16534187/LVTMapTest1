var createTextStyle = function(feature, resolution, labelText, labelFont,
                               labelFill, placement, bufferColor,
                               bufferWidth) {

    if (feature.hide || !labelText) {
        return; 
    } 

    if (bufferWidth == 0) {
        var bufferStyle = null;
    } else {
        var bufferStyle = new ol.style.Stroke({
            color: bufferColor,
            width: bufferWidth
        })
    }
    
    var textStyle = new ol.style.Text({
        font: labelFont,
        text: labelText,
        textBaseline: "middle",
        textAlign: "left",
        offsetX: 8,
        offsetY: 3,
        placement: placement,
        maxAngle: 0,
        fill: new ol.style.Fill({
          color: labelFill
        }),
        stroke: bufferStyle
    });

    return textStyle;
};

function stripe(stripeWidth, gapWidth, angle, color) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = screen.width;
    canvas.height = stripeWidth + gapWidth;
    context.fillStyle = color;
    context.lineWidth = stripeWidth;
    context.fillRect(0, 0, canvas.width, stripeWidth);
    innerPattern = context.createPattern(canvas, 'repeat');

    var outerCanvas = document.createElement('canvas');
    var outerContext = outerCanvas.getContext('2d');
    outerCanvas.width = screen.width;
    outerCanvas.height = screen.height;
    outerContext.rotate((Math.PI / 180) * angle);
    outerContext.translate(-(screen.width/2), -(screen.height/2));
    outerContext.fillStyle = innerPattern;
    outerContext.fillRect(0,0,screen.width,screen.height);

    return outerContext.createPattern(outerCanvas, 'no-repeat');
};

// More Information modal behaviour
// Wrap setup to run after DOM is ready so elements exist when we query them
document.addEventListener('DOMContentLoaded', function () {
    (function () {
        const openBtn = document.getElementById('more-info-btn');
        const modal = document.getElementById('more-info-modal');
        const closeBtn = document.getElementById('more-info-close');
        const overlay = modal ? modal.querySelector('.more-info-overlay') : null;
        let lastActive = null;

        if (!modal || !openBtn) return;

        function showModal() {
            lastActive = document.activeElement;
            modal.setAttribute('aria-hidden', 'false');
            closeBtn && closeBtn.focus();
            document.addEventListener('keydown', onKeyDown);
        }

        function hideModal() {
            modal.setAttribute('aria-hidden', 'true');
            document.removeEventListener('keydown', onKeyDown);
            if (lastActive && typeof lastActive.focus === 'function') lastActive.focus();
        }

        function onKeyDown(e) {
            if (e.key === 'Escape' || e.key === 'Esc') {
                hideModal();
            }
        }

        openBtn.addEventListener('click', function () {
            showModal();
        });

        closeBtn && closeBtn.addEventListener('click', function () {
            hideModal();
        });

        if (overlay) {
            overlay.addEventListener('click', function () {
                hideModal();
            });
        }
    })();
});
