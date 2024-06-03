import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        {/* <p>Have you ever been at the library and studied an extra 5 minutes because the environment encouraged you?
           Or at the gym, walking a few extra minutes on the treadmill because you felt encouraged by your environment? 
           Well, this app will give you the virtual social environment to hold you accountable to your goals. Use this app to be goal-oriented and socially connected.</p>
        <p> */}

<p>
Thank you all for your support, and a special thank you to my teachers. I also want to express my gratitude to all my friends, family, and mentors for their unwavering support!
</p>
        <p>
          Tech: Node
Express
React w/ Hooks, Redux, Sagas
Postgresql
Heroku
Passport w/ Local Authentication
</p>
      </div>
    </div>
  );
}

export default AboutPage;
