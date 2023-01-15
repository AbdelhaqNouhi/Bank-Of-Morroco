import React from 'react'
import StudentsImg from '../assets/images/img/Student.jpg'
import { Link, NavLink } from "react-router-dom";
import Select from "react-select";
import { useState, useRef } from "react";

const StudentPage = () => {
    const fullname = localStorage.getItem("lastName") + " " + localStorage.getItem("firstName");

    const options = [
        { value: 'Agadir', label: 'Agadir' },
        { value: 'Casablanca', label: 'Casablanca' },
        { value: 'Fes', label: 'Fes' },
        { value: 'Marrakech', label: 'Marrakech' },
        { value: 'Rabat', label: 'Rabat' },
        { value: 'Tanger', label: 'Tanger' },
        { value: 'Tetouan', label: 'Tetouan' },
        { value: 'Oujda', label: 'Oujda' },
        { value: 'Kenitra', label: 'Kenitra' },
        { value: 'Safi', label: 'Safi' },
        { value: 'Meknes', label: 'Meknes' },
        { value: 'El Jadida', label: 'El Jadida' },
        { value: 'Nador', label: 'Nador' },
        { value: 'Khouribga', label: 'Khouribga' },
        { value: 'Taza', label: 'Taza' },
    ];

    const [Type, setType] = useState("Student");
    const [Agency, setAgency] = useState("");
    const [Maker, setMaker] = useState(localStorage.getItem("user_id"));

    const SetAccount = async (e) => {
        e.preventDefault();
        const Account = { Type, Agency, Maker };
        
        await fetch("http://localhost:3000/Api/CreateAccount", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(Account)
        })
        .then((res) => res.json())
        .then((data) => {
            if(data){
                console.log(data);
            } else {
                console.log(err.message);
            }
        })
    };

    return (
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <div className='flex flex-col gap-10 py-28 px-24'>
                    <h1 className='text-blue-500 text-6xl font-bold'> Student</h1>
                    <p className='text-xl'>With the Mozaïc package dedicated to students, <br/> take advantage of a 100% young and free offer. <br/> Open your account and enjoy a unique experience.</p>
                </div>
                <div className='w-2/4 rounded-bl-3xl rounded-br-3xl'>
                    <img className='rounded-bl-full' src={ StudentsImg } alt="" />
                </div>
            </div>
            <div>
                <div className="min-h-screen flex justify-center items-center">
                    <div className="md:w-3/4 w-screen md:px-16 flex rounded-2xl shadow-lg max-w-3/1 items-center p-4">
                        <div className="md:w-4/5 w-screen px-16 flex flex-col gap-8">
                            <div>
                                <h2 className="font-bold text-2xl text-blue-500"> Open Your Student Account</h2>
                                <p className="text-sm mt-4">
                                    And enjoy a unique experience.
                                </p>
                            </div>
                            <div className='font-bold text-blue-500 border-b-2 border-blue-500'>
                                {fullname}
                            </div>
                            <form onSubmit={SetAccount} className="flex flex-col gap-2">
                                <div className='mt-6 flex flex-col gap-4'>
                                    <label className='font-bold'>Your Account Type*</label>
                                    <input
                                        type="text"
                                        name="type"
                                        className="w-full p-2 rounded-xl border"
                                        value={Type}
                                        onChange={(e) => Type(e.target.value)}
                                        
                                    />
                                </div>
                                <div className='mt-8 flex flex-col gap-4'>
                                    <label className='font-bold '>Agency Selection*</label>
                                    <Select
                                        className="w-full rounded-xl"
                                        options={options}
                                        defaultOptions={options}
                                        isClearable={true}
                                        isSearchable={true}
                                        placeholder="Select Agency"
                                        value={Agency.value}
                                        onChange={(e) => setAgency(e.value)}
                                    />
                                </div>
                                <button className="hover:scale-105 duration-300 bg-blue-500 text-white rounded-md py-2 mt-4">
                                    Validate
                                </button>
                            </form>
                            <p className="mt-5 text-xs border-b border-gray-400 py-4"></p>
                            <div className="mt-3 text-xs flex justify-between items-center">
                                <p >Go To..</p>
                                <Link to="/SignIn"><button className="hover:scale-105 duration-300 py-2 px-5 bg-white hover:text-black border rounded-xl"> Profile </button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentPage;