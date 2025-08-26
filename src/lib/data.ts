import type { Part, Lab } from "./types";

export const labs: Lab[] = [
  { id: "hull-lab", name: "Hull Lab" },
  { id: "electrical-lab", name: "Electrical Lab" },
  { id: "turret-lab", name: "Turret Lab" },
  { id: "engine-lab", name: "Engine Lab" },
  { id: "transmission-lab", name: "Transmission Lab" },
];

export const parts: Part[] = [
  { id: "TU85-H-001", name: "Front Glacis Plate", labId: "hull-lab", status: "Functional", repairTime: 20, testingTime: 5, repairedAt: new Date("2023-10-15") },
  { id: "TU85-T-002", name: "Main Gun Breech", labId: "turret-lab", status: "Under Testing", repairTime: 35, testingTime: 10, repairedAt: new Date("2023-11-01") },
  { id: "TU85-E-003", name: "V-92S2F Engine", labId: "engine-lab", status: "Defective", repairTime: 120, testingTime: 24, repairedAt: new Date("2023-11-05") },
  { id: "TU85-EL-004", name: "Gunner's Primary Sight", labId: "electrical-lab", status: "Functional", repairTime: 15, testingTime: 8, repairedAt: new Date("2023-11-10") },
  { id: "TU85-TR-005", name: "Planetary Transmission", labId: "transmission-lab", status: "Functional", repairTime: 80, testingTime: 15, repairedAt: new Date("2023-10-22") },
  { id: "TU85-H-006", name: "Side Skirt Panel", labId: "hull-lab", status: "Under Testing", repairTime: 10, testingTime: 3, repairedAt: new Date("2023-11-12") },
  { id: "TU85-T-007", name: "Turret Ring Bearing", labId: "turret-lab", status: "Functional", repairTime: 50, testingTime: 12, repairedAt: new Date("2023-09-30") },
  { id: "TU85-E-008", name: "Fuel Injector System", labId: "engine-lab", status: "Defective", repairTime: 30, testingTime: 7, repairedAt: new Date("2023-11-14") },
  { id: "TU85-EL-009", name: "Commander's Control Panel", labId: "electrical-lab", status: "Under Testing", repairTime: 25, testingTime: 6, repairedAt: new Date("2023-11-18") },
  { id: "TU85-TR-010", name: "Brake Band Assembly", labId: "transmission-lab", status: "Functional", repairTime: 40, testingTime: 9, repairedAt: new Date("2023-11-20") },
  { id: "TU85-H-011", name: "Driver's Hatch", labId: "hull-lab", status: "Functional", repairTime: 8, testingTime: 2, repairedAt: new Date("2023-11-21") },
  { id: "TU85-T-012", name: "Ammunition Autoloader", labId: "turret-lab", status: "Defective", repairTime: 60, testingTime: 20, repairedAt: new Date("2023-11-25") },
];
