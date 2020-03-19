import React from 'react';

export default ({ person }) => (
    <div>
        <p>Выбран  <b>{person.name + ' ' + person.priv}</b></p>
      
    </div>
)