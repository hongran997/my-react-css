import { useEffect } from "react";

export default function usePerformanceMetrics() { 
  useEffect(() => {
    window.addEventListener('load', () => {
      setTimeout(() => { 
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const metrics = {
          // 重定向时间
          redirectTime: `${(navigation.redirectEnd - navigation.redirectStart).toFixed(2)}ms`,
          // dns 解析时间
          dnsTime: `${(navigation.domainLookupEnd - navigation.domainLookupStart).toFixed(2)}ms`,
          // tcp ， tls连接时间
          tcpTime: `${(navigation.connectEnd - navigation.connectStart).toFixed(2)}ms`,
          // 请求时间
          ttfbTime: `${(navigation.responseStart - navigation.requestStart).toFixed(2)}ms`,
          // 从开始到结束的完整时间线
          totalTime: `${(navigation.loadEventEnd - navigation.startTime).toFixed(2)}ms`,
          // DOM 解析 domInteractive 、 reponseEnd
          PureDOMParseTime: `${(navigation.domInteractive - navigation.responseEnd).toFixed(2)}ms`,
          // domContentLoaded 事件 消费的时间
          DOMContentLoadedTime: `${(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart).toFixed(2)}ms`,
          // load事件 时间  loadEventStart 、 loadEventEnd
          loadTime: `${(navigation.loadEventEnd - navigation.loadEventStart).toFixed(2)}ms`,
          // 资源加载时间（从 DOM 解析完成到 load 事件开始）
          resourceTime: `${(navigation.loadEventStart - navigation.domContentLoadedEventEnd).toFixed(2)}ms`,
        }
        // console.log('Performance :', performance);
        // console.log('Performance metrics:', metrics);
        // console.log('Performance navigation:', navigation.toJSON());
      }, 0)
    });
  }, [])
}