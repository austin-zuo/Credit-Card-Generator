import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Validation from './Validation.js';
import Generation from './Generation.js'
import classnames from 'classnames';

const Homepage = (props) => {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="LoanPage">
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                        >
                        Credit Card Generator
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                    Credit Card Validator
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={activeTab} style={{paddingTop:'20px'}}>
                <TabPane tabId="1">
                    <Generation></Generation>
                </TabPane>
                <TabPane tabId="2">
                    <Validation></Validation>
                </TabPane>
            </TabContent>

        </div>
    )
}

export default Homepage