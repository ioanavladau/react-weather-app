import React from 'react';
function Motivation() {
    const motivations = ["Ready to rock the world?", 
        "One more coffee and you'll move mountains!", 
        "Smile while you still have teeth!", 
        "Money cannot make you happy, but it can buy ice-cream, which is basically the same thing.", 
        "If you think you are too small to make a difference, try sleeping with a mosquito.",
        "Even if you are on the right track, you'll get run over if you just sit there. What are you waiting for?"
    ];
    const motivation = motivations[Math.floor(Math.random()*motivations.length)];
    return <p>{motivation}</p>;
}
export default Motivation;