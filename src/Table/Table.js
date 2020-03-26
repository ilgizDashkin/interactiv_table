import React from 'react';

export default props => (
    <div className='container p-2 border'>
        <p>найдено: {props.data.length}, в среднем длина КЛ: {props.lenght?props.lenght:'неизвестно'} м.</p>
    <table className="table text-white">
        <thead>
            <tr>
               
                <th onClick={props.onSort.bind(null, 'name')}>
                    имя {props.sortField === 'name' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'zamer')}>
                    м. {props.sortField === 'zamer' ? <small>{props.sort}</small> : null}
                </th>
                <th>
                    место повреждения 
                </th>
               
            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
              
              <tr key={item.id}>
                    
                    <td className="bg-success">{item.name.toLowerCase()}</td>
                    <td className="bg-info">{((item.zamer===10000)||(item.zamer===0))?'-':item.zamer}</td>
                    <td>{item.priv}</td>                   
                    
                </tr>
            ))}
        </tbody>
    </table>
    </div>
)

