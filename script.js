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

  const conversionProducts = [
    "Super G Timbuk2 Recycled Backpack",
    "Google Campus Bike",
    "G25gle Birthday Tee",
    "Google 25th Birthday Hoodie",
    "Google Sensory Support Event Kiy",
    "Google Black Eco Zip Hoodie",
    "Chrome Dino Dark Mode Collectable",
  ];
  const addedToCart = [3952, 65640, 202681, 9988, 500000001003024, 1437, 1908];
  const purchased = [1152, 1137, 402, 339, 323, 308, 288];
  const conversionRates = purchased.map((count, index) => (count / addedToCart[index]) * 100);

  Plotly.newPlot(
    "interestConversionChart",
    [
      {
        y: conversionProducts,
        x: conversionRates,
        customdata: conversionProducts.map((_, index) => [addedToCart[index], purchased[index]]),
        type: "bar",
        orientation: "h",
        marker: {
          color: [colors.green, colors.red, colors.red, colors.yellow, colors.red, colors.green, colors.green],
        },
        text: conversionRates.map((rate) => (rate < 0.01 ? "<0.01%" : `${rate.toFixed(1)}%`)),
        textposition: "outside",
        hovertemplate:
          "%{y}<br>Added to cart: %{customdata[0]:,}<br>Purchased: %{customdata[1]:,}<br>Conversion: %{text}<extra></extra>",
      },
    ],
    {
      ...baseLayout,
      margin: { l: 230, r: 55, t: 15, b: 55 },
      xaxis: { title: "Purchase conversion rate", ticksuffix: "%", gridcolor: colors.grid, rangemode: "tozero" },
      yaxis: { automargin: true, autorange: "reversed", tickfont: { size: 12 } },
      showlegend: false,
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
