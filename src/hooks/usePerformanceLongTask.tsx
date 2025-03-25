import { useEffect, useMemo } from 'react';
export default function usePerformanceLongTask() { 
  const observer = useMemo(() => { 
      return new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'longtask') {
            console.log('Long task detected');
          }
        }
      });
  }, []);
  
  useEffect(() => { 
    window.addEventListener('load', () => { 
      setTimeout(() => { 
        observer.observe({ entryTypes: ['longtask'] });
      }, 5000)
    })
    return () => { 
      observer.disconnect();
    }
  }, [])
}