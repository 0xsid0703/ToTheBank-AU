/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";

const DropDown = ({btnStr, data}) => {
    
    const [selected, setSelected] = useState (false)
    const [width, setWidth] = useState (105)

    const wrapperRef = useRef(null);

    const handleClickOutside = (event) => {
        try {
            if (wrapperRef && !wrapperRef.current.contains(event.target)) {
                setSelected(false);
            }
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    useEffect(() => {
        setWidth (wrapperRef.current.offsetWidth)
      }, [wrapperRef.current]);

    return (
        <div className="w-full">
            <button
                id="dropdownButton"
                data-dropdown-toggle="dropdown"
                className='text-black-2 w-full bg-white border border-grey-1 font-medium rounded-md text-sm px-4 tracking-wide text-center inline-flex items-center justify-between leading-8'
                type="button"
                onClick={() => {
                    setSelected(!selected);
                }}
                ref={wrapperRef}
            >
                {btnStr}
                <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="#6F6E84"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            <div
                id="dropdown"
                className={
                    selected
                        ? `z-20 bg-v3-primary border absolute border-primary divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 mt-[8px] overflow-y-auto`
                        : `hidden`
                }
                style={{ width: `${width}px` }}
            >
                <ul
                    className={`py-2 text-sm text-v3-primary font-medium dark:text-gray-200`}
                    aria-labelledby="dropdownButton"
                >
                    {data.map((item, idx) => {
                        <li key={idx}>
                            <a
                                className="flex flex-row items-center px-4 py-2 hover:bg-dropdown dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                            >
                                {item}
                            </a>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default DropDown