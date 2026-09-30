import React, { useState } from "react";
import { useDashboard } from "../../context/DashboardContext";
import DetailDrawer from "../common/DetailDrawer/DetailDrawer";
import "./MasterData.css";

const masterData = [
  {
    id: "parties",
    title: "Registered Parties",
    count: 428,
    label: "Registered organisations",
    details: [
      { label: "Active", count: 391 },
      { label: "Inactive", count: 21 },
      { label: "Pending Verification", count: 16 },
    ],
  },
  {
    id: "trucks",
    title: "Registered Trucks",
    count: 1842,
    label: "Registered vehicles",
    details: [
      { label: "Active", count: 1624 },
      { label: "Inactive", count: 142 },
      { label: "Under Maintenance", count: 76 },
    ],
  },
  {
    id: "barges",
    title: "Registered Barges",
    count: 126,
    label: "Registered barges",
    details: [
      { label: "Active", count: 108 },
      { label: "Inactive", count: 12 },
      { label: "Under Maintenance", count: 6 },
    ],
  },
  {
    id: "locations",
    title: "Locations",
    count: 86,
    label: "Registered locations",
    details: [
      { label: "Active", count: 79 },
      { label: "Inactive", count: 7 },
    ],
  },
  {
    id: "weighbridges",
    title: "Weighbridges",
    count: 34,
    label: "Registered weighbridges",
    details: [
      { label: "Operational", count: 30 },
      { label: "Offline", count: 2 },
      { label: "Under Maintenance", count: 2 },
    ],
  },
  {
    id: "yards",
    title: "Yards",
    count: 52,
    label: "Registered yards",
    details: [
      { label: "Active", count: 46 },
      { label: "Inactive", count: 6 },
    ],
  },
  {
    id: "processing-units",
    title: "Processing Units",
    count: 41,
    label: "Registered units",
    details: [
      { label: "Operational", count: 36 },
      { label: "Inactive", count: 3 },
      { label: "Under Maintenance", count: 2 },
    ],
  },
  {
    id: "routes",
    title: "Routes",
    count: 138,
    label: "Registered routes",
    details: [
      { label: "Active", count: 124 },
      { label: "Inactive", count: 14 },
    ],
  },
];

function MasterData() {
  const { roleConfig } = useDashboard();
  const [selectedItem, setSelectedItem] = useState(null);

  const visibleMasterData = masterData.filter((item) => {
    if (item.id === "parties") return roleConfig.masterData.parties;
    if (item.id === "weighbridges") return roleConfig.masterData.weighbridges;
    return roleConfig.masterData[item.id] !== false;
  });

  return (
    <section className="master-data-section">
      <div className="section-header">
        <div>
          <h2>Master Data</h2>
          <p>Registered entities and operational resources</p>
        </div>
      </div>

      <div className="master-data-grid">
        {visibleMasterData.map((item) => (
          <div className="master-card" key={item.id}>
            <div className="master-card-content">
              <span className="master-card-title">{item.title}</span>

              <span className="master-card-count">
                {item.count.toLocaleString()}
              </span>

              <span className="master-card-label">{item.label}</span>
            </div>

            <button
              className="master-arrow"
              onClick={() => setSelectedItem(item)}
              aria-label={`View ${item.title} details`}
            >
              ↗
            </button>
          </div>
        ))}
      </div>

      {selectedItem && (
        <DetailDrawer
          open
          onClose={() => setSelectedItem(null)}
          eyebrow="Master Data"
          title={selectedItem.title}
          description={selectedItem.label}
        >
          <div className="master-modal">
            <div className="master-modal-header">
              <div>
                <span className="modal-eyebrow">Master Data</span>

                <h3>{selectedItem.title}</h3>

                <p>{selectedItem.label}</p>
              </div>

              <button
                className="master-modal-close"
                onClick={() => setSelectedItem(null)}
              >
                ×
              </button>
            </div>

            <div className="master-detail-list">
              {selectedItem.details.map((detail) => {
                const percentage = (detail.count / selectedItem.count) * 100;

                return (
                  <div className="master-detail-item" key={detail.label}>
                    <div className="master-detail-top">
                      <span>{detail.label}</span>

                      <div>
                        <strong>{detail.count.toLocaleString()}</strong>

                        <small>{percentage.toFixed(0)}%</small>
                      </div>
                    </div>

                    <div className="master-progress">
                      <div
                        className="master-progress-fill"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="master-modal-footer">
              <span>Total Registered</span>

              <strong>{selectedItem.count.toLocaleString()}</strong>
            </div>
          </div>
        </DetailDrawer>
      )}
    </section>
  );
}

export default MasterData;
