import React , { Component } from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Font = styled.div`
    font-size : 5rem;
    letter-spacing:3px;
    color: #a31432;
    font-family:'Rajdhani';
`;

const CenterPos = styled.div`
    display:flex;
    flex-direction:column;
    position:absolute;
    min-width:800px;
    min-height:500px;
    width:80%;
    height:80%;
    justify-content:center;
    align-items:center;
    overflow:hidden;
`;

class Welcome extends Component{
    render(){
        return(
            <CenterPos>
                <Font>
                    SYB ADMIN SITE. <br/>
                    (공지사항)
                </Font>
            </CenterPos> 
        );
    }
  }

export default Welcome;
