import React from "react";
import ImageUpload from "./_components/ImageUpload";

function Dashboard() {
  return (
    <div className="xl:px-16 px-5 py-10">
      <h2 className="font-bold text-4xl">Bring Your Design to Life</h2>
      <ImageUpload />
    </div>
  );
}

export default Dashboard;
