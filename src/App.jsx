import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import Logo from "../src/assets/MOE_Logoo.png";
import Avatar from "../src/assets/student.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { ZegoSuperBoardManager } from "zego-superboard-web";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
  // const roomID = getUrlParams().get("roomID") || randomID(5);
  const roomID = getUrlParams().get("roomID") || "XYZ123";
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 367909475;
    const serverSecret = "5c2f228eee7d52423ec3881c26205a98";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.addPlugins({ ZegoSuperBoardManager });
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
      preJoinViewConfig: {
        title: "Catch", // The title of the prejoin view. Uses "enter Room" by default.
      },
      whiteboardConfig: {
        showCreateAndCloseButton: true, // Whether to display the button that is used to create/turn off the whiteboard. Displayed by default.
        showAddImageButton: true,
      },
      branding: {
        logoURL: `${Logo}`, // The branding LOGO URL.
      },
      onUserAvatarSetter: (userList) => {
        userList.forEach((user) => {
          user.setUserAvatar(`${Avatar}`);
        });
      },
      showTurnOffRemoteCameraButton: true, // Whether to display the button for turning off the remote camera. Not displayed by default.
      showTurnOffRemoteMicrophoneButton: true,
      showRemoveUserButton: true,
      showPreJoinView: false,
      showRoomTimer: true, // Whether to display the timer. Not displayed by default.
      showRoomDetailsButton: true, // Whether to display the button that is used to check the room details. Displayed by default.
      showInviteToCohostButton: true, // Whether to show the button that is used to invite the audience to co-host on the host end.
      showRemoveCohostButton: true, // Whether to show the button that is used to remove the audience on the host end.
      showRequestToCohostButton: true, // Whether to show the button that is used to request to co-host on the audience end.
      autoHideFooter: false, // Whether to automatically hide the footer (bottom toolbar), auto-hide by default. This only applies to mobile browsers.
      enableUserSearch: true,
    });
  };

  return (
    <div
      ref={myMeeting}
      style={{
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    ></div>
  );
}
