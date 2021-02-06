import React, { Component ,useEffect} from "react";
import {
  Link,
  Route,
  useHistory,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import {
  NotificationOutlined,
  LoadingOutlined,
  CalendarOutlined,
  BarsOutlined,
  AuditOutlined,
  LayoutOutlined,
  MessageOutlined,
  BulbOutlined,
  ClockCircleOutlined,
  QuestionCircleOutlined,
  WarningOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Divider,Button } from "antd";
import styled from "styled-components";
import oc from "open-color";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
`;

const MenuContent = styled.div`
  color: ${oc.gray[7]};
  width: 11rem; // 클릭 박스 조정
  height: 100%;
  padding: 1rem 0;
  font-weight: bold;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  width: 100%;
  border-radius: 5px;
  transition: all 0.2s;
  &:hover {
    background: ${oc.gray[3]};
    cursor: pointer;
    font-size: 1rem;
  }
`;

const Menu = (props) => {
  let history = useHistory();
  const {
    menu,
    setmenu
  } = props;
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("username");
  const ScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MenuContainer>
      <MenuItem onClick={ScrollTop}>
        <div onClick={()=>setmenu(0)} style={{ textDecoration: "none" }}>
          <MenuContent>
            <NotificationOutlined style={{ padding: "0 1rem" }} />
            공지사항
          </MenuContent>
        </div>
      </MenuItem>
      <Divider style={{ margin: "0" }} />
      <MenuItem onClick={ScrollTop}>
        <div onClick={()=>setmenu(1)} style={{ textDecoration: "none" }}>
          <MenuContent>
            <BulbOutlined style={{ padding: "0 1rem" }} />
            질문 추가 및 수정
          </MenuContent>
        </div>
      </MenuItem>
      <Divider style={{ margin: "0" }} />
      <MenuItem onClick={ScrollTop}>
        <div onClick={()=>setmenu(2)} style={{ textDecoration: "none" }}>
          <MenuContent>
            <QuestionCircleOutlined style={{ padding: "0 1rem" }} />
            유저들의 질문
          </MenuContent>
        </div>
      </MenuItem>
      <Divider style={{ margin: "0" }} />
      <MenuItem onClick={ScrollTop}>
        <div onClick={()=>setmenu(3)} style={{ textDecoration: "none" }}>
          <MenuContent>
            <WarningOutlined style={{ padding: "0 1rem" }} />
            데이터 수정 요청
          </MenuContent>
        </div>
      </MenuItem>

      <Divider style={{ margin: "0" }} />
      <MenuItem onClick={ScrollTop}>
        <div onClick={()=>setmenu(4)} style={{ textDecoration: "none" }}>
          <MenuContent>
            <ClockCircleOutlined style={{ padding: "0 1rem" }} />
            학과 사무실
          </MenuContent>
        </div>
      </MenuItem>
      <Divider style={{ margin: "0" }} />
      <MenuItem onClick={ScrollTop}>
        <div onClick={()=>setmenu(5)} style={{ textDecoration: "none" }}>
          <MenuContent>
            <BarsOutlined style={{ padding: "0 1rem" }} />
            교과과정
          </MenuContent>
        </div>
      </MenuItem>
      <Divider style={{ margin: "0" }} />
      <MenuItem onClick={ScrollTop}>
        <div onClick={()=>setmenu(6)} style={{ textDecoration: "none" }}>
          <MenuContent>
            <CalendarOutlined style={{ padding: "0 1rem" }} />
            학과공지
          </MenuContent>
        </div>
      </MenuItem>
      <Divider style={{ margin: "0" }} />
      <MenuItem onClick={ScrollTop}>
        <div onClick={()=>setmenu(7)} style={{ textDecoration: "none" }}>
          <MenuContent>
            <AuditOutlined style={{ padding: "0 1rem" }} />
            교수님 연구실
          </MenuContent>
        </div>
      </MenuItem>
      <Divider style={{ margin: "0" }} />
      <MenuItem onClick={ScrollTop}>
        <div onClick={()=>setmenu(8)} style={{ textDecoration: "none" }}>
          <MenuContent>
            <LayoutOutlined style={{ padding: "0 1rem" }} />
            강의실
          </MenuContent>
        </div>
      </MenuItem>
      <Divider style={{ margin: "0" }} />
      <MenuItem onClick={ScrollTop}>
        <div onClick={()=>setmenu(9)} style={{ textDecoration: "none" }}>
          <MenuContent>
            <MessageOutlined style={{ padding: "0 1rem" }} />
            자주 묻는 질문
          </MenuContent>
        </div>
      </MenuItem>
      { role === "2" ?(<MenuItem onClick={ScrollTop}>
        <div onClick={()=>setmenu(10)} style={{ textDecoration: "none" }}>
          <MenuContent>
            <LockOutlined style={{ padding: "0 1rem" }} />
            관리자페이지
          </MenuContent>
        </div>
      </MenuItem>):null}
    </MenuContainer>
  );
};

export default Menu;
