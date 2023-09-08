import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageFilled,
  HomeFilled,
  BellFilled,
  UserOutlined,
  SearchOutlined,
  LogoutOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import User from "./User";
import Home from "./home";
import { useNavigate } from "react-router-dom";
import LoginPage from "./Login";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  theme,
  Input,
  Avatar,
  Modal,
  message,
  Upload,
} from "antd";
import { postTweet } from "../redux/slice/postTweet";

const { Header, Sider, Content } = Layout;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const Layouts = () => {
  const [fileList, setFileList] = useState([]);
  const location = useLocation();
  // const [type, setType] = useState("pc");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const location = useLocation();
  // const navigate = useNavigate();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log("state from layout", state);
  const navigate = useNavigate();
  console.log("current pathname", window.location.pathname);
  useEffect(() => {
    // Check if the current path is "/"
    if (location.pathname === "/") {
      // Redirect to the login path
      navigate("/login");
    }
    // Other logic or side-effects you want to perform when the path changes
  }, [location.pathname]);
  // const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleMenuClick = (event) => {
    console.log("event keys", event);
    if (event.key != "post") {
      navigate(event.key);
    }
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postContent, setPostContent] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    // Implement logic to save the post content
    if (postContent?.length === 0) {
      message.error("Content must not be empty");
      return;
    }
    let data = {
      created_by: localStorage.getItem("username"),
      content: postContent,
      type: "add",
    };
    await dispatch(postTweet(data));
    message.success(state.postTweet.data?.status);
    setIsModalVisible(false);
    setPostContent("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPostContent("");
  };
  const defaultSelectedKey = location.pathname;

  useEffect(() => {
    // Function to update window width state
    const handleResize = () => {
      localStorage.setItem("windowWidth", window.innerWidth.toString());
      setWindowWidth(window.innerWidth);
    };

    // Add event listener to 'resize' event
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div style={{ alignItems: "center" }}>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  console.log("innerwidth", windowWidth);
  if (localStorage.getItem("username")) {
    if (windowWidth < 930) {
      return (
        // <Router>

        <div>
          <Layout style={{ minHeight: "100vh" }}>
            <Layout.Header style={{ background: "#001529", padding: 0 }}>
              <div className="demo-logo-horizontal" />
              <Menu
                onClick={handleMenuClick}
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[defaultSelectedKey]}
                style={{ lineHeight: "64px" }}
              >
                <Menu.Item key="/home" icon={<HomeFilled />}>
                  Home
                </Menu.Item>
                <Menu.Item key="/profile" icon={<UserOutlined />}>
                  Profile
                </Menu.Item>
                <Menu.Item key="/user" icon={<SearchOutlined />}>
                  Explore
                </Menu.Item>
                <Menu.Item key="post" style={{ float: "right" }}>
                  <Button type="primary" size="large" onClick={showModal}>
                    Post
                  </Button>
                </Menu.Item>
                <Menu.Item key="post" style={{ float: "right" }}>
                  <Button
                    type="danger"
                    style={{
                      color: "white",
                      float: "right",
                      marginTop: "15px",
                      marginRight: "15px",
                    }}
                    icon={<LogoutOutlined />}
                    onClick={(e) => {
                      e.preventDefault();

                      localStorage.clear();
                      navigate("/login");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </Button>
                </Menu.Item>
              </Menu>
            </Layout.Header>
            <Layout>
              <Content
                style={{
                  padding: 24,
                  background: colorBgContainer,
                  overflow: "auto",
                }}
              >
                <Routes>
                  <Route path="/user" element={<User />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
          <Modal
            title="Create a New Post"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={500}
          >
            <Input.TextArea
              placeholder="What's happening?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows={4}
            />
            <Upload
              style={{ paddingRight: "40vw" }}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              // limit={1}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>

            <div
              style={{
                marginTop: "16px",
                display: "flex",
                alignItems: "center",
              }}
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
        // </Router>
      );
    } else {
      return (
        <div>
          <Layout style={{ minHeight: "100vh" }}>
            <Sider
              trigger={null}
              style={{ position: "fixed", height: "100vh", overflowY: "auto" }}
            >
              <div className="demo-logo-vertical" />
              <Menu
                onClick={handleMenuClick}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[defaultSelectedKey]}
              >
                <Menu.Item
                  key="/home"
                  icon={<HomeFilled />}
                  style={{ padding: "30px" }} // Add padding here
                >
                  Home
                </Menu.Item>
                {/* <Menu.Item
            key="/notification"
            icon={<BellFilled />}
            style={{ padding: "30px" }} // Add padding here
          >
            Notification
          </Menu.Item> */}

                <Menu.Item
                  key="/profile"
                  icon={<UserOutlined />}
                  style={{ padding: "30px" }} // Add padding here
                >
                  Profile
                </Menu.Item>
                <Menu.Item
                  key="/user"
                  icon={<SearchOutlined />}
                  style={{ padding: "30px" }} // Add padding here
                >
                  Explore
                </Menu.Item>
                {/* <Menu.Item key="5" style={{ padding: "30px" }}> */}
                <Button
                  type="primary"
                  size="large"
                  style={{ width: "70%", left: "15%" }}
                  onClick={showModal}
                >
                  Post
                </Button>
                {/* </Menu.Item> */}
              </Menu>
              <Button
                type="danger"
                style={{ marginTop: "400px", color: "white" }}
                icon={<LogoutOutlined />}
                onClick={(e) => {
                  e.preventDefault();

                  localStorage.clear();
                  navigate("/login");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </Sider>
            <Layout>
              {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,F
              height: 64,
            }}
          /> */}
              {/* </Header> */}
              <Content
                style={{
                  marginLeft: "200px ",
                  padding: 24,
                  // minHeight: 280,\
                  // left: "1000px",
                  background: colorBgContainer,
                  overflow: "auto",
                }}
              >
                <Routes>
                  <Route path="/user" element={<User />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
          <Modal
            title="Create a New Post"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={500}
          >
            <Input.TextArea
              placeholder="What's happening?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows={4}
            />
            <Upload
              style={{ paddingRight: "40vw" }}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              limit={1}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>

            <div
              style={{
                marginTop: "16px",
                display: "flex",
                alignItems: "center",
              }}
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
    }
  }
};
export default Layouts;
