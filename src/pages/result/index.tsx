import React, { useState } from "react";
import './index.less'

function result() {
  const [result, setResult] = useState(52);
  return (
    <div className="p-4 flex flex-col items-center">
      <h1>您的口腔自测成绩为</h1>
      <div className="result w-60 relative">
        <img
          className="w-60"
          src={`../../../static/result/${parseInt(
            (result / 20).toString()
          )}.png`}
        />
        <div className="absolute flex justify-center items-center h-20 w-20 nums">
          <div
            className="w-10 h-20 num"
            style={{
              backgroundImage: `url(../../../static/num/${parseInt(
                (result / 20).toString()
              )}${parseInt((result / 10).toString())}.png)`,
            }}
          />
          <div
            className="w-10 h-20 num"
            style={{
              backgroundImage: `url(../../../static/num/${parseInt(
                (result / 20).toString()
              )}${result % 10}.png)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default result;
