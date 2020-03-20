import React from 'react';

export default props => (
    <div className='container p-2'>
        <p>длина КЛ {props.lenght} м.</p>
    <table className="table text-white">
        <thead>
            <tr>
                {/* <th onClick={props.onSort.bind(null, 'id')}>
                    ID {props.sortField === 'id' ? <small>{props.sort}</small> : null}
                </th> */}
                <th onClick={props.onSort.bind(null, 'name')}>
                    имя {props.sortField === 'name' ? <small>{props.sort}</small> : null}
                </th>
                <th onClick={props.onSort.bind(null, 'zamer')}>
                    замер {props.sortField === 'zamer' ? <small>{props.sort}</small> : null}
                </th>
                <th>
                    место повреждения 
                </th>
                {/* <th onClick={props.onSort.bind(null, 'lastName')}>
                    дата {props.sortField === 'lastName' ? <small>{props.sort}</small> : null}
                </th> */}
            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
              
              <tr key={item.id} onClick={props.onRowSelect.bind(null, item)}>
                    {/* <td>{item.id}</td> */}
                    <td className="bg-success">{item.name}</td>
                    <td>{item.zamer}</td>
                    <td>{item.priv}</td>                   
                    {/* <td>{item.date}</td> */}
                </tr>
            ))}
        </tbody>
    </table>
    </div>
)

