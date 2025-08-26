import type { Part, Lab } from "./types";

function getRandomStatus(): "Repaired" | "Under Testing" | "Defective" {
  const statuses: ("Repaired" | "Under Testing" | "Defective")[] = ["Repaired", "Under Testing", "Defective"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomDate(): Date {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export const labs: Lab[] = [
  { id: "turret-elec", name: "Turret Elec" },
  { id: "hull-lab-1", name: "Hull Lab-I" },
  { id: "hull-lab-2", name: "Hull Lab-II" },
  { id: "gcs-lab", name: "GCS Lab" },
  { id: "elec-harness-lab", name: "Elec Harness Lab" },
];

const turretElecParts: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime' | 'labId'>[] = [
    { name: "Temp cont Box"},
    { name: "KS2 Steering cont Box"},
    { name: "Fan cont Relay JZ103"},
    { name: "Smoke screen cont Box T-25"},
    { name: "AAMG cont Box"},
    { name: "Connecting Box with support"},
    { name: "Gunner Dist Box"},
    { name: "Commd Dist Box"},
    { name: "Electromagnetic w/ handle"},
    { name: "Electromagnetic cont Assy"},
    { name: "Dust removing forced blower fan"},
    { name: "EM Traversing Motor"},
];

const hullLab1Parts: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime' | 'labId'>[] = [
    { name: "Voltage regulator"},
    { name: "Small fan"},
    { name: "Rectifier"},
    { name: "Oil pump motor"},
    { name: "Smoke motor"},
    { name: "Bilge pump motor"},
];

const hullLab2Parts: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime' | 'labId'>[] = [
    { name: "Emergency lamp"},
    { name: "XZN Travel Sw"},
    { name: "Steering indicator"},
    { name: "Head lamp"},
    { name: "Dvr Hatch locking device"},
    { name: "Azmith lamp"},
    { name: "Illu Lamp with Sw"},
    { name: "Number lamp"},
    { name: "Digits"},
    { name: "Leveller Illu Sw"},
    { name: "Front top light"},
    { name: "Rear top light"},
    { name: "Dvr distribution board"},
    { name: "Thermal smoke screen control box"},
    { name: "Marker lamp red"},
    { name: "Rotary base junction"},
    { name: "Marker lamp green"},
    { name: "Electric brush box"},
    { name: "Bracket body"},
    { name: "Fire Ext cont box"},
    { name: "Emergency Sw"},
    { name: "Optical detector"},
];

const gcsLabParts: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime' | 'labId'>[] = [
    { name: "SBL 53"},
    { name: "AL motor"},
    { name: "Loading cont box"},
    { name: "Driving converter"},
    { name: "Angle limiter"},
    { name: "EM clutch"},
    { name: "Turret motor"},
    { name: "Mag solenoid"},
    { name: "Voltage booster"},
    { name: "Hoist solenoid"},
];

const elecHarnessLabParts: Omit<Part, 'id' | 'status' | 'repairedAt' | 'repairTime' | 'testingTime' | 'labId'>[] = [
    { name: "Rotary cable"},
    { name: "Shrapnel cable"},
    { name: "Bulkhead plug cable"},
    { name: "DDB cable"},
    { name: "Fire Ext small cable"},
    { name: "Indicator with cable"},
    { name: "Hebon cylindrical cable"},
];

const allPartsData = [
  ...turretElecParts.map((p, i) => ({ ...p, id: `TE-${(i + 1).toString().padStart(3, '0')}`, labId: 'turret-elec' })),
  ...hullLab1Parts.map((p, i) => ({ ...p, id: `HL1-${(i + 1).toString().padStart(3, '0')}`, labId: 'hull-lab-1' })),
  ...hullLab2Parts.map((p, i) => ({ ...p, id: `HL2-${(i + 1).toString().padStart(3, '0')}`, labId: 'hull-lab-2' })),
  ...gcsLabParts.map((p, i) => ({ ...p, id: `GCS-${(i + 1).toString().padStart(3, '0')}`, labId: 'gcs-lab' })),
  ...elecHarnessLabParts.map((p, i) => ({ ...p, id: `EHL-${(i + 1).toString().padStart(3, '0')}`, labId: 'elec-harness-lab' })),
];

export const parts: Part[] = allPartsData.map((part) => ({
  ...part,
  status: getRandomStatus(),
  repairTime: Math.floor(Math.random() * 100) + 1,
  testingTime: Math.floor(Math.random() * 24) + 1,
  repairedAt: getRandomDate(),
}));
