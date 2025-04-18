import React from 'react';

const Input = ({ icon: Icon, ...props }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon />
        </div>
        <input
            {...props}
            className="block w-full py-3 pl-10 pr-3 text-white border border-zinc-700 rounded-xl bg-zinc-800/50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
    </div>
);

export default Input;
