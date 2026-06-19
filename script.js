const colors = {
  blue: "#4285f4",
  red: "#ea4335",
  yellow: "#fbbc05",
  green: "#34a853",
  purple: "#8b5cf6",
  text: "#f7fbff",
  muted: "#abc0d7",
  grid: "rgba(255,255,255,0.12)",
  paper: "rgba(0,0,0,0)",
};

const baseLayout = {
  paper_bgcolor: colors.paper,
  plot_bgcolor: colors.paper,
  font: { color: colors.text, family: "Inter, sans-serif" },
  margin: { l: 45, r: 20, t: 20, b: 45 },
};

const config = { responsive: true, displayModeBar: false };

const geographicUsers = [
  { country: "Uganda", code: "UGA", users: 1, lat: 1.3733, lon: 32.2903 },
  { country: "Mexico", code: "MEX", users: 1, lat: 23.6345, lon: -102.5528 },
  { country: "India", code: "IND", users: 2, lat: 20.5937, lon: 78.9629 },
  { country: "Canada", code: "CAN", users: 7, lat: 56.1304, lon: -106.3468 },
  { country: "USA", code: "USA", users: 15, lat: 37.0902, lon: -95.7129 },
];

let countryPulseTimer;

function renderCountryHeatmap() {
  const countries = geographicUsers.map((entry) => entry.country);
  const countryCodes = geographicUsers.map((entry) => entry.code);
  const userCounts = geographicUsers.map((entry) => entry.users);

  Plotly.newPlot(
    "countryHeatmap",
    [
      {
        type: "choropleth",
        locationmode: "ISO-3",
        locations: countryCodes,
        z: userCounts,
        text: countries,
        colorscale: [
          [0, "rgba(66, 133, 244, 0.22)"],
          [0.5, colors.yellow],
          [1, colors.green],
        ],
        marker: { line: { color: "rgba(255,255,255,0.65)", width: 0.8 } },
        colorbar: {
          title: { text: "Users", side: "right" },
          tickcolor: colors.muted,
          tickfont: { color: colors.muted },
        },
        hovertemplate: "%{text}<br>%{z} users<extra></extra>",
      },
      {
        type: "scattergeo",
        mode: "markers+text",
        lat: geographicUsers.map((entry) => entry.lat),
        lon: geographicUsers.map((entry) => entry.lon),
        text: geographicUsers.map((entry) => `${entry.country}: ${entry.users}`),
        textposition: ["top center", "bottom center", "top center", "top center", "bottom center"],
        marker: {
          size: userCounts.map((users) => 14 + users * 1.8),
          color: colors.red,
          opacity: 0.72,
          line: { color: colors.text, width: 2 },
        },
        hovertemplate: "%{text} users<extra></extra>",
        showlegend: false,
      },
    ],
    {
      ...baseLayout,
      margin: { l: 0, r: 0, t: 0, b: 0 },
      geo: {
        bgcolor: "rgba(0,0,0,0)",
        projection: { type: "natural earth" },
        showframe: false,
        showcoastlines: true,
        coastlinecolor: "rgba(255,255,255,0.32)",
        showcountries: true,
        countrycolor: "rgba(255,255,255,0.22)",
        showland: true,
        landcolor: "rgba(255,255,255,0.06)",
        showocean: true,
        oceancolor: "rgba(66,133,244,0.08)",
      },
    },
    config
  );

  if (countryPulseTimer) clearInterval(countryPulseTimer);

  let expanded = false;
  countryPulseTimer = setInterval(() => {
    expanded = !expanded;
    Plotly.restyle(
      "countryHeatmap",
      {
        "marker.size": [userCounts.map((users) => (expanded ? 22 + users * 2.2 : 14 + users * 1.8))],
        "marker.opacity": [expanded ? 0.38 : 0.82],
      },
      [1]
    );
  }, 900);
}


function renderCharts() {
  renderCountryHeatmap();
  Plotly.newPlot(
    "cityHeatmap",
    [
      {
        x: ["New York", "Toronto", "Mountain View", "San Jose", "Sunny Vale"],
        y: [15000, 11000, 9000, 7000, 7000],
        type: "scatter",
        mode: "lines+markers+text",
        name: "Users",
        line: { color: colors.blue, width: 4, shape: "spline" },
        marker: {
          color: [colors.green, colors.blue, colors.yellow, colors.red, colors.purple],
          size: [18, 16, 15, 14, 14],
          line: { color: colors.text, width: 2 },
        },
        text: ["15.0K", "11.0K", "9.0K", "7.0K", "7.0K"],
        textposition: "top center",
        hovertemplate: "%{x}<br>%{y:,} users<extra></extra>",
      },
    ],
    {
      ...baseLayout,
      margin: { l: 70, r: 30, t: 25, b: 90 },
      xaxis: { tickfont: { size: 13 }, tickangle: -20, automargin: true },
      yaxis: { title: "Users", gridcolor: colors.grid, rangemode: "tozero" },
    },
    config
  );

  Plotly.newPlot(
    "countryGauge",
    [
      {
        type: "indicator",
        mode: "gauge+number+delta",
        value: 57.7,
        number: { suffix: "%" },
        delta: { reference: 57.6926, valueformat: ".4f", suffix: "%" },
        title: { text: "United States user share" },
        gauge: {
          axis: { range: [0, 100], tickcolor: colors.muted },
          bar: { color: colors.blue },
          bgcolor: "rgba(255,255,255,0.06)",
          bordercolor: "rgba(255,255,255,0.18)",
          steps: [
            { range: [0, 25], color: "rgba(234,67,53,0.25)" },
            { range: [25, 50], color: "rgba(251,188,5,0.25)" },
            { range: [50, 100], color: "rgba(52,168,83,0.25)" },
          ],
        },
      },
    ],
    { ...baseLayout, margin: { l: 25, r: 25, t: 35, b: 10 } },
    config
  );

  Plotly.newPlot(
    "acquisitionSunburst",
    [
      {
        type: "sunburst",
        labels: ["All users", "Direct", "Paid Ads", "Organic", "Referrals", "Cross-network", "Google", "Affiliate sites", "Partner networks"],
        parents: ["", "All users", "All users", "All users", "All users", "All users", "Organic", "Referrals", "Cross-network"],
        values: [100, 34, 27, 16, 12, 11, 16, 12, 11],
        branchvalues: "total",
        marker: { colors: ["#1b2a44", colors.blue, colors.red, colors.green, colors.yellow, colors.purple, "#7bdc9a", "#ffd966", "#b79cff"] },
        hovertemplate: "%{label}<br>%{value}% share<extra></extra>",
      },
    ],
    { ...baseLayout, margin: { l: 0, r: 0, t: 10, b: 10 } },
    config
  );

 Plotly.newPlot(
  "deviceHeatmap",
  [
    {
      z: [
        [92, 80, 62, 12],
        [88, 70, 75, 10],
        [55, 74, 45, 6],
      ],
      x: ["Mobile Android", "Desktop", "Tablet", "Smart TV"],
      y: ["New users", "Engagement<br>sessions", "Avg. engagement"],
      type: "heatmap",
      colorscale: [[0, "#1e1b4b"], [0.5, colors.purple], [1, colors.yellow]],
      hovertemplate: "%{y}<br>%{x}: %{z}<extra></extra>",
    },
  ],
  {
    ...baseLayout,
    margin: { l: 150, r: 20, t: 15, b: 80 },
    xaxis: { automargin: true, tickangle: -20 },
    yaxis: { automargin: true, tickfont: { size: 12 } },
  },
  config
);

  Plotly.newPlot(
    "engagementBox",
    [
      { y: [42, 48, 55, 61, 69, 74, 82], type: "box", name: "Mobile", marker: { color: colors.green } },
      { y: [58, 68, 72, 80, 92, 105, 118], type: "box", name: "Desktop", marker: { color: colors.blue } },
      { y: [24, 32, 38, 44, 51, 55, 60], type: "box", name: "Tablet", marker: { color: colors.yellow } },
      { y: [8, 12, 16, 20, 22, 25, 31], type: "box", name: "Smart TV", marker: { color: colors.red } },
    ],
    { ...baseLayout, yaxis: { title: "Engagement seconds", gridcolor: colors.grid }, showlegend: false },
    config
  );

  Plotly.newPlot(
    "productFunnel",
    [
      { x: ["Backpack", "Birthday Mug", "Tee", "Hoodie", "Bike"], y: [21000, 5894, 7600, 6100, 900], name: "Views", type: "bar", marker: { color: colors.blue } },
      { x: ["Backpack", "Birthday Mug", "Tee", "Hoodie", "Bike"], y: [3200, 980, 1300, 1160, 90], name: "Add to cart", type: "bar", marker: { color: colors.purple } },
      { x: ["Backpack", "Birthday Mug", "Tee", "Hoodie", "Bike"], y: [620, 1152, 1035, 895, 35], name: "Purchases", type: "bar", marker: { color: colors.green } },
    ],
    { ...baseLayout, barmode: "group", yaxis: { title: "Activity count", gridcolor: colors.grid }, legend: { orientation: "h" } },
    config
  );

  Plotly.newPlot(
    "activityTrend",
    [
      { x: ["Jan 1", "Jan 8", "Jan 15", "Jan 22", "Jan 31"], y: [4200, 3800, 3200, 2600, 2100], mode: "lines+markers", name: "30 days", line: { color: colors.blue, width: 4 } },
      { x: ["Jan 1", "Jan 8", "Jan 15", "Jan 22", "Jan 31"], y: [1500, 1360, 1100, 860, 640], mode: "lines+markers", name: "7 days", line: { color: colors.yellow, width: 4 } },
      { x: ["Jan 1", "Jan 8", "Jan 15", "Jan 22", "Jan 31"], y: [520, 430, 350, 255, 180], mode: "lines+markers", name: "1 day", line: { color: colors.red, width: 4 } },
    ],
    { ...baseLayout, yaxis: { title: "Active users", gridcolor: colors.grid }, legend: { orientation: "h" } },
    config
  );
}

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function bootDashboard() {
  revealOnScroll();

  let attempts = 0;

  const waitForPlotly = setInterval(() => {
    attempts++;

    if (window.Plotly) {
      clearInterval(waitForPlotly);
      renderCharts();
      return;
    }

    if (attempts > 30) {
      clearInterval(waitForPlotly);
      console.error("Plotly did not load. Charts could not render.");
    }
  }, 100);
}

window.addEventListener("DOMContentLoaded", bootDashboard);
