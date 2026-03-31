import { useState, useEffect } from 'react';
import { BASE_DETECTIONS, NODES_DATA } from '../constants/MockData';

/**
 * Manages the live detection feed state.
 * Simulates a new detection arriving every ~12 seconds,
 * starting as 'fogging' then transitioning to 'fogged' after 8s.
 *
 * Returns { detections, alertPulse }
 */
export function useLiveDetections() {
  const [detections, setDetections] = useState(BASE_DETECTIONS);
  const [alertPulse, setAlertPulse] = useState(false);

  useEffect(() => {
    const onlineNodes = NODES_DATA.filter(n => n.online);

    const interval = setInterval(() => {
      const node = onlineNodes[Math.floor(Math.random() * onlineNodes.length)];
      const confidence = Math.floor(Math.random() * 20) + 80;
      const freq       = Math.floor(Math.random() * 201) + 400;

      const newDet = {
        id:           Date.now(),
        minsAgo:      0.05,
        nodeId:       node.id,
        sitio:        node.sitio,
        freq,
        confidence,
        autoResponse: 'fogging',
      };

      // Add new detection at the top, cap list at 30
      setDetections(prev => [newDet, ...prev.slice(0, 29)]);

      // Pulse the sidebar alert dot
      setAlertPulse(true);
      setTimeout(() => setAlertPulse(false), 2000);

      // After 8s (fog burst duration), mark as fogged
      setTimeout(() => {
        setDetections(prev =>
          prev.map(d => d.id === newDet.id ? { ...d, autoResponse: 'fogged' } : d)
        );
      }, 8000);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return { detections, alertPulse };
}