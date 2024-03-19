"use client";
import requireType from '../components/requireType';

function Councillor() {
  return (
    <div className="m-2 justify-center">
      <h1 className="text-center">Hello Councillor</h1>
    </div>
    );
}

export default requireType(Councillor, 'councillor');
