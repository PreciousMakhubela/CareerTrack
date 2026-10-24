const dialog = document.querySelector('#details-dialog');
const title = document.querySelector('#dialog-title');
const message = document.querySelector('#dialog-message');
const input = document.querySelector('#detail-input');

function openDetails(heading, description, placeholder) {
  title.textContent = heading;
  message.textContent = description;
  input.placeholder = placeholder;
  input.value = '';
  dialog.showModal();
}
document.querySelector('#edit-profile').addEventListener('click', () =>
  openDetails('Complete your profile', 'This prototype does not save to MySQL yet. We will connect it to your backend next.', 'Add a short professional summary'));
document.querySelector('#edit-skills').addEventListener('click', () =>
  openDetails('Add technical skills', 'Enter skills separated by commas. Database saving will be added in the next step.', 'e.g. JavaScript, MySQL, Node.js'));
document.querySelector('#edit-education').addEventListener('click', () =>
  openDetails('Education details', 'Add your qualification and institution details.', 'Qualification and institution'));
document.querySelector('#add-project').addEventListener('click', () =>
  openDetails('Add a project', 'Describe a project you have worked on.', 'Project name and short description'));
document.querySelector('#add-application').addEventListener('click', () =>
  openDetails('Track an application', 'Record the role and company so you can track it. Database saving will come later.', 'Role — Company — Status'));

document.querySelector('#dialog-save').addEventListener('click', (event) => {
  if (input.value.trim()) {
    const saved = JSON.parse(sessionStorage.getItem('careerTrackNotes') || '[]');
    saved.push({ title: title.textContent, value: input.value.trim() });
    sessionStorage.setItem('careerTrackNotes', JSON.stringify(saved));
  }
});

document.querySelectorAll('.save-button').forEach((button) => {
  button.addEventListener('click', () => {
    const saved = button.dataset.saved === 'true';
    button.dataset.saved = String(!saved);
    button.textContent = saved ? 'Save' : 'Saved ✓';
    button.classList.toggle('button-primary', !saved);
  });
});

const search = document.querySelector('#search');
const filter = document.querySelector('#type-filter');
function filterOpportunities() {
  const query = search.value.toLowerCase().trim();
  document.querySelectorAll('.opportunity').forEach((card) => {
    const matchesText = card.textContent.toLowerCase().includes(query);
    const matchesType = filter.value === 'all' || card.dataset.type === filter.value;
    card.hidden = !(matchesText && matchesType);
  });
}
search.addEventListener('input', filterOpportunities);
filter.addEventListener('change', filterOpportunities);
