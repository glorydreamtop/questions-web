import React, { useState } from "react";



function result() {
  const [result, setResult] = useState(92);
  return (
    <div className="p-4 flex flex-col items-center">
      <h1>您的口腔自测成绩为</h1>
      <div>
        <img src="../../../static/result/5.png"></img>
      </div>
    </div>
  );
}

export default result;
