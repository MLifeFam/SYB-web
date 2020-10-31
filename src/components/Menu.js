import React , { Component } from 'react';
import { Link, Route, useHistory, Switch, BrowserRouter as Router } from "react-router-dom"
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
} from '@ant-design/icons';
import {Divider} from 'antd';
import styled from 'styled-components';
import oc from 'open-color';

const MenuContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-Items:center;
    padding-top:2rem;
`;

const MenuContent = styled.div`
    color:${oc.gray[7]};
    width:11rem;                    // 클릭 박스 조정
    height:100%;
    padding:1rem 0;
    font-weight:bold;
`;

const MenuItem = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  height:3rem;
  width:100%;
  border-radius:5px;
  transition: all 0.2s;
  &:hover {
    background: ${oc.gray[3]};
    cursor: pointer;
    font-size:1rem;
  }

`;



const Menu = () => {
    let history = useHistory();
    const ScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
     };
     
        return(
            <MenuContainer>
                <MenuItem onClick={ScrollTop}>
                    <Link to="/main" style={{textDecoration: 'none'}}>
                            <MenuContent>
                            <NotificationOutlined style={{padding:"0 1rem"}} />
                                공지사항
                            </MenuContent>
                    </Link>
                </MenuItem>
                <Divider style={{margin:"0"}}/>
                <MenuItem onClick={ScrollTop}>
                    <Link to="/question" style={{textDecoration: 'none'}}>
                            <MenuContent>
                            <BulbOutlined style={{padding:"0 1rem"}} />
                                질문 추가 및 수정
                            </MenuContent>
                    </Link>
                </MenuItem>
                <Divider style={{margin:"0"}}/>
                <MenuItem onClick={ScrollTop}>
                    <Link to="/status" style={{textDecoration: 'none'}}>
                            <MenuContent>
                            <ClockCircleOutlined style={{padding:"0 1rem"}}/>
                                학과 사무실
                            </MenuContent>
                    </Link>
                </MenuItem>
                <Divider style={{margin:"0"}}/>
                <MenuItem onClick={ScrollTop}>
                    <Link to="/curriculum" style={{textDecoration: 'none'}}>
                            <MenuContent>
                            <BarsOutlined style={{padding:"0 1rem"}}/>
                                교과과정
                            </MenuContent>
                    </Link>
                </MenuItem>
                <Divider style={{margin:"0"}}/>
                <MenuItem onClick={ScrollTop}>
                    <Link to="/notice" style={{textDecoration: 'none'}}>
                            <MenuContent >
                            <CalendarOutlined style={{padding:"0 1rem"}}/>
                                학과공지
                            </MenuContent>
                    </Link>
                </MenuItem >
                <Divider style={{margin:"0"}}/>
                <MenuItem onClick={ScrollTop}>
                    <Link to="/professor" style={{textDecoration: 'none'}}>
                            <MenuContent>
                            <AuditOutlined style={{padding:"0 1rem"}}/>
                                교수님 연구실
                            </MenuContent>
                    </Link>
                </MenuItem>
                <Divider style={{margin:"0"}}/>
                <MenuItem onClick={ScrollTop}>
                    <Link to="/timetable" style={{textDecoration: 'none'}}>
                            <MenuContent>
                            <LayoutOutlined style={{padding:"0 1rem"}}/>
                                강의실
                            </MenuContent>
                    </Link>
                </MenuItem>
                <Divider style={{margin:"0"}}/>
                <MenuItem onClick={ScrollTop}>
                    <Link to="/bestqa" style={{textDecoration: 'none'}}>
                            <MenuContent>
                            <MessageOutlined style={{padding:"0 1rem"}}/>
                                자주 묻는 질문
                            </MenuContent>
                    </Link>
                </MenuItem>
                <Divider style={{margin:"0"}}/>
            </MenuContainer>
        );
    }

export default Menu;
