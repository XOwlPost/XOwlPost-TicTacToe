
# XOwlPost-TicTacToe Coding Style Guide

Welcome to the XOwlPost-TicTacToe coding style guide. Following this guide will ensure consistent code style across the project, making it easier for everyone to contribute.

## General Guidelines

- **Indentation:** Use 4 spaces for indentation rather than tabs.
- **Naming:** Use `camelCase` for variables and functions, `PascalCase` for classes.
- **Comments:** Write comments for complex pieces of code and keep them concise.

## JavaScript

- Use `const` for declaring constants.
- Avoid using `var`.
- Use arrow functions where possible.

```javascript
// Good
const processData = (data) => {
    // ...code...
}

// Bad
function processData(data) {
    // ...code...
}
```

## Solidity (For Smart Contracts)

- Use the latest version of Solidity.
- Always define the visibility of state variables and functions.
- Use `emit` keyword when calling events.

```solidity
// Good
event NewData(address indexed user, uint amount);
function addData(uint _amount) public {
    emit NewData(msg.sender, _amount);
}

// Bad
event NewData(address user, uint amount);
function addData(uint _amount) {
    NewData(msg.sender, _amount);
}
```

## HTML/CSS

- Use semantic HTML elements.
- Avoid using `!important` in CSS unless absolutely necessary.

```css
/* Good */
.button {
    background-color: blue;
}

/* Bad */
.button {
    background-color: blue !important;
}
```

## Commit Messages

- Begin the commit message with a single short (less than 50 characters) line summarizing the changes, followed by a blank line and then a more thorough description. 
- Use the imperative mood ("Add feature" not "Added feature" or "Adds feature").

