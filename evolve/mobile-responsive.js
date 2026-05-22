/* Evolve Idle Premium Mobile-Responsive Helper Script */

$(document).ready(function() {
    // 1. Initialize Mobile Active Tab State
    $('body').addClass('mobile-tab-game');

    // 2. Safely fetch localized labels using game's built-in loc() function
    var gameLabel = 'Game';
    var resourcesLabel = 'Resources';
    var logsLabel = 'Queue & Logs';

    try {
        if (typeof window.loc === 'function') {
            gameLabel = window.loc('tab_civil') || 'Game';
            resourcesLabel = window.loc('tab_resources') || 'Resources';
            logsLabel = window.loc('message_log') || 'Queue & Logs';
        }
    } catch (e) {
        console.warn('Evolve localization not fully loaded yet; using defaults.', e);
    }

    // 3. Inject bottom navigation bar HTML
    $('body').append(`
        <div id="mobile-nav-bar" class="mobile-nav-bar">
            <div class="mobile-nav-item active" data-tab="game">
                <svg class="mobile-nav-icon" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span class="mobile-nav-label">${gameLabel}</span>
            </div>
            <div class="mobile-nav-item" data-tab="resources">
                <svg class="mobile-nav-icon" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0-4H7V7h10v2zm0 8H7v-2h10v2z"/>
                </svg>
                <span class="mobile-nav-label">${resourcesLabel}</span>
            </div>
            <div class="mobile-nav-item" data-tab="logs">
                <svg class="mobile-nav-icon" viewBox="0 0 24 24">
                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
                <span class="mobile-nav-label">${logsLabel}</span>
            </div>
        </div>
    `);

    // 4. Setup Mobile Navigation Click Handlers
    $(document).on('click', '.mobile-nav-item', function() {
        var tab = $(this).attr('data-tab');
        
        // Update active class on nav items
        $('.mobile-nav-item').removeClass('active');
        $(this).addClass('active');
        
        // Update state class on body to trigger CSS transitions
        $('body').removeClass('mobile-tab-game mobile-tab-resources mobile-tab-logs');
        $('body').addClass('mobile-tab-' + tab);

        // Force browser layout redraw for horizontal scroll tabs if switching back to game
        if (tab === 'game') {
            $('.tabs ul').each(function() {
                this.scrollLeft = this.scrollLeft; // trigger redraw
            });
        }
    });

    // 5. Dynamic translation updater (in case languages change inside game settings)
    var updateTranslationInterval = setInterval(function() {
        if (typeof window.loc === 'function') {
            try {
                var gl = window.loc('tab_civil');
                var rl = window.loc('tab_resources');
                var ll = window.loc('message_log');
                
                if (gl) $('.mobile-nav-item[data-tab="game"] .mobile-nav-label').text(gl);
                if (rl) $('.mobile-nav-item[data-tab="resources"] .mobile-nav-label').text(rl);
                if (ll) $('.mobile-nav-item[data-tab="logs"] .mobile-nav-label').text(ll);
                
                // Once we verify localization exists and is bound, we can keep monitoring or reduce frequency
            } catch (e) {}
        }
    }, 2000);

});
