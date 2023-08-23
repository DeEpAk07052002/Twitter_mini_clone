import { React, useEffect, useState } from "react";
import { Avatar, Typography, Row, Col, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./ProfileHeader.css"; // Import your custom CSS
import { useDispatch, useSelector } from "react-redux";
import { alldetails } from "../redux/slice/alldetails";
import { savedescription } from "../redux/slice/savedescription";
import { useLocation } from "react-router-dom";
import { getTweetsbyname } from "../redux/slice/getTweetsbyname";
import { postTweet } from "../redux/slice/postTweet";
import TweetList from "./tweetList";
const { Title, Text } = Typography;

const Profile = () => {
  const location = useLocation();
  // const [username, setUsername] = useState(
  //   location.state?.username
  //     ? location.state.username
  //     : localStorage.getItem("username")
  // );

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dataTweet, setDataTweet] = useState([]);
  const state = useSelector((state) => state);
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(
    data?.description ? data?.description : ""
  );
  const username = location.state?.username
    ? location.state.username
    : localStorage.getItem("username");

  useEffect(() => {
    dispatch(alldetails({ username: username }));
    dispatch(getTweetsbyname({ username: username }));
  }, [username]);
  useEffect(() => {
    setData(state.alldetails.data);
    setDataTweet(state.getTweetsbyname.data);
    // if (data?.description) {
    // setDescription(data?.description ? data?.description : "");
    // }
    // setDescription(data?.description ? data?.description : "");
  }, [state, username]);
  useEffect(() => {
    setDescription(data?.description ? data?.description : "");
  }, [data]);
  const handleEditClick = () => {
    setEditing(true);
  };
  // console.log("this is dataTweet", dataTweet);
  console.log("this is data tweets", dataTweet);
  const handleSaveClick = () => {
    setEditing(false);
    dispatch(savedescription({ username: username, description: description }));
  };
  const descriptionarea =
    localStorage.getItem("username") === username ? (
      <>
        {editing ? (
          <Input.TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        ) : (
          <p>{description}</p>
        )}

        {editing ? (
          <Button onClick={handleSaveClick} type="primary">
            Save
          </Button>
        ) : (
          <Button type="link" onClick={handleEditClick}>
            Edit Description
          </Button>
        )}
      </>
    ) : (
      <p>{description}</p>
    );
  const handleDelete = async (e) => {
    const f_data = dataTweet.filter((data) => data._id !== e.id);
    console.log("this is eeee", dataTweet, e, f_data);
    await dispatch(postTweet(e));
    setDataTweet(f_data);

    // Dispatch the postTweet action after updating the state
  };
  const handleEdit = async (e) => {
    const f_data = [];
    dataTweet.map((data) => {
      if (data._id === e.id) {
        f_data.push({ ...data, content: e.content });
      } else {
        f_data.push(data);
      }
    });
    await dispatch(postTweet(e));
    setDataTweet(f_data);
  };
  return (
    <div>
      <div className="profile-header">
        <div className="cover-image"></div>
        <div className="avatar-container">
          <Avatar size={120} icon={<UserOutlined />} className="avatar" />
        </div>
        <div className="profile-details">
          <Title level={3}>{username}</Title>
          {/* <Text className="username">@johndoe</Text> */}

          <Text className="bio">{descriptionarea}</Text>
          <div className="follow-stats">
            <Text strong>{data?.followerscnt ? data?.followerscnt : 0}</Text>{" "}
            Followers{" "}
            <Text strong>{data?.followingcnt ? data?.followingcnt : 0}</Text>{" "}
            Following
          </div>
        </div>
      </div>
      <div className="post-heading">
        <Title level={4}>Recent Posts</Title>
      </div>
      <TweetList
        data={dataTweet}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default Profile;
