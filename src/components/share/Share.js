import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@material-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";

const Share = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = file.name;
      data.append("file", file);
      data.append("name", fileName);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post(
          "https://frozen-bastion-16792.herokuapp.com/api/upload",
          data
        );
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.post(
        "https://frozen-bastion-16792.herokuapp.com/api/posts",
        newPost
      );
      window.location.reload();
    } catch (error) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <Link to={`/profile/${user.username}`} className="shareProfileLink">
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "defaultProfile.jpg"
              }
              alt=""
              className="shareProfileImg"
            />
            <small>Click to View</small>
          </Link>

          <input
            ref={desc}
            placeholder={"Share your thoughts " + user.username + "!"}
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel
              style={{ color: "white" }}
              className="shareCancelImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo Or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
