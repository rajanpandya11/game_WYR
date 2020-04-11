import React from "react";
import { Link } from 'react-router-dom'
import {Menu} from 'semantic-ui-react';

export default function (){

    return <Menu>
            <Menu.Item as={Link} to="/" exact>
              Home
            </Menu.Item>
          </Menu>
}
