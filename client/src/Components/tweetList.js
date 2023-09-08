import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  List,
  Space,
  Empty,
  Button,
  message,
  Input,
  Modal,
} from "antd";
import "./list.css";
import { useNavigate } from "react-router-dom";
const IconText = ({ icon, text, key, handleLikeClick, value }) => (
  <Space
    onClick={() => {
      console.log("this is key", key, value);
      handleLikeClick({ id: value, likes: text + 1 });
    }}
    style={{ cursor: "pointer" }}
  >
    {React.createElement(icon)}
    {text}
  </Space>
);
const TweetList = (props) => {
  const [content, setContent] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const data = props.data;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postContent, setPostContent] = useState("");

  const showModal = (e) => {
    setContent(e.content);
    setId(e.id);
    setIsModalVisible(true);
  };
  const handleOk = async (e) => {
    // Implement logic to save the post content
    if (content?.length === 0) {
      message.error("Content must not be empty");
      return;
    }
    let data = {
      id: id,
      content: content,
      type: "update",
    };
    props.handleEdit(data);
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setContent("");
    setId("");
  };
  console.log("this is data from props", data);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  console.log("this is props data", data);
  // const filteredData = data.filter((item) => item._id !== e.id);
  const handleLikeClick = (e) => {
    console.log("this item is clicked", e);
    props.update_data(e);
  };
  // let width=localStorage.getItem("")?:"70%":"100%";
  return (
    <div>
      {data && data.length !== 0 ? (
        <List
          style={{
            width: localStorage.getItem("windowWidth") > 900 ? "70%" : "100%",
          }}
          itemLayout="vertical"
          size="small"
          //   pagination={{
          //     onChange: (page) => {
          //       console.log(page);
          //     },
          //     pageSize: 3,
          //   }}
          dataSource={data} // Set dataSource to data
          renderItem={(item) => (
            <List.Item
              className="custom-list-item"
              key={item.created_by}
              actions={[
                <IconText
                  style={{ cursor: "pointer" }}
                  icon={LikeOutlined}
                  text={item.likes}
                  value={item._id}
                  key={item._id}
                  handleLikeClick={handleLikeClick}
                />,
              ]}
              extra={
                <img
                  width={localStorage.getItem("windowWidth") < 600 ? 100 : 200}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              }
            >
              <List.Item.Meta
                // avatar={<Avatar src={item.avatar} />}

                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate("/profile", {
                          state: { username: item.created_by },
                        });
                      }}
                    >
                      {item.created_by}
                    </span>
                    <span style={{ fontSize: "10px" }}>
                      {localStorage.getItem("windowWidth") > 600
                        ? new Date(item.created_on).toLocaleString(
                            "en-US",
                            options
                          )
                        : null}
                      {localStorage.getItem("username") == item.created_by ? (
                        <span>
                          <EditTwoTone
                            onClick={() => {
                              showModal({
                                content: item.content,
                                id: item._id,
                              });
                            }}
                            style={{ paddingLeft: "20px", cursor: "pointer" }}
                          />
                          <DeleteTwoTone
                            onClick={() => {
                              props.handleDelete({
                                type: "delete",
                                id: item._id,
                              });
                            }}
                            style={{ paddingLeft: "20px", cursor: "pointer" }}
                          />
                        </span>
                      ) : null}
                    </span>
                  </div>
                }
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      ) : (
        <Empty description={<div>No data</div>} />
      )}
      <Modal
        title="Create a New Post"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
      >
        <Input.TextArea
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <div
          style={{ marginTop: "16px", display: "flex", alignItems: "center" }}
        >
          <Avatar
            size={32}
            src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1}"
          />
          <span style={{ marginLeft: "8px" }}>
            {localStorage.getItem("username")}
          </span>
        </div>
      </Modal>
    </div>
  );
};
export default TweetList;
