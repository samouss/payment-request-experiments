import 'bulma/css/bulma.css';
import instantsearch from 'instantsearch.js';
import { searchBox, hits, configure } from 'instantsearch.js/es/widgets';

const search = instantsearch({
  appId: 'latency',
  apiKey: '6be0576ff61c053d5f9a3225e2a90f76',
  indexName: 'instant_search',
});

search.addWidget(
  configure({
    hitsPerPage: 8,
  })
);

search.addWidget(
  searchBox({
    container: document.getElementById('searchbox'),
    placeholder: 'Search for products',
    autofocus: false,
    magnifier: false,
    reset: false,
    cssClasses: {
      root: 'control',
      input: 'input',
    },
  })
);

search.addWidget(
  hits({
    container: document.getElementById('products'),
    templates: {
      item: '{{{ _highlightResult.name.value }}}',
    },
  })
);

search.start();
