const getRandomNum = (min, max, roundTo = 0) => {
  const num = Math.random() * max + min;
  return num.toFixed(roundTo);
};

function getRandomCrater() {
  const craters = [
      "Albategnius", "Aristarchus", "Aristoteles", "Bailly", "Clavius",
      "Copernicus", "Fra Mauro", "Humboldt", "Janssen", "Langrenus",
      "Longomontanus", "Maginus", "Metius", "Moretus", "Petavius",
      "Picard", "Piccolomini", "Pitatus", "Plinius", "Rheita",
      "Russell", "Schickard", "Seleucus", "Stadius", "Stöfler",
      "Thebit", "Theophilus", "Tycho", "Vendelinus", "Wargentin"
  ];
  
  return craters[Math.floor(Math.random() * craters.length)];
}

function getRandomRoverType() {
  const roverTypes = [
      "Drilling", "Photography", "Water-Finding", "Geological Survey", "Resource Extraction",
      "Atmospheric Analysis", "Navigation Scout", "Communication Relay", "Solar Energy Collector",
      "Structural Builder", "Sample Return", "Seismic Activity Monitor", "Thermal Imaging",
      "Magnetometer", "Radiation Detector", "Regolith Transport", "Ice Core Driller",
      "Lunar Farming", "Autonomous Mapping", "Dust Storm Tracker"
  ];
  
  return roverTypes[Math.floor(Math.random() * roverTypes.length)];
}

function getRoverStatus() {
  const statuses = [
      "Idle", "Charging", "Deployed", "In Transit", "Analyzing Samples",
      "Transmitting Data", "Awaiting Commands", "Docked", "Under Maintenance",
      "Repair Shop", "Low Power", "Calibrating Instruments", "Navigating Terrain",
      "Drilling", "Collecting Samples", "Mapping Surface", "Avoiding Obstacle",
      "Rebooting Systems", "Hibernating", "Emergency Shutdown"
  ];
  
  return statuses[Math.floor(Math.random() * statuses.length)];
}

const checkAll = 'checkAll';

const headers = [
  { header: '', field: checkAll },
  { header: 'Rover type', field: 'roverType' },
  { header: 'ID', field: 'originalTag' },
  { header: 'Battery', field: 'battery' },
  { header: 'Location', field: 'location' },

  { header: 'Status', field: 'roverStatus' },
  { header: 'Latest Status Update', field: 'obsTime' },
  // { header: 'Az/Rt asc', field: 'azRtAsc' },
  // { header: 'El/Dec', field: 'elDec' },
  // { header: 'Range', field: 'range' },
  // { header: 'Range rate', field: 'rangeRate' },
];

const rows = Array.from({ length: 8 }, () => ({
  id: getRandomNum(19999999, 9999999),
  roverType: getRandomRoverType(),
  originalTag: '0000' + getRandomNum(11111, 99999),
  battery: getRandomNum(1, 101) + '%',
  location: getRandomCrater(),
  roverStatus: getRoverStatus(),
  obsTime: '2020 158 01:23:45:678',
  // azRtAsc: getRandomNum(120, 150, 4),
  // elDec: getRandomNum(1000, 3500, 3),
  // range: getRandomNum(1500, 7500, 3),
  // rangeRate: getRandomNum(-10, 10, 5),
}));

document.querySelector('#app').innerHTML = `
  <section>
    <table>
      <thead>
        <tr>
          ${headers
            .map(({ field, header }) => {
              const isCheckAll = field === checkAll;
              if (isCheckAll) {
                return `
                  <th>
                    <rux-checkbox id=${field}></rux-checkbox>
                  </th>
                `;
              }
              return `<th>${header}</th>`;
            })
            .join('')}
        </tr>
      </thead>
      <tbody>
        ${rows
          .map((row) => {
            return `
              <tr id="${row.id}">
                ${Object.entries(row)
                  .map(([key, value]) => {
                    const isId = key === 'id';
                    if (isId) {
                      return `
                        <td>
                          <rux-checkbox></rux-checkbox>
                        </td>
                      `;
                    }
                    return `<td>${value}</td>`;
                  })
                  .join('')}
              </tr>
            `;
          })
          .join('')}
      </tbody>
    </table>
  </section>
`;

const checkboxs = document.querySelectorAll('rux-checkbox');

checkboxs.forEach((checkbox) => {
  checkbox.addEventListener('ruxchange', (e) => {
    const isChecked = e.target.checked;

    if (e.target.id === checkAll) {
      checkboxs.forEach((checkbox) => {
        checkbox.setAttribute('checked', isChecked);
        const rowId = checkbox.parentElement.parentElement.id;
        const rowEle = document.getElementById(rowId);
        if (!rowEle) return;
        rowEle.setAttribute('selected', isChecked);
      });
      return;
    }

    const rowId = checkbox.parentElement.parentElement.id;
    const rowEle = document.getElementById(rowId);
    rowEle.setAttribute('selected', isChecked);

    const checkeds = [];
    checkboxs.forEach((checkbox) => {
      if (checkbox.id === checkAll) return;
      checkeds.push(checkbox.checked);
    });

    const areAllRowsChecked = checkeds.every((check) => check);
    const checkAllEle = document.getElementById(checkAll);
    checkAllEle.setAttribute('checked', areAllRowsChecked);
  });
});

/*

Craters of the moon

Albategnius (131 km)
Aristarchus (40 km)
Aristoteles (88 km)
Bailly (301 km)
Clavius (231 km)
Copernicus (96 km)
Fra Mauro (97 km)
Humboldt (199 km)
Janssen (201 km)
Langrenus (132 km)
Longomontanus (146 km)
Maginus (156 km)
Metius (84 km)
Moretus (114 km)
Petavius (184 km)
Picard (22 km)
Piccolomini (88 km)
Pitatus (101 km)
Plinius (41 km)
Rheita (71 km)
Russell (103 km)
Schickard (212 km)
Seleucus (45 km)
Stadius (68 km)
Stöfler (130 km)
Thebit (55 km)
Theophilus (99 km)
Tycho (85 km)
Vendelinus (141 km)
Wargentin (85 km)

*/