import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import axios from "axios";

import { Resultado } from "./Resultado";

const FormItem = Form.Item;

export const Filtrar = () => {
    
    const [form, setForm] = useState({
        formLayout: "horizontal",
        searchData: {
            user: "",
            token: "",
            userID: "",
        },
    });
    
    const [result, setResult] = useState([]);

    const { formLayout } = form;

    const formItemLayout =
        formLayout === "horizontal"
            ? {
                  labelCol: { span: 4 },
                  wrapperCol: { span: 14 },
              }
            : null;
    const buttonItemLayout =
        formLayout === "horizontal"
            ? {
                  wrapperCol: { span: 4, offset: 4 },
              }
            : null;
    const layoutProps = { [formLayout]: "true" };

    const changeName = (e) => {
        setForm({
            ...form,
            searchData: {
                user: e.target.value,
                token: form.searchData.token,
                userID: form.searchData.userID,
            },
        });
    };

    const changeToken = (e) => {
        setForm({
            ...form,
            searchData: {
                token: e,
                user: form.searchData.user,
                userID: form.searchData.userID,
            },
        });
    };

    const changeUserId = (e) => {
        const isInteger = /^[0-9]+$/;
        if (isInteger.test(e)) {
            setForm({
                ...form,
                searchData: {
                    userID: e,
                    user: form.searchData.user,
                    token: form.searchData.token,
                },
            });
        }
    };

    const handleFilter = () => {
        
        axios
        .post(
            "https://www.crmetric.com/srv-crmetric-web-cdc-test/rest/usuario/listarOrigenAcceso",
            {
                Sess: {
                    User: "xchohermenegildo",
                    Token: "11.8839813279919",
                    usuario_id: 30,
                },
            }
        )
        .then((response) => {
            //Construye columnas y data
            const data = response.data.data[0].origen_acceso.map(e => ( { ...e, status:true}  ));
            const cols = Object.keys( data[0] )
            
            setResult({data:data, columns:cols})
        })
        .catch((err) => {
            console.log("Network " + err);
        });
        
    };

    //console.log(result)

    return (
        <>
            <Form {...layoutProps}>
                <FormItem label="Form Layout"></FormItem>
                <FormItem label="Usuario" {...formItemLayout}>
                    <Input
                        type="text"
                        value={form.searchData.user}
                        placeholder="Usuario"
                        onChange={changeName}
                        style={{ width: 250 }}
                    />
                </FormItem>
                <FormItem label="Token" {...formItemLayout}>
                    <InputNumber
                        value={form.searchData.token}
                        placeholder="Token"
                        onChange={changeToken}
                        style={{ width: 250 }}
                    />
                </FormItem>
                <FormItem label="Usuario ID" {...formItemLayout}>
                    <InputNumber
                        value={form.searchData.userID}
                        placeholder="Usuario ID"
                        onChange={changeUserId}
                        style={{ width: 250 }}
                    />
                </FormItem>
                <FormItem {...buttonItemLayout}>
                    <Button
                        type="primary"
                        size="default"
                        onClick={handleFilter}
                    >
                        Buscar
                    </Button>
                </FormItem>
            </Form>
            <Resultado result={result} />
        </>
    );
};
