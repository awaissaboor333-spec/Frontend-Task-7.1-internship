
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);

const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', current);
  localStorage.setItem('theme', current);
});


const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

const onResize = () => {
  if (window.innerWidth <= 760) {
    sidebar.classList.remove('sidebar--collapsed');
  }
};
window.addEventListener('resize', onResize);
onResize();

collapseBtn?.addEventListener('click', () => {

  if (window.innerWidth > 760) {
    sidebar.classList.toggle('sidebar--collapsed');
  } else {
    
    sidebar.classList.toggle('sidebar--open');
  }
});
mobileMenuBtn?.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar--open');
});


document.addEventListener('click', (e) => {
  if (window.innerWidth > 760) return;
  const insideSidebar = sidebar.contains(e.target);
  const fromToggle = mobileMenuBtn.contains(e.target) || collapseBtn.contains(e.target);
  if (!insideSidebar && !fromToggle) sidebar.classList.remove('sidebar--open');
});


const brand = getComputedStyle(document.documentElement).getPropertyValue('--brand').trim() || '#6366f1';
const brand2 = getComputedStyle(document.documentElement).getPropertyValue('--brand-2').trim() || '#22d3ee';
let textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#e5e7eb';
let lineColor = getComputedStyle(document.documentElement).getPropertyValue('--line').trim() || 'rgba(255,255,255,.08)';

const ctx = document.getElementById('overviewChart');
if (ctx) {
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [
        {
          label: 'Users',
          data: [1200, 1350, 1280, 1500, 1700, 1680, 1820],
          borderColor: brand,
          backgroundColor: brand + '33',
          tension: 0.35,
          fill: true
        },
        {
          label: 'Revenue ($)',
          data: [9.2, 10.1, 9.5, 11.3, 12.8, 12.2, 13.4],
          borderColor: brand2,
          backgroundColor: brand2 + '33',
          tension: 0.35,
          yAxisID: 'y1',
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { color: lineColor },
          ticks: { color: textColor }
        },
        y: {
          grid: { color: lineColor },
          ticks: { color: textColor }
        },
        y1: {
          position: 'right',
          grid: { drawOnChartArea: false, color: lineColor },
          ticks: { color: textColor }
        }
      },
      plugins: {
        legend: { labels: { color: textColor } },
        tooltip: { intersect: false, mode: 'index' }
      }
    }
  });


  const observer = new MutationObserver(() => {
    textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();
    lineColor = getComputedStyle(document.documentElement).getPropertyValue('--line').trim();

    chart.options.scales.x.ticks.color = textColor;
    chart.options.scales.y.ticks.color = textColor;
    chart.options.scales.y1.ticks.color = textColor;
    chart.options.scales.x.grid.color = lineColor;
    chart.options.scales.y.grid.color = lineColor;
    chart.options.scales.y1.grid.color = lineColor;
    chart.options.plugins.legend.labels.color = textColor;

    chart.update();
  });

  observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
}


const searchInput = document.getElementById('tableSearch');
const tableRows = document.querySelectorAll('.data-table tbody tr');

searchInput?.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  tableRows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
});
