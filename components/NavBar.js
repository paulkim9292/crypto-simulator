import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <header className="relative bg-white w-screen px-96">
      <div className="flex items-center justify-between py-5">
        <div className="flex justify-start">
          <div className="text-base font-medium pr-4">
            <Link href="/">거래소</Link>
          </div>
          <div className="text-base font-medium">
            <Link href="/test">투자내역</Link>
          </div>
        </div>
        <div className="hidden items-center justify-end">
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
    </header>
  );
};

export default NavBar;
