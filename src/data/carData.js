/**
 * Car Performance Showcase Data
 * Defines information, statistics, and interactive process steps for each lap/view.
 */

export const processStepsData = [
  {
    id: 1,
    title: "Registration",
    description: "Fill form for submission",
    left: "0%",
  },
  {
    id: 2,
    title: "Consultation",
    description: "Planning and pricing",
    left: "33%",
  },
  {
    id: 3,
    title: "Artist assign",
    description: "according to task",
    left: "66%",
  },
  {
    id: 4,
    title: "Vehicle Delivery",
    description: "Final step of process",
    left: "100%",
  },
];

const carData = [
  {
    id: 1,
    type: "car",
    image: "/car.png",
    stats: null,
    tooltip: null,
  },
  {
    id: 2,
    type: "car",
    image: "/car2.png",
    stats: {
      speed: "352",
      power: "620",
      torque: "780",
      time: "3.2 Sec",
      distance: "2,450 KM",
      range: "520 KM",
    },
    tooltip: null,
  },
  {
    id: 3,
    type: "process",
    image: "/car3.png",
    processSteps: processStepsData,
    stats: null,
    tooltip: null,
  },
];

export default carData;