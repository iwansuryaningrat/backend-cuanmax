import db from "../../models/index.js";
const Videos = db.videos;

// Update Video URL
const updateVideoUrl = async (videoId, url1080, url720, url480, url360) => {
  return await Videos.findByIdAndUpdate(videoId, {
    url: [
      {
        quality: "1080p",
        url: url1080,
      },
      {
        quality: "720p",
        url: url720,
      },
      {
        quality: "480p",
        url: url480,
      },
      {
        quality: "360p",
        url: url360,
      },
    ],
  })
    .then((result) => {
      return true;
    })
    .catch((err) => {
      return err.message;
    });
};

// Update Video Views
const updateVideoViews = async (videoId) => {
  const video = await Videos.findById(videoId);
  if (video) {
    const views = video.views;
    return await Videos.findByIdAndUpdate(videoId, {
      views: views + 1,
    })
      .then((result) => {
        return true;
      })
      .catch((err) => {
        return err.message;
      });
  } else {
    return false;
  }
};

// Update Video Likes
const updateVideoLikes = async (videoId) => {
  const video = await Videos.findById(videoId);
  if (video) {
    const likes = video.likes;
    return await Videos.findByIdAndUpdate(videoId, {
      likes: likes + 1,
    })
      .then((result) => {
        return true;
      })
      .catch((err) => {
        return err.message;
      });
  } else {
    return false;
  }
};

// Update Video Dislikes
const updateVideoDislikes = async (videoId) => {
  const video = await Videos.findById(videoId);
  if (video) {
    const dislikes = video.dislikes;
    return await Videos.findByIdAndUpdate(videoId, {
      dislikes: dislikes + 1,
    })
      .then((result) => {
        return true;
      })
      .catch((err) => {
        return err.message;
      });
  } else {
    return false;
  }
};

const updatePlaylistVideo = async (videoId, playlistId) => {
  return await Videos.findByIdAndUpdate(videoId, {
    playlist: playlistId,
  })
    .then((result) => {
      return true;
    })
    .catch((err) => {
      return err.message;
    });
};

export {
  updateVideoUrl,
  updateVideoViews,
  updateVideoLikes,
  updateVideoDislikes,
  updatePlaylistVideo,
};
