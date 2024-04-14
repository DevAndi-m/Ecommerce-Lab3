import React, { useEffect, useState } from 'react';
import '../css/Console.css';

function AdminCons() {
    const [noPara, setNoPara] = useState(0);

    useEffect(() => {
        
    }, [noPara]);

    const generateParagraphs = (num) => {
        const paragraphs = [];
        for (let index = 0; index < num; index++) {
            paragraphs.push(<p key={index} className='consoletext'>This is a user</p>);
        }
        return paragraphs;
    };

    return (
        <div className='cHolder'>
            {generateParagraphs(20)}
        </div>
    );
}

export default AdminCons;
