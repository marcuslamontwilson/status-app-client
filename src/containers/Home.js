import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { API, /*Auth*/ } from "aws-amplify";
import "./Home.css";

export default function Home(props) {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const AWS = require("aws-sdk");
  let group = [];
  let groups = [];
  let groupName =[];
  


  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({

    region: 'us-east-1',
    credentials: {
      accessKeyId: 'AKIAJMUCAALBIX7B2YFQ',
      secretAccessKey: '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'
    }

  });

  var params = {

    UserPoolId: 'us-east-1_EYUw5LR84'
  }

 
function getGroups() {
  cognitoidentityserviceprovider.listGroups(params, function(err, data) {
    var response = JSON.stringify(data);
    var list = JSON.parse(response);
    var tmp = null;
    
      tmp = list.Groups[2].GroupName;
     // console.log(tmp);
      group.push(tmp);
      console.log(group[0]);
      groups = group.map((element) => {
        return element;
      })
      //console.log(groups[0]);
      
     
   
    }
    
  )
  console.log(groups);
}




/* Auth.currentAuthenticatedUser().then(function(response) {
      var output = JSON.stringify(response);
      var dis = JSON.parse(output);
      var real = (dis.username).toString();
    

    var params = {

      UserPoolId: 'us-east-1_EYUw5LR84', 
      Username: real
    }
  
    cognitoidentityserviceprovider.adminListGroupsForUser(params, function(err, data) {
  
      var result = JSON.stringify(data);
      var json = JSON.parse(result);
  
      var groupName = (json.Groups[0].GroupName);

      return(
        <h1>
          {'Group: ' + groupName }
        </h1>
      );
  
    })
  }

) */

  /* var params = {

    UserPoolId: 'us-east-1_EYUw5LR84', 
    Username: ''
  }

  cognitoidentityserviceprovider.adminListGroupsForUser(params, function(err, data) {

    var result = JSON.stringify(data);
    var json = JSON.parse(result);

    var groupName = (json.Groups[0].GroupName);

  }); */



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
        <LinkContainer key={report.reportID} to={`/reports/${report.reportID}`}>
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
      { getGroups() }
     
    </div>
  );
  
  
}
