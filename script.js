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

function renderCharts() {
  Plotly.newPlot(
    "cityHeatmap",
    [
      {
        z: [[15000, 11000, 8000]],
        x: ["New York", "Toronto", "Mountain View"],
        y: ["Users"],
        type: "heatmap",
        colorscale: [
          [0, "#12345d"],
          [0.5, colors.blue],
          [1, colors.green],
        ],
        text: [["15K · 30.61%", "11K · 22.45%", "8K · 18.37%"]],
        texttemplate: "%{text}",
        hovertemplate: "%{x}<br>%{z:,} users<extra></extra>",
        showscale: false,
      },
    ],
    { ...baseLayout, xaxis: { tickfont: { size: 13 } }, yaxis: { showgrid: false } },
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
    "primaryChannelRowChart",
    [
      {
        x: [140000, 80000, 70000, 10000, 8000, 7000, 300],
        y: ["Direct", "Organic Search", "Cross-Network", "Referral", "Email", "Organic Social", "Paid Search"],
        type: "bar",
        orientation: "h",
        name: "Users",
        marker: { color: colors.blue },
        text: ["140K", "80K", "70K", "10K", "8K", "7K", "300"],
        textposition: "auto",
        hovertemplate: "%{y}<br>%{x:,} users<extra></extra>",
      },
    ],
    {
      ...baseLayout,
      margin: { l: 150, r: 25, t: 15, b: 45 },
      xaxis: { title: "Users", gridcolor: colors.grid },
      yaxis: { autorange: "reversed", automargin: true },
    },
    config
  );

  Plotly.newPlot(
    "operatingSystemRowChart",
    [
      {
        x: [137000, 68000, 63000, 59000, 16000, 8000, 18],
        y: ["Android", "Macintosh", "Windows", "iOS", "Chrome OS", "Linux", "Fuchsia"],
        type: "bar",
        orientation: "h",
        name: "Users",
        marker: { color: colors.green },
        text: ["137K", "68K", "63K", "59K", "16K", "8K", "18"],
        textposition: "auto",
        hovertemplate: "%{y}<br>%{x:,} users<extra></extra>",
      },
    ],
    {
      ...baseLayout,
      margin: { l: 120, r: 25, t: 15, b: 45 },
      xaxis: { title: "Users", gridcolor: colors.grid },
      yaxis: { autorange: "reversed", automargin: true },
    },
    config
  );

  Plotly.newPlot(
    "deviceNewUsersRowChart",
    [
      {
        x: [176075, 130604, 11202, 41],
        y: ["Mobile", "Desktop", "Tablet", "SmartTV"],
        type: "bar",
        orientation: "h",
        name: "New users",
        marker: { color: colors.purple },
        text: ["176,075", "130,604", "11,202", "41"],
        textposition: "auto",
        hovertemplate: "%{y}<br>%{x:,} new users<extra></extra>",
      },
    ],
    {
      ...baseLayout,
      margin: { l: 90, r: 25, t: 15, b: 45 },
      xaxis: { title: "New users", gridcolor: colors.grid },
      yaxis: { autorange: "reversed", automargin: true },
    },
    config
  );

  Plotly.newPlot(
    "deviceSessionsEngagementRowChart",
    [
      {
        x: [1.0, 1.5, 1.0, 0.8],
        y: ["Mobile", "Desktop", "Tablet", "SmartTV"],
        type: "bar",
        orientation: "h",
        name: "Sessions",
        marker: { color: colors.blue },
        hovertemplate: "%{y}<br>Sessions: %{x}<extra></extra>",
      },
      {
        x: [1, 3, 0, 1],
        y: ["Mobile", "Desktop", "Tablet", "SmartTV"],
        type: "bar",
        orientation: "h",
        name: "Avg. engagement",
        marker: { color: colors.yellow },
        hovertemplate: "%{y}<br>Avg. engagement: %{x}<extra></extra>",
      },
    ],
    {
      ...baseLayout,
      barmode: "group",
      margin: { l: 90, r: 25, t: 15, b: 45 },
      xaxis: { title: "Metric value", gridcolor: colors.grid },
      yaxis: { autorange: "reversed", automargin: true },
      legend: { orientation: "h" },
    },
    config
  );

  Plotly.newPlot(
    "itemRevenuePurchaseRowChart",
    [
      {
        x: [33125, 24721.20, 24420, 17332.80, 15477, 13468],
        y: [
          "Super G Timbuk2 Recycled Backpack",
          "G25gle Birthday Tee",
          "Google 25th Birthday Hoodie",
          "Google Black Eco Zip Hoodie",
          "Google Campus Bike",
          "G25gle Birthday Mug",
        ],
        type: "bar",
        orientation: "h",
        name: "Revenue ($)",
        marker: { color: colors.green },
        hovertemplate: "%{y}<br>Revenue: $%{x:,.2f}<extra></extra>",
      },
      {
        x: [323, 1137, 402, 308, 339, 1152],
        y: [
          "Super G Timbuk2 Recycled Backpack",
          "G25gle Birthday Tee",
          "Google 25th Birthday Hoodie",
          "Google Black Eco Zip Hoodie",
          "Google Campus Bike",
          "G25gle Birthday Mug",
        ],
        type: "bar",
        orientation: "h",
        name: "Purchases",
        marker: { color: colors.red },
        hovertemplate: "%{y}<br>Purchases: %{x:,}<extra></extra>",
      },
    ],
    {
      ...baseLayout,
      barmode: "group",
      margin: { l: 260, r: 25, t: 15, b: 45 },
      xaxis: { title: "Revenue dollars / purchase count", gridcolor: colors.grid },
      yaxis: { autorange: "reversed", automargin: true },
      legend: { orientation: "h" },
    },
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
