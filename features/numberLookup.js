(function () {
    'use strict';

    const LNT = window.LNT || (window.LNT = {});
    const RESULT_COUNT = 3;

    function createEl(tag, className, text) {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (text) el.textContent = text;
        return el;
    }

    // "+13527322486" -> "352-732-2486" (null if not 10 digits)
    function formatForSearch(rawNumber) {
        const digits = rawNumber.replace(/\D/g, '').slice(-10);
        if (digits.length !== 10) return null;
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    // DuckDuckGo wraps result links in a redirect; pull the real URL back out
    function realUrl(href) {
        const url = new URL(href, 'https://duckduckgo.com');
        return url.searchParams.get('uddg') || href;
    }

    function parseResults(html) {
        const page = new DOMParser().parseFromString(html, 'text/html');
        const results = [];

        for (const item of page.querySelectorAll('.result:not(.result--ad)')) {
            const link = item.querySelector('a.result__a');
            if (!link) continue;

            results.push({
                title: link.textContent.trim(),
                url: realUrl(link.getAttribute('href')),
                snippet: item.querySelector('.result__snippet')?.textContent.trim() || '',
            });

            if (results.length === RESULT_COUNT) break;
        }
        return results;
    }

    // GM_xmlhttpRequest, not fetch: it's allowed to call another site
    function fetchResults(query) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'POST',
                url: 'https://html.duckduckgo.com/html/',
                data: `q=${encodeURIComponent(query)}`,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Referer': 'https://html.duckduckgo.com/',
                },
                timeout: 10000,
                onload: response => {
                    const html = response.responseText;
                    if (response.status !== 200 || html.includes('anomaly-modal')) {
                        reject(new Error(`DuckDuckGo blocked the request (status ${response.status})`));
                        return;
                    }
                    resolve(parseResults(html));
                },
                onerror: () => reject(new Error('the request failed')),
                ontimeout: () => reject(new Error('the request timed out')),
            });
        });
    }

    function render(body, searchNumber, results, emptyMessage = 'No results found.') {
        body.replaceChildren();
        body.append(createEl('div', 'lnt-box-title', `Results for ${searchNumber}`));

        if (results.length === 0) {
            body.append(createEl('div', 'lnt-result-snippet', emptyMessage));
        }

        for (const result of results) {
            const link = createEl('a', 'lnt-result-title', result.title);
            link.href = result.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            const domain = new URL(result.url).hostname.replace(/^www\./, '');

            const item = createEl('div', 'lnt-result');
            item.append(
                link,
                createEl('div', 'lnt-result-domain', domain),
                createEl('div', 'lnt-result-snippet', result.snippet)
            );
            body.append(item);
        }

        // Manual fallbacks
        const q = encodeURIComponent(searchNumber);
        const footer = createEl('div', 'lnt-result-snippet', 'Search manually: ');
        const ddg = createEl('a', '', 'DuckDuckGo');
        ddg.href = `https://duckduckgo.com/?q=${q}`;
        const google = createEl('a', '', 'Google');
        google.href = `https://www.google.com/search?q=${q}`;
        for (const a of [ddg, google]) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
        footer.append(ddg, ' · ', google);
        body.append(footer);
    }

    LNT.numberLookup = {
        async run(rawNumber) {
            const body = LNT.ui.refs.lookupBody;
            if (!body) return;

            const searchNumber = formatForSearch(rawNumber || '');
            if (!searchNumber) {
                body.textContent = "Couldn't read a 10-digit number.";
                return;
            }

            body.textContent = `Searching ${searchNumber}...`;
            try {
                render(body, searchNumber, await fetchResults(searchNumber));
            } catch (error) {
                render(body, searchNumber, [], `Search failed: ${error.message}.`);
            }
        },
    };
})();