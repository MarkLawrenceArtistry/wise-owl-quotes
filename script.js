// This ensures our script runs only after the entire HTML document has been loaded and parsed.
// This is a best practice you already know!
document.addEventListener('DOMContentLoaded', function () {

    // --- 1. Data Store ---
    // In a real app, this might come from a server. For now, it's just an array.
    const quotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
        { text: "The mind is everything. What you think you become.", author: "Buddha" },
        { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
    ];

    // --- 2. Element Selectors ---
    // Using what you learned about `querySelector` to grab the elements we need to interact with.
    const quoteTextElement = document.querySelector('.quote-text');
    const quoteAuthorElement = document.querySelector('.quote-author');
    const newQuoteButton = document.querySelector('#new-quote-btn');


    // --- 3. The Promise-based Function ---
    // This is the core of our async logic. It doesn't use fetch.
    // It returns a Promise that will resolve with a new quote after a delay.
    function getFakeQuote() {
        // We return a new Promise. The function inside the Promise is called the "executor".
        return new Promise((resolve, reject) => {
            console.log('Promise started... The owl is thinking...');

            // `setTimeout` simulates a network delay (e.g., 1500ms = 1.5 seconds).
            setTimeout(() => {
                // Pick a random quote from our array
                const randomIndex = Math.floor(Math.random() * quotes.length);
                const randomQuote = quotes[randomIndex];

                if (randomQuote) {
                    // If we successfully got a quote, we 'resolve' the promise,
                    // sending the quote data to the `.then()` block.
                    resolve(randomQuote);
                } else {
                    // If something went wrong (e.g., our array was empty),
                    // we 'reject' the promise, sending an error to the `.catch()` block.
                    reject("The owl couldn't think of any more wisdom.");
                }
            }, 1500); 
        });
    }


    // --- 4. Event Listener ---
    // Using `addEventListener` to run code when the button is clicked.
    newQuoteButton.addEventListener('click', () => {
        // --- A. Update UI to show loading state ---
        
        // 20, 26. Using .classList and .textContent to provide user feedback.
        quoteTextElement.textContent = 'The wise owl is thinking...';
        quoteAuthorElement.textContent = ''; // Clear the author while loading
        newQuoteButton.textContent = 'Thinking...';
        newQuoteButton.classList.add('loading'); // 26. .add() to add a class
        newQuoteButton.disabled = true; // Disable the button to prevent multiple clicks

        // --- B. Call our Promise function and handle the result ---
        getFakeQuote()
            .then(quoteData => {
                // This code runs ONLY if the Promise was resolved successfully.
                // The 'quoteData' is whatever we passed into the 'resolve()' function.
                console.log('Promise resolved successfully!');
                
                // 13. Update the DOM with the new quote using .textContent
                quoteTextElement.textContent = quoteData.text;
                quoteAuthorElement.textContent = `- ${quoteData.author}`;
            })
            .catch(error => {
                // This code runs ONLY if the Promise was rejected.
                // The 'error' is whatever we passed into the 'reject()' function.
                console.error('Promise was rejected:', error);
                quoteTextElement.textContent = error; // Show the error on screen
            })
            .finally(() => {
                // This code runs regardless of success or failure.
                // It's perfect for cleanup, like removing the loading state.
                console.log('Promise finished.');
                newQuoteButton.textContent = 'Get New Wisdom';
                newQuoteButton.classList.remove('loading'); // Remove the loading class
                newQuoteButton.disabled = false; // Re-enable the button
            });
    });

});