'use strict';

$('#menu').onePageNav({
    currentClass: "active",
    changeHash: false,
    scrollThreshold: 0.5,
    scrollSpeed: 500,
    filter: '',
    easing: 'swing'
});

React.render(React.createElement(TeamSearchBox, null), document.getElementById('content'));

//# sourceMappingURL=app-compiled.js.map