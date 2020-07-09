import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Radio, Table } from "antd";
import axios from "axios";

const FormItem = Form.Item;

export const Listar = ({props}) => {

    const showHeader = true;

    const [grid, setGrid] = useState({
        userRecords: [],
        tableConfiguration: {
            bordered: true,
            loading: false,
            pagination: true,
            size: "small",
            showHeader,
            scroll: undefined
        }
    });
    
    const fetchUser = () => {
        axios
          .post("https://www.crmetric.com/srv-crmetric-web-cdc-test/rest/usuario/listarOrigenAcceso",  {
            "Sess": {
                "User": "xchohermenegildo",
                "Token": "11.8839813279919",
                "usuario_id": 30
                }
          })
          .then(response => {
            console.log(response.data);
            /*
            this.setState({
              userRecords: response.data,
              tableConfiguration: { loading: false }
            });*/
          })
          .catch(err => {
            console.log("Network " + err);
          });
      }

      fetchUser()

    const columns = [
        {
          title: "Id",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          render: text => <strong>{text}</strong>
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age"
        },
        {
          title: "Action",
          key: "action",
          render: (text, record) => (
            <span>
              <a onClick={() => this.handleUpdateUser(record)}>Edit</a>
              <span className="ant-divider" />
              <a onClick={() => this.handleDeleteUser(record)}>Delete</a>
            </span>
          )
        }
      ];
    
      const data = grid.userRecords;

    return(
        <>
           <Table
            rowKey={record => record.id}
            {...grid.tableConfiguration}
            columns={columns}
            dataSource={data}
            /> 
        </>
    );

}
