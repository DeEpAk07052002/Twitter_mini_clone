import { React, useEffect, useState } from "react";
import { Form, Input, Button, Card, message, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { checkuser } from "../redux/slice/login2";
import { useDispatch, useSelector } from "react-redux";
import TweetList from "./tweetList";
import { getTweet } from "../redux/slice/getTweet";
import { updateLikes } from "../redux/slice/updateLikes";

// const history = useNavigate ();
const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const state = useSelector((state) => state);
  useEffect(() => {
    dispatch(getTweet());
  }, []);
  useEffect(() => {
    // setLoading(state.getTweet.isLoading);
    setData(state.getTweet.data);
  }, [state]);
  const update_data = (e) => {
    // console.log("update data called", e);
    // setData({ ...data, likes: e });

    let prevData = [];
    data.map((data) => {
      if (data._id === e.id) {
        let datac = { ...data, likes: e.likes };
        // console.log("updateddata for likes", datac);
        prevData.push(datac);
      } else {
        prevData.push(data);
      }
    });
    dispatch(updateLikes(e)).then(() => {
      dispatch(getTweet());
    });
    console.log("data after updating", prevData);
    setData(prevData);
  };
  console.log("this is data from get tweets", state);
  if (state.getTweet.isLoading) {
    return (
      <Spin loading={true}>
        <TweetList data={data} />
      </Spin>
    );
  } else {
    return (
      <div>
        <TweetList data={data} update_data={update_data} />
      </div>
    );
  }
};
export default Home;
