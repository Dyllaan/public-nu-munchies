"use client";
import React from 'react';
import requireMod from '../components/moderator/requireMod';
import SearchUsers from '../components/moderator/SearchUsers';

function Moderator() {

  return (
    <div className="m-2">
      <h1>Moderator</h1>
      <SearchUsers />
    </div>
    );
}

export default requireMod(Moderator);
