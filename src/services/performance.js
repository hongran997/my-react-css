// 监控 CSS 加载性能
performance.getEntriesByType('resource').filter(
  entry => entry.initiatorType === 'css'
).forEach(entry => {
  console.log(`CSS 加载时间: ${entry.duration}ms`);
}); 