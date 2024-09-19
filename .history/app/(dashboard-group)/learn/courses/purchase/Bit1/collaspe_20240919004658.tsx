"use client";
import Image from 'next/image';
import { useState } from 'react';
import TopicsComp from './TopicsComp';

function Course() {


    return (
        <div className="relative flex flex-col items-center">
            {/* Dropdown toggle button */}


            <div>
                <TopicsComp />
            </div>

        </div>
    );
}

export default Course;
