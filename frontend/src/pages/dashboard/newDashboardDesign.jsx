import React from "react";
import Cards from "./cards";
import StatsGraph from "./userStats";
import Polarchart from "./polarchart";
import Sales from "./sales";
import TaskManager from "./taskmanager";

const newDashboardDesign = () => {
  return (
    <div>
      {" "}
      <div className="dashboard-main-body">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 className="fw-semibold mb-0">Dashboard</h6>
          <ul className="d-flex align-items-center gap-2">
            <li className="fw-medium">
              <a
                href="index.html"
                className="d-flex align-items-center gap-1 hover-text-primary"
              >
                <iconify-icon
                  icon="solar:home-smile-angle-outline"
                  className="icon text-lg"
                ></iconify-icon>
                Dashboard
              </a>
            </li>
            <li>-</li>
            <li className="fw-medium">Investment</li>
          </ul>
        </div>

        <div className="row gy-4">
          <Cards></Cards>

          <div className="col-xxl-8">
            <div className="card h-100 radius-8 border-0">
              <div className="card-body p-24">
                <StatsGraph></StatsGraph>
              </div>
            </div>
          </div>
          {/* <!-- Revenue Statistics End -->

        <!-- Statistics Start --> */}
          <div className="col-xxl-4">
            <div className="card h-100 radius-8 border-0">
              <div className="card-body p-24">
                <h6 className="mb-2 fw-bold text-lg">Statistic</h6>
                <Polarchart></Polarchart>
              </div>
            </div>
          </div>
          {/* <!-- Statistics End -->

        <!-- Most Location Start --> */}
          <div className="col-xxl-4">
            <TaskManager></TaskManager>
          </div>
          {/* <!-- Most Location End -->

   

        <!-- Latest Investments Start --> */}
          <div className="col-xxl-8">
            <div className="card h-100">
              <div className="card-body p-24">
                <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20">
                  <h6 className="mb-2 fw-bold text-lg mb-0">Latest Sales</h6>
                </div>
                <Sales></Sales>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default newDashboardDesign;
