import React , { Component } from 'react';
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { 
    NotificationOutlined,
    LoadingOutlined,
    CalendarOutlined,
    BarsOutlined,
    AuditOutlined,
    LayoutOutlined,
    MessageOutlined,
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
    font-weight:bold;
`;

const MenuItem = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  height:3rem;
  width:100%;
  border-radius:5px;
  &:hover {
    background: ${oc.gray[3]};
    cursor: pointer;
    font-size:1rem;
  }
`;

class Menu extends Component{
    render(){
        return(
            <MenuContainer>
                <MenuItem>
                    <Link to="/main" style={{textDecoration: 'none'}}>
                            <MenuContent>
                            <NotificationOutlined style={{padding:"0 1rem"}} />
                                공지사항
                            </MenuContent>
                    </Link>
                </MenuItem>
                <Divider style={{margin:"0"}}/>
                <MenuItem>
                    <Link to="/status" style={{textDecoration: 'none'}}>
                            <MenuContent>
                            <LoadingOutlined style={{padding:"0 1rem"}}/>
                                조교 부재여부
                            </MenuContent>
                    </Link>
                </MenuItem>
                <Divider style={{margin:"0"}}/>
                <MenuItem>
                    <Link to="/curriculum" style={{textDecoration: 'none'}}>
                            <MenuContent>
                            <BarsOutlined style={{padding:"0 1rem"}}/>
                                교과과정
                            </MenuContent>
                    </Link>
                </MenuItem>
                <Divider style={{margin:"0"}}/>
                <MenuItem>
                    <Link to="/notice" style={{textDecoration: 'none'}}>
                            <MenuContent >
                            <CalendarOutlined style={{padding:"0 1rem"}}/>
                                학과공지
                            </MenuContent>
                    </Link>
                </MenuItem>
                <Divider style={{margin:"0"}}/>
                <MenuItem>
                    <Link to="/professor" style={{textDecoration: 'none'}}>
                            <MenuContent>
                            <AuditOutlined style={{padding:"0 1rem"}}/>
                                교수님 연구실
                            </MenuContent>
                    </Link>
                </MenuItem>
                <Divider style={{margin:"0"}}/>
                <MenuItem>
                    <Link to="/timetable" style={{textDecoration: 'none'}}>
                            <MenuContent>
                            <LayoutOutlined style={{padding:"0 1rem"}}/>
                                강의실
                            </MenuContent>
                    </Link>
                </MenuItem>
                <Divider style={{margin:"0"}}/>
                <MenuItem>
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
  }

export default Menu;
