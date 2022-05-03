import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Paper,
} from "@mui/material";
import { notifyError } from "../actionCreators/NotifyActions";
import axios from "../common/AxiosConfig";

import { useHistory } from "react-router-dom";

export const QuizHistory = () => {
  let history = useHistory();
  const authState = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [quizzes, setQuizzes] = useState([{
      
  }]);
  const [quizzesPlayed, setQuizzesPlayed] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    axios
      .get("/quiz/getQuiz")
      .then((res) => {
        console.log(res.data);
        setQuizzes(res.data.data);
      })
      .catch((err) => {
        dispatch(notifyError(err.response.data.errors[0].msg));
      });
  }, []);
  return <></>;
};
