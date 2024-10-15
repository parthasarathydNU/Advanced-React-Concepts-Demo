const statisticsWorker = () => {
  onmessage = (e) => {
    const transactions = e.data;
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    const average = total / transactions.length;
    const data = { total, average };
    postMessage(JSON.parse(JSON.stringify(data)));
  };
};

let code = statisticsWorker.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
const blob = new Blob([code], { type: "application/javascriptssky" });
const workerScript = URL.createObjectURL(blob);

module.exports = workerScript;
