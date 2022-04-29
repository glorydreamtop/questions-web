import { ProgressBar, Button } from "antd-mobile";
import React, { useState } from "react";
import "./index.less";
import questionsJson from "../../questions.json";

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

interface answer {
  questionId: number;
  value: number;
  optionId: number[];
}

const makeQA = (): question[] => {
  const questions: question[] = questionsJson.questions;
  const options: option[] = questionsJson.options;
  options.forEach((option) => {
    const ques = questions.find((q) => q.id === option.belong)!;
    if (ques.options) {
      ques.options?.push(option);
    } else {
      ques.options = [option];
    }
  });
  console.log(questions);

  return questions;
};

const answers: answer[] = [];

const q = makeQA();

export default () => {
  // 题目列表
  const [qusetions] = useState<question[]>(q);
  // 答案集

  // 进度条
  const [progress, setProgress] = useState<number>(0);
  // 当前第几个问题
  const [questionIndex, setCurrentQuestion] = useState<number>(0);
  // 选中的答案
  const [selected, setSelected] = useState<number[] | null>(null);

  const choose = (id: number) => {
    const isSingle = qusetions[questionIndex].mode === "single";
    const value = questionsJson.options.find((option) => option.id === id)!.val;
    const answer = answers.find(
      (answer) => answer.questionId === qusetions[questionIndex].id
    );

    if (isSingle) {
      setSelected([id]);
      if (answer) {
        answer.optionId = [id];
        answer.value = value;
      } else {
        answers.push({
          questionId: qusetions[questionIndex].id,
          value,
          optionId: [id],
        });
      }
      console.log(answers);
    } else {
      const hasSelected = selected?.includes(id);
      const selectIds = hasSelected
        ? selected!.filter((i) => i !== id)
        : [...selected!, id];
      if (answer) {
        setSelected(selectIds);
        answer.optionId = selectIds;
        answer.value = selectIds.reduce(
          (acc, cur) =>
            acc + questionsJson.options.find((option) => option.id === cur)!.val
        );
      } else {
        setSelected(selectIds);
        answers.push({
          questionId: qusetions[questionIndex].id,
          value,
          optionId: [id],
        });
      }
    }
  };
  // 下一题
  const next = () => {
    if (questionIndex === qusetions.length - 1) {
      return;
    } else {
      setCurrentQuestion(questionIndex + 1);
      // 去掉勾选状态，更新进度
      setProgress(((questionIndex + 1) / qusetions.length) * 100);
      const selectedId =
        answers.find(
          (item) => item.questionId === qusetions[questionIndex + 1].id
        )?.optionId ?? [];
      setSelected(selectedId);
    }
  };
  // 上一题
  const pre = () => {
    setCurrentQuestion(questionIndex - 1);
    // 去掉勾选状态，更新进度
    setProgress((questionIndex / qusetions.length) * 100);
    const selectedId =
      answers.find(
        (item) => item.questionId === qusetions[questionIndex - 1].id
      )?.optionId ?? [];
    setSelected(selectedId);
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
                onClick={() => choose(option.id)}
                className={[
                  selected?.includes(option.id) ? "selected" : "not-selected",
                  "options",
                ].join(" ")}
                key={option.id}
              >
                <span>{String.fromCharCode(65 + index)}.</span>
                <div className="flex items-center gap-2">
                  <img
                    className="w-32 max-w-32 max-h-32 object-contain"
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
            {questionIndex === qusetions.length - 1 ? "提交" : "下一题"}
          </Button>
        </div>
      </div>
    </>
  );
};
