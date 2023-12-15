import { tweetsData } from './data.js';

const tweetInput = document.getElementById('tweet-input');
const tweetBtn = document.getElementById('tweet-btn');

tweetBtn.addEventListener('click', function () {
  console.log(tweetInput.value);
  tweetInput.value = '';
});

document.addEventListener('click', function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  }
});

const handleLikeClick = (tweetId) => {
  const targetTweetObj = tweetsData.find((t) => t.uuid === tweetId);
  if (targetTweetObj.isLiked) {
    targetTweetObj.likes -= 1;
  } else {
    targetTweetObj.likes += 1;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;
  render();
};

const handleRetweetClick = (tweetId) => {
  const targetTweetObj = tweetsData.find((t) => t.uuid === tweetId);
  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets -= 1;
  } else {
    targetTweetObj.retweets += 1;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
  render();
};

const getFeedHtml = () => {
  let feedHtml = '';

  tweetsData.forEach(function (tweet) {
    let likeIconClass = tweet.isLiked ? 'liked' : '';
    let retweetIconClass = tweet.isRetweeted ? 'retweeted' : '';

    feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i 
                            class="fa-regular fa-comment-dots" 
                            data-reply="${tweet.uuid}"
                            ></i> 
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i 
                            class="fa-solid fa-heart ${likeIconClass}" 
                            data-like="${tweet.uuid}"
                            ></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i 
                            class="fa-solid fa-retweet ${retweetIconClass}" 
                            data-retweet="${tweet.uuid}"
                            ></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
        </div>
    `;
  });

  return feedHtml;
};

const render = () => {
  document.getElementById('feed').innerHTML = getFeedHtml();
};

render();
