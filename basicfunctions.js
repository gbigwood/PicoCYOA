const initialScore = 0;
let currentScore = 0;

// Basic functions
const scoreAdder = (x) => { 
    currentScore += x;
    console.log("currentScore is now:", currentScore);
    const theStory = document.querySelector('story-container');
    theStory.dispatchEvent(
        new CustomEvent('transitioned', { bubbles:true, detail: { source: "scoreAdder", target: "currentScore" } } )
    );
    return currentScore;
};

const scoreWriter = () => {
    document.write(currentScore);
};

