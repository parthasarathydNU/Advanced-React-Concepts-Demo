import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import SummaryContainer from "../ui/SummaryContainer";
import workerScript from '../workers/statisticsWorker'

export default function TransactionStatistics() {    
    const {state} = useAppContext();
    const [stats, setStats] = useState({total: 0, average: 0});

    useEffect(() => {
        const worker = new Worker(workerScript);
        worker.postMessage(state.transactions);
        worker.onmessage = (e) => {
            setStats(e.data);
            worker.terminate();
        }
    }, [state.transactions]);

    return (
        <SummaryContainer>
          <h3>Transaction Statistics</h3>
          <p>Total: ${stats.total.toFixed(2)}</p>
          <p>Average: ${stats.average.toFixed(2)}</p>
        </SummaryContainer>
      );
}
