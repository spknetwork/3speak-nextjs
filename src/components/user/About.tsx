import React from "react";
import { UserInterface } from "types";
const About: React.FC<UserInterface> = ({ profile }) => {
  return <div>
      <h3>About</h3>
      <div>
        {profile?.about && (
          <p>{profile.about}</p>
        )}
      </div>
    </div>
};

export default About;
