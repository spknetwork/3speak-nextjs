import React from 'react'
 interface ActiveUser {
    username: string;
    // data: Account;
    // points: UserPoints;
}
interface Props {
    activeUser: ActiveUser
    global: Global
    // communities: Community[]
  }
  
  interface AccountInfo {
    username: string;
    referral: string;
    email: string;
    keys: {
      postingPubKey: string;
      ownerPubKey: string;
      activePubKey: string;
      memoPubKey: string;
    }
  }
function AccountRegisterForFriend() {
  return (
    <div>AccountRegisterForFriend</div>
  )
}

export default AccountRegisterForFriend