import "./App.css";
import React, {
  lazy,
  useRef,
  Suspense,
  useCallback,
  useMemo,
  useEffect,
  Fragment,
} from "react";
import "./styles/critical.css";
import usePerformanceMetrics from "./hooks/usePerformanceMetrics";
import LongTaskSubPage from "./components/LongTaskSubPage";
import usePerformanceLongTask from "./hooks/usePerformanceLongTask";

// 只在需要时加载大型组件的样式，减少初始加载时间
// 使用 React.lazy 和 Suspense 来延迟加载大型组件
// 这是 React 代码分割的特性
// 懒加载的好处
// 1. 减小主包的体积
// 2. 首次加载更快
// 3. 按需加载组件
// 4. 特别适合大型组件或不是立即需要的组件

const DataTable = lazy(() => import('./DataTable/DataTable'));
// import DataTable from './DataTable/DataTable';

function App() {
  const data = Array.from({ length: 2000 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    price: Math.floor(Math.random() * 1000),
    category: ["Electronics", "Books", "Clothing"][
      Math.floor(Math.random() * 3)
    ],
  }));

  usePerformanceMetrics();
  usePerformanceLongTask();

  const leakedDataRef = useRef<any[]>([]);
  const timerRef = useRef<number>();

  const createLeak = useCallback(() => {
    // 每次调用都往数组中添加大量数据
    alert("内存泄露已开始");
    timerRef.current = setInterval(() => {
      leakedDataRef.current.push({
        date: Date.now(),
        data: new Array(1000000).fill("leak"),
      });
      console.log(leakedDataRef.current);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const cancelLeak = useCallback(() => {
    leakedDataRef.current = [];
    clearInterval(timerRef.current);
    alert("内存泄露已取消");
  }, []);

  useEffect(() => {
    // console.log('App component mounted');
    document
      .getElementById("leakButton")
      ?.addEventListener("click", createLeak);
    document
      .getElementById("cancelLeakButton")
      ?.addEventListener("click", cancelLeak);
    return () => {
      document
        .getElementById("leakButton")
        ?.removeEventListener("click", createLeak);
      document
        .getElementById("cancelLeakButton")
        ?.removeEventListener("click", cancelLeak);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header title">
        <img
          src="https://source.unsplash.com/random/1200x800"
          alt="Hero"
          className="hero-image"
        />
        <button id="leakButton">内存泄露</button>
        <button id="cancelLeakButton">取消内存泄露</button>
        {/* { 
          leakedDataRef.current && <div>{leakedDataRef.current}</div>
        } */}
        <h1>Performance Testing</h1>
      </header>
      <div className="main-content">
        <div className="long-task-section">
          <LongTaskSubPage />
        </div>
        <div className="content-wrapper">
          <Suspense fallback={<div>Loading...</div>}>
            <DataTable data={data} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default App;
