import styled from "styled-components";
import { HttpsOutlined } from "@mui/icons-material";
import Button from "../../../../common/Button";
import SectionInfo from "../../../../common/SectionInfo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../setup/auth/useAuth";
import { useEffect } from "react";
import { useUser } from "../../../../setup/auth/useAuth";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../../../common/Loading";

const ChangeProfile = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <>
        <h1>Change Password</h1>
        <SectionInfo
          value={`The information on this page will be displayed on your
        public profile, which is visible to other users.`}
          text={"Your password will always remain private."}
          icon={<HttpsOutlined />}
        />
        <div className="control">
          <Button
            onClick={() => navigate("/account/forgot-password-reset")}
            style={{ width: "190px", height: "50px" }}
            value={"RESET PASSWORD"}
          />
        </div>
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;

  .control {
    margin: 22px 0;
  }

  h1 {
    font-weight: bold;
    margin-bottom: 30px;
    font-size: 38px;
    line-height: 60px;
  }
`;

export default ChangeProfile;
