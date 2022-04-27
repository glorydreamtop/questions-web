import { ProgressBar, Button } from "antd-mobile";
import React, { useEffect, useState } from "react";
import "./index.less";

enum questionType {
  single = "single",
  multiple = "multiple",
}

interface question {
  id: number;
  content: string;
  options: option[];
  mode: questionType;
}

interface option {
  id: number;
  content: string;
  belong: number;
}

export default () => {
  const [qusetions, setQuestions] = useState<question[]>([
    {
      id: 1,
      content:
        "你是否喜欢吃苹果？你是否喜欢吃苹果？你是否喜欢吃苹果？你是否喜欢吃苹果？你是否喜欢吃苹果？",
      options: [
        {
          id: 1,
          content: "是",
          belong: 1,
        },
        {
          id: 2,
          content: "否",
          belong: 1,
        },
      ],
      mode: questionType.single,
    },
    {
      id: 2,
      content: "早餐想吃什么",
      options: [
        {
          id: 3,
          content: "苹果/牛奶",
          belong: 2,
        },
        {
          id: 4,
          content: "面包/咖啡",
          belong: 2,
        },
        {
          id: 5,
          content: "豆腐脑/油条",
          belong: 2,
        },
        {
          id: 6,
          content: "牛肉拉面",
          belong: 2,
        },
      ],
      mode: questionType.single,
    },
  ]);
  const [progress, setProgress] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  // 去掉勾选状态，更新进度
  useEffect(() => {
    setProgress((currentQuestion / qusetions.length) * 100);
    setSelected(null);
  },[currentQuestion]);
  const [selected, setSelected] = useState<number | null>(1);
  // 下一题
  const next = () => {
    setCurrentQuestion(currentQuestion + 1);
  };
  // 上一题
  const pre = () => {
    setCurrentQuestion(currentQuestion - 1);
  };
  return (
    <>
      <div>
        <ProgressBar
          percent={progress}
          style={{
            "--track-width": "10px",
            borderRadius: "0",
          }}
        ></ProgressBar>
        <span className="float-right">{`${currentQuestion}/${
          qusetions.length
        }`}</span>
      </div>
      <div className="p-4 mt-8">
        <div className="mb-12 leading-8">
          <span className="text-3xl text-green-500 font-bold">{`Q${currentQuestion+1}`}</span>
          <span>{qusetions[currentQuestion].content}</span>
        </div>
        <div className="px-4 flex flex-col gap-6 min-h-90">
          {qusetions[currentQuestion].options.map((option, index) => {
            return (
              <div
                onClick={() => setSelected(option.id)}
                className={[
                  selected === option.id ? "selected" : "not-selected",
                  "options",
                ].join(" ")}
                key={option.id}
              >
                <span>{String.fromCharCode(65 + index)}.</span>
                <span className="ml-2">{option.content}</span>
              </div>
            );
          })}
        </div>
        <div className="w-full border border-t flex items-center fixed left-0 bottom-0 children:rounded-none children:h-14">
          <Button disabled={currentQuestion===0} block onClick={pre}>
            上一题
          </Button>
          <Button block color="primary" onClick={next}>
            下一题
          </Button>
        </div>
      </div>
    </>
  );
};
