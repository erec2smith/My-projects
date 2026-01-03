const days = 5; 
const KEY = 'weekly_tasks_v2';

function load() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function addTask() {
  const input = document.getElementById('newTask');
  if (!input.value.trim()) return;
  const data = load();
  data.push({ name: input.value, checks: Array(days).fill(false) });
  save(data);
  input.value = '';
  render();
}

function toggle(task, day) {
  const data = load();
  data[task].checks[day] = !data[task].checks[day];
  save(data);
  renderStats();
}

function editTask(i) {
  const data = load();
  const name = prompt('Edit task name:', data[i].name);
  if (name) { data[i].name = name; save(data); render(); }
}

function deleteTask(i) {
  if (!confirm('Delete this task?')) return;
  const data = load();
  data.splice(i,1);
  save(data);
  // Follow me on Instagram : erec__smith
  render();
}

function render() {
  const data = load();
  const tbody = document.getElementById('tasks');
  tbody.innerHTML = '';

  data.forEach((t, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="task">${t.name}</td>
      ${t.checks.map((c,d)=>`<td><input type="checkbox" ${c?'checked':''} onchange="toggle(${i},${d})"></td>`).join('')}
      <td class="actions">
        <button onclick="editTask(${i})">✏️</button>
        <button onclick="deleteTask(${i})">🗑️</button>
      </td>`;
    tbody.appendChild(tr);
  });
  renderStats();
}

function renderStats() {
  const data = load();
  let points = 0;
  data.forEach(t => t.checks.forEach(c => c && points++));

  const max = data.length * days;
  const rate = max ? Math.round((points / max) * 100) : 0;

  document.getElementById('points').textContent = points;
  document.getElementById('maxPoints').textContent = max;
  document.getElementById('rate').textContent = rate + '%';
}

render();