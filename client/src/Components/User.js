import React, { useState, useEffect } from "react";
import { Input, List, Skeleton, Avatar, Button, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { allUser } from "../redux/slice/allUser"; // Correct the import path if needed
import { userDetails } from "../redux/slice/userDetails";
import { UserDeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import { updateFriend } from "../redux/slice/friends";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [friends, setFriends] = useState("");
  const state = useSelector((state) => state);

  console.log("this is state from friend", state);
  const count = 3;
  useEffect(() => {
    dispatch(allUser()).then(() => {
      dispatch(userDetails()).then(() => {
        console.log("this is state inside useeffect", state);
      });
    });
  }, []);
  useEffect(() => {
    let data_to_show = [];

    state.allUser?.data?.map((user) => {
      if (user.username !== localStorage.getItem("username")) {
        data_to_show.push(user);
      }
    });
    console.log("this is data to show", data_to_show);
    setData(data_to_show);
    setFriends(state.userDetails.data ? state.userDetails.data.friends : "");
  }, [state]);
  const handleSearchChange = (e) => {
    let f_data = state.allUser?.data;
    f_data = state.allUser?.data?.filter((data) => {
      if (data?.username !== localStorage.getItem("username")) {
        return data?.username?.includes(e.target.value);
      }
    });
    setData(f_data);
    setSearchTerm(e.target.value);
  };
  const handleClick = (e) => {
    let friends_list = friends.split(", ");
    console.log("friends_list", friends_list, e);

    if (e.id === 0) {
      friends_list = friends_list.filter((friend) => friend !== e.friend_id);
    } else if (e.id === 1) {
      friends_list.push(e.friend_id);
    }

    let friendss = friends_list.join(", ");
    console.log("this is friendlist after operation", friends_list, friendss);
    const data = {
      name: state.userDetails.data.username,
      friends_list: friendss,
    };
    console.log("this is friendlist after operation", friends_list, friendss);

    dispatch(updateFriend(data)).then(() => {
      console.log("this is state after adding", state);
      setFriends(friendss);
    });
    console.log("this is ee", e);
  };
  console.log("data after useState", data);
  // let data = state.allUser.data;
  //   let friends = state.userDetails?.data?.friends;
  let friends_list = friends?.split(", ");
  console.log("thsis is friend", friends, friends_list);
  return (
    <Spin
      spinning={
        state.allUser.isLoading === true ||
        state.userDetails.isLoading === true ||
        state.updateFriend.isLoading === true
      }
    >
      <div style={{ overflow: "auto" }}>
        <Input
          style={{ width: "50%" }}
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {data && data.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                    />
                  }
                  title={
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (friends_list.includes(item?._id)) {
                          navigate("/profile", {
                            state: { username: item.username },
                          });
                        }
                      }}
                    >
                      {item?.username}
                    </span>
                  }
                  // description={item?.description}
                />
                <div
                  style={{
                    paddingRight:
                      localStorage.getItem("windowWidth") > 600 ? "50%" : "0%",
                    paddingBottom: "3%",
                  }}
                >
                  <Button
                    // value={friends_list.includes(item?._id) ? 0 : 1}
                    type={
                      friends_list.includes(item?._id) ? "default" : "primary"
                    }
                    icon={
                      friends_list.includes(item?._id) ? (
                        <UserDeleteOutlined />
                      ) : (
                        <UserAddOutlined />
                      )
                    }
                    onClick={() => {
                      handleClick({
                        id: friends_list.includes(item?._id) ? 0 : 1,
                        friend_id: item?._id,
                      });
                    }}
                    value={friends_list.includes(item?._id) ? 0 : 1}
                    // onClick={handleToggleFollow}
                  >
                    {friends_list.includes(item?._id) ? "Unfollow" : "Follow"}
                  </Button>
                </div>
              </List.Item>
            )}
          />
        ) : null}
      </div>
    </Spin>
  );
};

export default User;
