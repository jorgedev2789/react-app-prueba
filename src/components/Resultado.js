import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Radio, Table } from "antd";

const FormItem = Form.Item;

export const Resultado = ({ result }) => {

    const showHeader = true;

    const [grid, setGrid] = useState({
        dataRecords: {data:[],columns:[]},
        tableConfiguration: {
            bordered: true,
            loading: false,
            pagination: true,
            size: "small",
            showHeader,
            scroll: undefined,
        },
    });

    useEffect(() => {
        
        if( result.data?.length ){
            setGrid({...grid, dataRecords:result})
        }
    },[result])

    const changeValorAcceso = (newValue, oldValue) => {
        const clone = { ...grid }
        clone.dataRecords.data = clone.dataRecords.data.map(e => ( {...e, status:false, valor_acceso:newValue} ))
        setGrid(prevState => ({ ...prevState,  clone }))
    }

    const handleUpdate = () => {

    }
    
    const cols = grid.dataRecords.columns;
    const lastIndex = cols?.length - 1;
    let columns = [];
    let i = 0;
    for (const property in cols) {
        if(cols[property] === 'valor_acceso'){
            columns.push({
                title: cols[property],
                key: cols[property],
                dataIndex:cols[property],
                render: (text, record) => (
                    <span>
                        <Input
                            type="text"
                            value={record.valor_acceso}
                            onChange={(e) => changeValorAcceso(e.target.value, record.valor_acceso)}
                            style={{ width: 100 }}
                        />
                    </span>
                ),
            })
        }else{
            columns.push({ title:cols[property], dataIndex:cols[property], key: cols[property] })
        }

        if (lastIndex === i) {
            columns.push({
                title: "Action",
                key: "action",
                render: (text, record) => (
                    <span>
                        <a onClick={() => handleUpdate(record)} disabled={ record.status }>Actualizar</a>
                    </span>
                ),
            })
        }
        i++;
    }

    const data = grid.dataRecords.data;

    if(data.length === 0){
        return <></>
    }

    return (
        <>
            <Table
                rowKey={(record) => record.origen_acceso_id}
                {...grid.tableConfiguration}
                columns={columns}
                dataSource={data}
            />
        </>
    );
};
