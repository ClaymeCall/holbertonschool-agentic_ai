const issues = [
  { number: 335958, title: 'github.com refused to connect.', kind: 'Issue', state: 'open', author: 'bettieharlem-star', assignee: null, comments: 0, created: '2026-09-12T14:40:04Z', labels: [], url: 'https://github.com/microsoft/vscode/issues/335958', avatar: 'https://avatars.githubusercontent.com/u/319513458?v=4' },
  { number: 335957, title: 'Add PR comment on selection in Agents', kind: 'Pull request', state: 'open', author: 'alexr00', assignee: 'alexr00', comments: 1, created: '2026-09-12T13:41:54Z', labels: [], url: 'https://github.com/microsoft/vscode/pull/335957', avatar: 'https://avatars.githubusercontent.com/u/38270282?v=4' },
  { number: 335956, title: 'feat(save): Opening a non-existent file should not trigger "save file"', kind: 'Pull request', state: 'closed', author: 'tlimoncelli26', assignee: null, comments: 0, created: '2026-09-12T13:02:51Z', labels: [], url: 'https://github.com/microsoft/vscode/pull/335956', avatar: 'https://avatars.githubusercontent.com/u/279820991?v=4' },
  { number: 335955, title: 'Settings editor and other webview-based panels cannot be detached into a real, independent OS window', kind: 'Issue', state: 'open', author: 'htibx', assignee: 'rzhao271', comments: 0, created: '2026-09-12T12:40:25Z', labels: ['new release'], url: 'https://github.com/microsoft/vscode/issues/335955', avatar: 'https://avatars.githubusercontent.com/u/176218058?v=4' },
  { number: 335954, title: 'Add `workbench.editor.tabHoverInformation` to customize editor tab hover', kind: 'Pull request', state: 'open', author: 'jeeva-m-21', assignee: null, comments: 0, created: '2026-09-12T12:21:07Z', labels: [], url: 'https://github.com/microsoft/vscode/pull/335954', avatar: 'https://avatars.githubusercontent.com/u/146186034?v=4' }
];

const list = document.querySelector('#issue-list');
const emptyState = document.querySelector('#empty-state');
const searchInput = document.querySelector('#search-input');
const sortSelect = document.querySelector('#sort-select');
const filterButtons = document.querySelectorAll('.filter-button');
let currentFilter = 'all';

const dateFormatter = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' });
function relativeDate(date) {
  const days = Math.round((new Date(date) - new Date('2026-09-12T15:00:00Z')) / 86400000);
  if (Math.abs(days) < 1) return 'aujourd’hui';
  return dateFormatter.format(days, 'day');
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = issues.filter((issue) => {
    const matchesFilter = currentFilter === 'all' || issue.state === currentFilter;
    const searchable = `${issue.title} ${issue.author} ${issue.number} ${issue.labels.join(' ')}`.toLowerCase();
    return matchesFilter && searchable.includes(query);
  }).sort((a, b) => {
    if (sortSelect.value === 'oldest') return new Date(a.created) - new Date(b.created);
    if (sortSelect.value === 'comments') return b.comments - a.comments;
    return new Date(b.created) - new Date(a.created);
  });

  list.innerHTML = visible.map((issue) => `
    <article class="issue-row">
      <span class="issue-number">#${issue.number}</span>
      <div class="issue-main">
        <a class="issue-title" href="${issue.url}" target="_blank" rel="noreferrer">${issue.title}</a>
        <div class="issue-meta">
          <span class="issue-kind ${issue.kind === 'Issue' ? 'is-issue' : ''}">${issue.kind}</span>
          <span class="issue-state ${issue.state === 'closed' ? 'is-closed' : ''}">${issue.state === 'open' ? 'ouvert' : 'fermé'}</span>
          ${issue.labels.map((label) => `<span class="label">${label}</span>`).join('')}
          <span>par ${issue.author}</span>
          <span>${relativeDate(issue.created)}</span>
        </div>
      </div>
      <div class="issue-side">
        <span>${issue.comments} commentaire${issue.comments === 1 ? '' : 's'}</span>
        ${issue.assignee ? `<span title="Assigné à ${issue.assignee}"><img class="avatar" src="${issue.avatar}" alt="${issue.assignee}"></span>` : '<span aria-label="Non assigné">—</span>'}
      </div>
    </article>
  `).join('');
  emptyState.hidden = visible.length > 0;
}

filterButtons.forEach((button) => button.addEventListener('click', () => {
  currentFilter = button.dataset.filter;
  filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
  render();
}));
searchInput.addEventListener('input', render);
sortSelect.addEventListener('change', render);
render();