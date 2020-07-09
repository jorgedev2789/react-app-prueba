import React, { useState } from "react";
import { Form, Input, InputNumber, Button } from "antd";
import axios from "axios";

import { Listar } from "./Listar";

const FormItem = Form.Item;

export const Filtrar = () => {
    const [form, setForm] = useState({
        formLayout: "horizontal",
        searchUser: {
            user: "",
            token: "",
            userID: "",
        },
    });

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
            searchUser: {
                user: e.target.value,
                token: form.searchUser.token,
                userID: form.searchUser.userID,
            },
        });
    };

    const changeToken = (e) => {
        setForm({
            ...form,
            searchUser: {
                token: e,
                user: form.searchUser.user,
                userID: form.searchUser.userID,
            },
        });
    };

    const changeUserId = (e) => {
        const isInteger = /^[0-9]+$/;
        if (isInteger.test(e)) {
            setForm({
                ...form,
                searchUser: {
                    userID: e,
                    user: form.searchUser.user,
                    token: form.searchUser.token,
                },
            });
        }
    };

    const handleFilter = () => {
        console.log("filter");
    };

    return (
        <>
            <Form {...layoutProps}>
                <FormItem label="Form Layout"></FormItem>
                <FormItem label="Usuario" {...formItemLayout}>
                    <Input
                        type="text"
                        value={form.searchUser.user}
                        placeholder="Usuario"
                        onChange={changeName}
                        style={{ width: 250 }}
                    />
                </FormItem>
                <FormItem label="Token" {...formItemLayout}>
                    <InputNumber
                        value={form.searchUser.token}
                        placeholder="Token"
                        onChange={changeToken}
                        style={{ width: 250 }}
                    />
                </FormItem>
                <FormItem label="Usuario ID" {...formItemLayout}>
                    <InputNumber
                        value={form.searchUser.userID}
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
            <Listar />
        </>
    );
};
