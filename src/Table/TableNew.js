import React from 'react';

export default props => (
    <div className='container p-2 text-left'>
        <p>найдено: {props.data.length}  в новой базе</p>

        {props.data.map(item => (

            <p key={item[0]} className='border'>

                <span className="bg-success">{item[1].replace(/&quot;/gi, '.')}{' '}</span><br></br>
                {item[2]}{' '}<br></br>
                {item[3]}{' от '}
                {item[4].replace(/&quot;/gi, '.')}{', '}
                {item[5].replace(/&quot;/gi, '.')}<br></br>
                   вся длина {item[6]}м.{' '}искал {item[8]?item[8]:'неизвестно'}<br></br>
                {item[7] ? <a href={`https://maps.google.com/?hl=ru&q=${item[7]}`}>координаты места </a> : null}<br></br>
                {item[9] ? <a href={`https://ilgiz.h1n.ru/${item[9]}`}>фото места</a> : null}<br></br>
                {item[10] ? <a href={`https://ilgiz.h1n.ru/${item[10]}`}>фото места</a> : null}<br></br>
                {item[11] ? <a href={`https://ilgiz.h1n.ru/${item[11]}`}>фото места</a> : null}<br></br>

            </p>
        ))}
    </div>
)

