"use client";
import "../home-custom.css";
import React from "react";


export default function PsMenuBar() {
  return (
    <nav className="ps-menu-bar-simple">
      <ul className="ps-menu-list-simple">
        <li><a href="/home/8ps/prepare">Prepare</a></li>
        <li><a href="/home/8ps/pray">Pray</a></li>
        <li><a href="/home/8ps/perform">Perform</a></li>
        <li><a href="/home/8ps/pledge">Pledge</a></li>
        <li><a href="/home/8ps/perfect">Perfect</a></li>
        <li><a href="/home/8ps/perceive">Perceive</a></li>
        <li><a href="/home/8ps/purchase">Purchase</a></li>
        <li><a href="/home/8ps/participate">Participate</a></li>
      </ul>
    </nav>
  );
}
