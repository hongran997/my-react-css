import { useEffect, useCallback } from "react";
export default function LongTaskSubPage() { 
  // 性能较差
  const longTask = useCallback(() => {
      const start = Date.now();
      while (Date.now() - start < 2000) { 
        console.log('Long task running in sub page');
      }
    }, []);
  
  // 方案一： Web Worker
  // const longTask = useCallback(() => { 
  //   const worker = new Worker(new URL('./longTask.worker.ts', import.meta.url));
  //   worker.onmessage = () => { 
  //     console.log('Long task completed');
  //     worker.terminate();
  //   }
  //   worker.postMessage('start');
  // }, [])

  // 方案二：使用任务分片
  // const longTask = useCallback(() => { 
  //   const start = Date.now();
  //   let count = 0;
  //   function chunk() { 
  //     const chunkStart = Date.now();
  //     while (Date.now() - chunkStart < 30 && Date.now() - start < 2000) { 
  //       console.log(`chunk ${count}: Long task running`);
  //     }
  //     if (Date.now() - start < 2000) { 
  //       count++;
  //       requestAnimationFrame(chunk);
  //     }
  //   }
  //   requestAnimationFrame(chunk);
  // }, [])
  
  // 方案三： 使用async  await
  // const longTask = useCallback(async () => { 
  //   const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  //   const start = Date.now();
  //   while (Date.now() - start < 2000) { 
  //     console.log('Long task running');
  //     await sleep(0);
  //   }
  // }, [])
  
  useEffect(() => {
      document.getElementById('longTaskBtn')?.addEventListener('click', longTask);
    return () => {
        document.getElementById('longTaskBtn')?.removeEventListener('click', longTask);
      }
  }, []);
  
  return (
    <button id="longTaskBtn">执行长任务在子组件中</button>
  )
}