import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API, /*Auth*/ } from "aws-amplify";
import "./Home.css";

export default function Home(props) {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        const reports = await loadReports();
        setReports(reports);
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [props.isAuthenticated]);
  
  function loadReports() {
    return API.get("reports", "/reports");
  }

  function renderReportsList(reports) {
    return [{}].concat(reports).map((report, i) =>
      i !== 0 ? (
        <LinkContainer key={report.reportId} to={`/reports/${report.reportId}`}>
          <ListGroupItem header={report.content.trim().split("\n")[0]}>
            {"Created: " + new Date(report.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/reports/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new report 
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
      
    );
    
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>CIS 4935</h1>
        <p>Welcome to the SQLegend's Status Update Reporting System</p>
      </div>
    );

  }

  function renderReports() {
    return (
      <div className = "reports">
        <PageHeader>Your Reports</PageHeader>
        <ListGroup>
          {!isLoading && renderReportsList(reports) }
        </ListGroup>
      </div>
    );
    
  }

  return (
    <div className="Home">
      { props.isAuthenticated ? renderReports() : renderLander() }
    </div>
  );
  
  
}
