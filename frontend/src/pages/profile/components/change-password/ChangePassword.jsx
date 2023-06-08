import { HttpsOutlined } from "@mui/icons-material";
import Button from "../../../../common/Button";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../../../common/SectionHeader";

const ChangeProfile = () => {
  const navigate = useNavigate();
  return (
    <>
      <SectionHeader
        title="Change Password"
        text="The information on this page will be displayed on your
        public profile, which is visible to other users."
        span="Your password will always remain private."
        icon={<HttpsOutlined />}
      />
      <Button
        onClick={() => navigate("/account/forgot-password-reset")}
        style={{ padding: "1.4rem 1.8rem" }}
        value={"RESET PASSWORD"}
      />
    </>
  );
};

export default ChangeProfile;
