import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="relative bg-white mx-auto max-w-7xl px-4 sm:px-6">
      <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link
            href="/"
            className="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            거래소
          </Link>
          <Link
            href="/test"
            className="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            투자내역
          </Link>
        </div>
        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          <a
            href="#"
            className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            회원가입
          </a>
          <a
            href="#"
            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            로그인
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
