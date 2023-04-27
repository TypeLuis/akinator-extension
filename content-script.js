// Removes mouse from display
document.documentElement.style.cursor = 'none';

// removes unwanted elements
document.getElementById('adblockDetected').remove()
document.getElementsByTagName('header')[0].remove()
document.getElementsByTagName('footer')[0].remove()
document.getElementById('parallax-overlay').remove()


// centers game
document.body.style.display = "flex";
document.body.style.alignItems = "center";
document.body.style.justifyContent = "center";
//document.body.style.marginTop = "15vh";
document.body.style.height = 'max-content'

// promise function that waits for element to appear
const waitForElm = (selector) => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

// removes ad element
waitForElm('.ezoic-ad').then((ad) => ad.remove())


const selections = document.getElementsByTagName('li')
let index = 0

setInterval(() => {
    if (index === 0) {
        selections[index].style.transform = "scale(1.5)";
    }
}, 1000)

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    // simulates unselecting
    const unselect = index => {
        const elm = selections[index]

        elm.style.transform = "scale(1)"
    }

    // function that simulates a selection
    const select = index => {
        const elm = selections[index]

        elm.style.transform = "scale(1.5)"
    }

    // function that simulates mouse click
    const clickElement = (element) => {
        index = 0

        element.children[0].click()
    }


    const currentElement = selections[index];


    switch (event.key) {
        case "ArrowDown":

            if (selections) {
                unselect(index)

                if (index === selections.length - 1) index = 0
                else index += 1

                select(index)

            }
            // code for "down arrow" key press.
            break;
        case "ArrowUp":

            if (selections) {

                unselect(index)

                if (index === 0) index = selections.length - 1
                else index -= 1

                select(index)
            }
            // code for "up arrow" key press.
            break;
        case "ArrowLeft":
            const back = document.getElementById('a_cancel_answer')
            if (back) {
                index = 0
                document.getElementById('a_cancel_answer').click()
            }
            // code for "left arrow" key press.
            break;
        case "ArrowRight":

            // code for "right arrow" key press.
            break;
        case "Enter":
            clickElement(currentElement)
            // code for "Enter" key press.
            break;
        case " ":
            const replay = document.getElementById('a_replay')
            if (replay) {
                index = 0
                replay.click()
            }
            // code for "Space" key press.
            break;

        case "PageDown":
            const wrong = document.getElementById('a_propose_no')
            const continueNo = document.getElementById('a_continue_no')

            if (wrong) wrong.click()
            else if (continueNo) continueNo.click()
            // code for "PageDown" key press.
            break;
        case "PageUp":
            const correct = document.getElementById('a_propose_yes')
            const vote = document.getElementById('vote_champion')
            const continueYes = document.getElementById('a_continue_yes')
            const continueVote = document.getElementById('a_continue_to_choice')

            if (correct) correct.click()
            else if (vote) vote.click()
            else if (continueYes) continueYes.click()
            else if (continueVote) continueVote.click()
            else return

            // code for "Pageup" key press.
            break;
        case "Home":
            window.location = "https://en.akinator.com/theme-selection"

            // code for "Home" key press.
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);