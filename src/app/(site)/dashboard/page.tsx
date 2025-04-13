import React from "react";
import { AreaComponent } from "@/components/myUi/charts/area-chart";
import { PieComponent } from "@/components/myUi/charts/pie-chart";
import { BarRow } from "@/components/myUi/charts/bar-row";
import { BarColumn } from "@/components/myUi/charts/bar-column";
const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5">
      <AreaComponent />
      <PieComponent />
      <div className="flex gap-4 flex-col lg:flex-row">
        <BarRow className="lg:w-1/2 w-full"/>
        <BarColumn className="lg:w-1/2 w-full"/>
      </div>
    </div>
  );
};

export default Dashboard;
