import { ProgressBar, Button } from "antd-mobile";
import React, { useState } from "react";
import "./index.less";
import _questionsJson from "../../questions.json";

interface question {
  id: number;
  content: string;
  options?: option[];
  mode: "single" | "multiple";
  drag: boolean;
}

interface option {
  id: number;
  content: string;
  pic: string;
  belong: number;
  val: number;
}

const questionsJson = JSON.parse(JSON.stringify(_questionsJson));

const makeQA = (): question[] => {
  const questions: question[] = questionsJson.questions;
  const options: option[] = questionsJson.options;
  options.forEach((option) => {
    const ques = questions.find((q) => q.id === option.belong)!;
    console.log(option.id);

    if (ques.options) {
      ques.options?.push(option);
    } else {
      ques.options = [option];
    }
  });
  console.log(questions);

  return questions;
};

const q = makeQA();

export default () => {
  // 题目列表
  const [qusetions] = useState<question[]>(q);
  // 答案集
  const [answers] = useState<{ [key: number]: number[] }>({});
  // 进度条
  const [progress, setProgress] = useState<number>(0);
  // 当前第几个问题
  const [questionIndex, setCurrentQuestion] = useState<number>(0);
  // 选中的答案
  const [selected, setSelected] = useState<number | null>(1);
  // 下一题
  const next = () => {
    setCurrentQuestion(questionIndex + 1);
    // 去掉勾选状态，更新进度
    setProgress(((questionIndex + 1) / qusetions.length) * 100);
    setSelected(null);
  };
  // 上一题
  const pre = () => {
    setCurrentQuestion(questionIndex - 1);
    // 去掉勾选状态，更新进度
    setProgress((questionIndex / qusetions.length) * 100);
    setSelected(null);
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
        <span className="float-right">{`${questionIndex}/${qusetions.length}`}</span>
      </div>
      <div className="p-4 mt-8">
        <div className="mb-12 leading-8">
          <span className="text-3xl text-green-500 font-bold">{`Q${
            questionIndex + 1
          }`}</span>
          <span>{qusetions[questionIndex].content}</span>
        </div>
        <div className="px-4 flex flex-col gap-6 min-h-90 pb-20">
          {qusetions[questionIndex].options!.map((option, index) => {
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
                <div className="flex items-center gap-2">
                  <img
                    className="w-36 max-w-36 max-h-36 object-contain"
                    src={option.pic}
                  />
                  <span className="text-xs">{option.content}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full border border-t flex items-center fixed left-0 bottom-0 children:rounded-none children:h-14 bg-white">
          <Button disabled={questionIndex === 0} block onClick={pre}>
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
