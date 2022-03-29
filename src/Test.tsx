import React from 'react';

type TestType = {
    test: () => void
}


const Test = ({test}: TestType) => {
    return (
        <div onClick={test}>
            что то тут
        </div>
    );
};

export default Test;