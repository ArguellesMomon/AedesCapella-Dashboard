export const SITIO_LIST = [
  { id: 'puting-bato', name: 'Sitio Puting Bato', risk: 'Critical', detections: 47, node: 'NODE-01' },
  { id: 'bulalo',      name: 'Sitio Bulalo',       risk: 'High',     detections: 28, node: 'NODE-02' },
  { id: 'malamig',    name: 'Sitio Malamig',      risk: 'Medium',   detections: 14, node: 'NODE-03' },
  { id: 'kanto',      name: 'Sitio Kanto',        risk: 'Low',      detections: 5,  node: null },
  { id: 'silangan',   name: 'Sitio Silangan',     risk: 'None',     detections: 0,  node: null },
  { id: 'habagatan',  name: 'Sitio Habagatan',    risk: 'High',     detections: 23, node: null },
];

export const NODES_DATA = [
  {
    id: 'NODE-01', sitio: 'Sitio Puting Bato', online: true,
    battery: 87, wifi: -62, detections: 47, fogEvents: 8,
    mistStatus: 'Armed · Fluid OK', uptime: '6d 14h 22m', batteryLow: false,
  },
  {
    id: 'NODE-02', sitio: 'Sitio Bulalo', online: true,
    battery: 34, wifi: -78, detections: 28, fogEvents: 5,
    mistStatus: 'Armed · Battery Critical', uptime: '3d 8h 11m', batteryLow: true,
  },
  {
    id: 'NODE-03', sitio: 'Sitio Malamig', online: false,
    battery: 12, wifi: null, detections: 14, fogEvents: 2,
    mistStatus: 'Offline', uptime: '—', batteryLow: false,
  },
];

export const BASE_DETECTIONS = [
  { id: 1,  minsAgo: 0.5,  nodeId: 'NODE-01', sitio: 'Sitio Puting Bato', freq: 487, confidence: 94, autoResponse: 'fogged' },
  { id: 2,  minsAgo: 2.1,  nodeId: 'NODE-02', sitio: 'Sitio Bulalo',       freq: 512, confidence: 88, autoResponse: 'cooldown' },
  { id: 3,  minsAgo: 4.7,  nodeId: 'NODE-01', sitio: 'Sitio Puting Bato', freq: 471, confidence: 97, autoResponse: 'fogged' },
  { id: 4,  minsAgo: 7.2,  nodeId: 'NODE-01', sitio: 'Sitio Puting Bato', freq: 501, confidence: 83, autoResponse: 'fogged' },
  { id: 5,  minsAgo: 9.8,  nodeId: 'NODE-02', sitio: 'Sitio Bulalo',       freq: 468, confidence: 91, autoResponse: 'fogged' },
  { id: 6,  minsAgo: 12.4, nodeId: 'NODE-01', sitio: 'Sitio Puting Bato', freq: 543, confidence: 85, autoResponse: 'fogged' },
  { id: 7,  minsAgo: 15.0, nodeId: 'NODE-02', sitio: 'Sitio Bulalo',       freq: 495, confidence: 92, autoResponse: 'fogged' },
  { id: 8,  minsAgo: 18.3, nodeId: 'NODE-01', sitio: 'Sitio Puting Bato', freq: 477, confidence: 89, autoResponse: 'fogged' },
  { id: 9,  minsAgo: 22.1, nodeId: 'NODE-01', sitio: 'Sitio Puting Bato', freq: 521, confidence: 96, autoResponse: 'fogged' },
  { id: 10, minsAgo: 28.6, nodeId: 'NODE-02', sitio: 'Sitio Bulalo',       freq: 458, confidence: 80, autoResponse: 'fogged' },
  { id: 11, minsAgo: 33.2, nodeId: 'NODE-01', sitio: 'Sitio Puting Bato', freq: 509, confidence: 93, autoResponse: 'fogged' },
  { id: 12, minsAgo: 41.7, nodeId: 'NODE-02', sitio: 'Sitio Bulalo',       freq: 482, confidence: 87, autoResponse: 'fogged' },
];

export const FOG_LOG = [
  { id: 1,  ts: '08:47:23', nodeId: 'NODE-01', sitio: 'Sitio Puting Bato', confidence: 94, status: 'Completed' },
  { id: 2,  ts: '08:31:05', nodeId: 'NODE-01', sitio: 'Sitio Puting Bato', confidence: 97, status: 'Completed' },
  { id: 3,  ts: '08:12:44', nodeId: 'NODE-02', sitio: 'Sitio Bulalo',       confidence: 91, status: 'Completed' },
  { id: 4,  ts: '07:58:17', nodeId: 'NODE-01', sitio: 'Sitio Puting Bato', confidence: 83, status: 'Completed' },
  { id: 5,  ts: '07:43:02', nodeId: 'NODE-02', sitio: 'Sitio Bulalo',       confidence: 88, status: 'Completed' },
  { id: 6,  ts: '07:29:38', nodeId: 'NODE-01', sitio: 'Sitio Puting Bato', confidence: 85, status: 'Completed' },
  { id: 7,  ts: '07:14:21', nodeId: 'NODE-01', sitio: 'Sitio Puting Bato', confidence: 92, status: 'Completed' },
  { id: 8,  ts: '06:55:44', nodeId: 'NODE-02', sitio: 'Sitio Bulalo',       confidence: 96, status: 'Completed' },
  { id: 9,  ts: '06:38:09', nodeId: 'NODE-01', sitio: 'Sitio Puting Bato', confidence: 89, status: 'Completed' },
  { id: 10, ts: '06:21:55', nodeId: 'NODE-01', sitio: 'Sitio Puting Bato', confidence: 93, status: 'Completed' },
  { id: 11, ts: '05:47:30', nodeId: 'NODE-02', sitio: 'Sitio Bulalo',       confidence: 80, status: 'Completed' },
  { id: 12, ts: '05:12:18', nodeId: 'NODE-01', sitio: 'Sitio Puting Bato', confidence: 87, status: 'Completed' },
  { id: 13, ts: '04:38:44', nodeId: 'NODE-02', sitio: 'Sitio Bulalo',       confidence: 95, status: 'Completed' },
];

export const HOURLY_FOG = [
  { hour: '20:00', fogs: 0 }, { hour: '21:00', fogs: 1 }, { hour: '22:00', fogs: 2 },
  { hour: '23:00', fogs: 3 }, { hour: '00:00', fogs: 1 }, { hour: '01:00', fogs: 0 },
  { hour: '02:00', fogs: 1 }, { hour: '03:00', fogs: 2 }, { hour: '04:00', fogs: 1 },
  { hour: '05:00', fogs: 2 }, { hour: '06:00', fogs: 3 }, { hour: '07:00', fogs: 4 },
  { hour: '08:00', fogs: 2 }, { hour: '09:00', fogs: 1 },
];

export const TREND_HOURLY = [
  { t: '00:00', v: 2 },  { t: '01:00', v: 1 },  { t: '02:00', v: 3 },
  { t: '03:00', v: 4 },  { t: '04:00', v: 2 },  { t: '05:00', v: 5 },
  { t: '06:00', v: 8 },  { t: '07:00', v: 12 }, { t: '08:00', v: 18 },
  { t: '09:00', v: 15 }, { t: '10:00', v: 22 }, { t: '11:00', v: 19 },
  { t: '12:00', v: 14 }, { t: '13:00', v: 11 }, { t: '14:00', v: 9 },
];

export const TREND_WEEKLY = [
  { t: 'Mon', v: 34 }, { t: 'Tue', v: 41 }, { t: 'Wed', v: 29 },
  { t: 'Thu', v: 52 }, { t: 'Fri', v: 67 }, { t: 'Sat', v: 88 }, { t: 'Sun', v: 74 },
];

export const TREND_MONTHLY = [
  { t: 'W1', v: 142 }, { t: 'W2', v: 198 }, { t: 'W3', v: 267 }, { t: 'W4', v: 311 },
];

export const NODE_DETECTIONS = [
  { node: 'NODE-01', count: 47 },
  { node: 'NODE-02', count: 28 },
  { node: 'NODE-03', count: 14 },
];

export const CONFIDENCE_DIST = [
  { range: '80–84%', count: 18 },
  { range: '85–89%', count: 27 },
  { range: '90–94%', count: 31 },
  { range: '95–100%', count: 21 },
];

// Sitio polygon definitions for the SVG map
export const SITIO_POLYGONS = [
  { id: 'silangan',    points: '20,20 180,20 180,140 100,155 20,110',                  label: { x: 75,  y: 75  } },
  { id: 'kanto',       points: '180,20 360,20 340,140 200,150 180,140',                label: { x: 260, y: 75  } },
  { id: 'puting-bato', points: '360,20 480,20 480,180 400,200 340,140',                label: { x: 415, y: 95  } },
  { id: 'habagatan',   points: '20,110 100,155 90,290 20,300',                         label: { x: 52,  y: 205 } },
  { id: 'bulalo',      points: '100,155 200,150 340,140 400,200 310,330 90,290',       label: { x: 225, y: 240 } },
  { id: 'malamig',     points: '310,330 400,200 480,180 480,380 20,380 20,300 90,290', label: { x: 280, y: 360 } },
];