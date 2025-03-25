self.onmessage = function () { 
  const start = Date.now();
  while (Date.now() - start < 2000) { 
    console.log('Long task running in worker');
  }
  self.postMessage('done');
}