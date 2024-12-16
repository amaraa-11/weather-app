import React from "react";
import { CiHome, CiLocationOn, CiHeart, CiUser } from "react-icons/ci";

export function Searchinput({ search, onChangeText, onPressEnter }) {
  return (
    <div className="w-[520px] h-[80px] bg-[#ffffff] rounded-[48px] flex  items-center gap-[24px] z-30 ">
      <img className="opacity-20 ml-[24px]" src="searchlogo.png" />
      <input
        type="search"
        placeholder="Search city..."
        className="focus:outline-none border-none h-[60px] w-[350px]"
        value={search}
        onChange={onChangeText}
        onKeyDown={onPressEnter}
      ></input>
    </div>
  );
}
export function Circle({ size, top, left }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}px`,
        left: `${left}px`,
      }}
      className="border rounded-full border-[#ffffff] border-opacity-[8%] absolute z-20"
    ></div>
  );
}
export function CircleGray({ size, top, left }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}px`,
        left: `${left}px`,
      }}
      className="border rounded-full border-[#111827] border-opacity-[8%] absolute z-20"
    ></div>
  );
}
export function Square({ size, top, left }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}px`,
        left: `${left}px`,
      }}
      className="bg-[#0F141E] z-10 rounded-[36px] absolute"
    ></div>
  );
}
export function WhiteSquare({ size, top, left }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}px`,
        left: `${left}px`,
      }}
      className="bg-stone-50 absolute"
    ></div>
  );
}

export function MidCircle({ size, top, left }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}px`,
        left: `${left}px`,
      }}
      className="bg-stone-50 rounded-full absolute"
    ></div>
  );
}

export const Icons = ({ value }) => {
  const dayIcons = [
    { Icon: CiHome, label: "Home" },
    { Icon: CiLocationOn, label: "Location" },
    { Icon: CiHeart, label: "Heart" },
    { Icon: CiUser, label: "User" },
  ];

  const nightIcons = [
    { Icon: CiHome, label: "Home" },
    { Icon: CiLocationOn, label: "Location" },
    { Icon: CiHeart, label: "Heart" },
    { Icon: CiUser, label: "User" },
  ];

  const iconsToDisplay = value === "day" ? dayIcons : nightIcons;
  const hoverColor = value === "day" ? "hover:text-black" : "hover:text-white";

  return (
    <div className="flex space-x-16 text-3xl text-[#D1D5DB]">
      {iconsToDisplay.map((item, index) => (
        <item.Icon
          key={index}
          className={`${hoverColor} transition-all duration-300 ease-in-out`}
        />
      ))}
    </div>
  );
};
