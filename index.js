const userkeys = document.getElementById('keys');
const userInput = document.getElementById('input');
const resultOutput = document.getElementById('output');
const toggleButton = document.getElementById('toggle-theme'); // For theme toggling

let currentResult = '';
let calculationDone = true;

userkeys.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        const buttonText = event.target.textContent.trim();

        if (buttonText === 'AC') {
            userInput.value = '';
            resultOutput.value = '';
            currentResult = ''; // Reset current result
            calculationDone = false; // Reset the calculation flag
        } else if (buttonText === '=') {
            try {
                let expression = userInput.value;

                // Convert percentage operations to decimal
                expression = expression.replace(/(\d+(\.\d+)?)%/g, function(match, p1) {
                    return `(${p1} / 100)`;
                });

                // Evaluate the expression
                currentResult = eval(expression);
                resultOutput.value = Number.isInteger(currentResult) ? currentResult : currentResult.toFixed(2); // Display result conditionally
                calculationDone = true; // Mark calculation as done
            } catch (error) {
                resultOutput.value = 'Error';
            }
        } else if (buttonText === 'DEL') {
            if (!calculationDone) {
                userInput.value = userInput.value.slice(0, -1);
            }
        } else if (buttonText === '%') {
            // Internally handle percentage conversion without adding % to userInput
            let expression = userInput.value;
            

            // Remove any existing '%' symbols from the input value
            expression = expression.replace(/%$/, '');

            // Convert percentage to decimal if there is an existing number to apply it to
            if (expression) {
                expression = expression.replace(/(\d+(\.\d+)?)$/, function(match, p1) {
                    return `(${p1} / 100)`;
                });
                userInput.value = expression; // Update input value without showing %
            }
        } else {
            if (calculationDone) {
                userInput.value = currentResult.toString(); // Start with the current result
                calculationDone = false; // Reset the calculation flag
            }
            userInput.value += buttonText; // Append the button text
        }
    }
});

// Ensure toggleButton logic is implemented if needed
if (toggleButton) {
    toggleButton.addEventListener('click', function() {
        // Example logic for toggling themes
        document.body.classList.toggle('dark-theme');
    });
}




