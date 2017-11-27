/*
 * Create a list that holds all of your cards
 */
var cards = $("#deck li.card");
// Display the cards on the page
setTimeout(function() {
    $(".card").toggleClass("show open");
}, 1500);
$(".card").toggleClass("show open");
//   - shuffle the list of cards using the provided "shuffle" method below
shuffle(cards);
//loop through each card and create its HTML
//add each card's HTML to the page
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let moves = 0,
    open = [],
    correct = [],
    wrong = 0,
    sec = 0,
    min = 0,
    stars = 3;

function child_value(element) {
    return $(element).children().attr('class').split(' ')[1];
}

function restart() {
    sec = 0;
    min = 0;
    wrong = 0;
    moves = 0;
    open = [];
    correct = [];
    stars = 3;
    $('.moves').text(moves);
    $('.card').removeClass(" open show match");
    reset_star = $('ul.stars > li');
    $(reset_star).each(function() {
        reset_star_child = $(this).children();
        if ($(reset_star_child).hasClass('fa fa-star-o')) {
            $(reset_star_child).toggleClass('fa-star fa-star-o');
        }
    });
    return;
}

function stars_counter() {
    if (moves === 10) {
        stars === 2;
        $("#1st").remove();
    } else if (moves === 15) {
        stars === 1;
        $('#2nd').remove();
    } else if (moves === 20) {
        stars === 0;
        $("#3rd").remove();
        final_result('lose');
    }
}

function final_result(result) {
    if (result === 'win') {
        alert("congratulations you have won the game by" + stars + "stars and" + moves + "moves in" + min + "minutes and" + sec + "seconds.");
    } else if (result === 'lose') {
        alert('you have lost all your stars try again');
    }
}

function open_card(card) {
    $(open_element).toggleClass("match");
    $(card).toggleClass("match");
    correct.push(card);
    correct.push(open_element);
    moves += 1;
    return;
}

function close_card(card) {
    $(open_element).toggleClass("unmatch");
    $(card).toggleClass("unmatch");
    moves += 1;
    wrong += 1;
    obj = $(card);
    setTimeout($.proxy(function() {
        $(open_element).toggleClass("open show unmatch");
        $(obj).toggleClass("open show unmatch");
    }), 1000);
    stars_counter();
    return;
}
$('.restart').on('click', function() {
    restart();
});

function timer() {
    sec = 0;
    min = 0;
    setInterval(function() {
        ++sec;
        if (sec > 60) {
            sec = 0;
            ++min;
        }
        time = min + ':' + sec;
        $('.time').text(time);
    }, 1000);
    return;
}

$('.begin').on('click', function() {
    $('.begin').hide();
    timer();
});

$('.card').on('click', function() {
    if (!correct.includes(this)) {
        $(this).toggleClass("open show");
        value = child_value(this);
        if (open.length === 0) {
            open.push(this);
        } else {
            open_element = open.pop();
            current_card = $(this);
            ((child_value(open_element) === value) ? (open_card(current_card)) : (close_card(current_card)));
            $('.moves').text(moves);
            if (correct.length === 16) {
                final_result('win');
            }
        }
    }
});