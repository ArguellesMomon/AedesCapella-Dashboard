import { useState, useEffect } from 'react';
import { getPHTime, getPHDate } from '../utils/helpers';

/**
 * Returns { clock, date } that tick every second in Philippine time (Asia/Manila).
 */
export function usePHTime() {
  const [clock, setClock] = useState(getPHTime());
  const [date,  setDate]  = useState(getPHDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(getPHTime());
      setDate(getPHDate());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { clock, date };
}