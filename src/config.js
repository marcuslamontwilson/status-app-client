const dev =  {
  MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-east-1",
      BUCKET: "status-app-2-api-dev-attachmentsbucket-sm4ctvq6s847"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://zi36kxisak.execute-api.us-east-1.amazonaws.com/dev"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_sV1cJ0t2v",
      APP_CLIENT_ID: "50ffstfonnfu1f41slhg2kg7d6",
      IDENTITY_POOL_ID: "us-east-1:54a91551-9501-4ffe-9c07-da18c0a8ec1b"
    }
  };

  const prod = {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-east-1",
      BUCKET: "status-app-2-api-prod-attachmentsbucket-wejx6mdb524e"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://zi36kxisak.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_YoUcT2jI1",
      APP_CLIENT_ID: "c8t7br4h4f77alnq9p8j44pje",
      IDENTITY_POOL_ID: "us-east-1:59a207a7-eedf-41fa-95ce-987e76cb0447"
    }
  };

  const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

  export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
  };