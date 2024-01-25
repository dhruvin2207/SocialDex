import React from 'react';

const Posts = ({ children }) => {
    return (
        <section className='max-w-screen-2xl min-h-screen flex flex-col items-center pt-3'> {/* Added padding-top */}
            <div className='w-full grid grid-cols-1 px-3 gap-4'>
                {children}
            </div>
        </section>
    );
}

export default Posts;
