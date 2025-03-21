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
  originalTag: '00' + getRandomNum(111, 999),
  battery: getRandomNum(1, 101) + '%',
  location: getRandomCrater(),
  roverStatus: getRoverStatus(),
  obsTime: '06:09',
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


// Create modal and overlay elements
const modalOverlay = document.createElement('div');
modalOverlay.classList.add('modal-overlay');
document.body.appendChild(modalOverlay);

const modal = document.getElementById("roverModal");
const closeModal = document.querySelector(".close");
const tableRows = document.querySelectorAll('tr');

tableRows.forEach((tableRow) => {
  tableRow.addEventListener('click', (e) => {
    console.log('row clicked=')
    console.log(e.target.parentElement)

    const cells = e.target.parentElement.innerText.split('\t')

    // Open modal displaying the innerText of e.target.parentElement
     // Extract the data from the row
     document.getElementById("modalRoverType").innerText = cells[1];
     document.getElementById("modalRoverID").innerText = cells[2];
     document.getElementById("modalBattery").innerText = cells[3];
     document.getElementById("modalLocation").innerText = cells[4];
     document.getElementById("modalStatus").innerText = cells[5];
     document.getElementById("modalUpdate").innerText = cells[6];
     document.getElementById("moon-location").src = moonCraterLocations[cells[4]];
 
     // Show the modal
     modal.style.display = "block";
     modalOverlay.style.display = 'block';
  });
});

// Close modal when clicking the close button
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  modalOverlay.style.display = 'none';
});

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

const moonCraterLocations = {
  "Albategnius": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Location_of_albategnius_crater.jpg/120px-Location_of_albategnius_crater.jpg",
  "Aristarchus": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Location_of_lunar_aristarchus_crater.jpg/120px-Location_of_lunar_aristarchus_crater.jpg",
  "Aristoteles": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Location_of_lunar_aristoteles_crater.jpg/120px-Location_of_lunar_aristoteles_crater.jpg",
  "Bailly": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Location_of_lunar_bailly_crater.jpg/120px-Location_of_lunar_bailly_crater.jpg",
  "Clavius": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Location_of_lunar_crater_clavius.jpg/120px-Location_of_lunar_crater_clavius.jpg",
  "Copernicus": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Location_of_lunar_crater_copernicus.jpg/120px-Location_of_lunar_crater_copernicus.jpg",
  "Fra Mauro": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Location_of_lunar_crater_fra_mauro.jpg/120px-Location_of_lunar_crater_fra_mauro.jpg",
  "Humboldt": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Location_of_lunar_crater_humboldt.jpg/120px-Location_of_lunar_crater_humboldt.jpg",
  "Janssen": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Location_of_lunar_crater_janssen.jpg/120px-Location_of_lunar_crater_janssen.jpg",
  "Langrenus": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Location_of_lunar_crater_langrenus.jpg/120px-Location_of_lunar_crater_langrenus.jpg",
  "Longomontanus": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Location_of_lunar_crater_longomontanus.jpg/120px-Location_of_lunar_crater_longomontanus.jpg",
  "Maginus": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Location_of_lunar_crater_maginus.jpg/120px-Location_of_lunar_crater_maginus.jpg",
  "Metius": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Location_of_lunar_crater_metius.jpg/120px-Location_of_lunar_crater_metius.jpg",
  "Moretus": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Location_of_lunar_crater_moretus.jpg/120px-Location_of_lunar_crater_moretus.jpg",
  "Petavius": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Location_of_lunar_crater_petavius.jpg/120px-Location_of_lunar_crater_petavius.jpg",
  "Picard": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Location_of_lunar_crater_picard.jpg/120px-Location_of_lunar_crater_picard.jpg",
  "Piccolomini": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Location_of_lunar_crater_piccolomini.jpg/120px-Location_of_lunar_crater_piccolomini.jpg",
  "Pitatus": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Location_of_lunar_crater_pitatus.jpg/120px-Location_of_lunar_crater_pitatus.jpg",
  "Plinius": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Location_of_lunar_crater_plinius.jpg/120px-Location_of_lunar_crater_plinius.jpg",
  "Rheita": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Location_of_lunar_crater_rheita.jpg/120px-Location_of_lunar_crater_rheita.jpg",
  "Russell": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Location_of_lunar_crater_russell.jpg/120px-Location_of_lunar_crater_russell.jpg",
  "Schickard": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Location_of_lunar_crater_schickard.jpg/120px-Location_of_lunar_crater_schickard.jpg",
  "Seleucus": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Location_of_lunar_crater_seleucus.jpg/120px-Location_of_lunar_crater_seleucus.jpg",
  "Stadius": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Location_of_lunar_crater_stadius.jpg/120px-Location_of_lunar_crater_stadius.jpg",
  "Stöfler": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Location_of_lunar_crater_stofler.jpg/120px-Location_of_lunar_crater_stofler.jpg",
  "Thebit": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Location_of_lunar_crater_thebit.jpg/120px-Location_of_lunar_crater_thebit.jpg",
  "Theophilus": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Location_of_lunar_crater_theophilus.jpg/120px-Location_of_lunar_crater_theophilus.jpg",
  "Tycho": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Lage_des_Mondkraters_Tycho.jpg/120px-Lage_des_Mondkraters_Tycho.jpg",
  "Vendelinus": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Location_of_lunar_crater_vendelinus.jpg/120px-Location_of_lunar_crater_vendelinus.jpg",
  "Wargentin": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Location_of_lunar_crater_wargentin.jpg/120px-Location_of_lunar_crater_wargentin.jpg",
};


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