# React calculator

![Image](https://i.imgur.com/gfHk2nZ.png)

[![Netlify Status](https://api.netlify.com/api/v1/badges/c5bf18ce-9536-44c7-973f-914d5e974031/deploy-status)](https://app.netlify.com/sites/vite-ts-react-calculator/deploys)

[Click here to see in live](https://vite-ts-react-calculator.netlify.app/)

## Todo
- Create Enums for operators and special keys
- Better visualization when an operation is pending
- Implement float point calc
- Separate logic for left and right operands
- Memorize values and functions to prevent re-renders



## Known Bugs
- The operation "number times", eg. 9x = 81 is returning 0
- When selecting the right operator, if you type a number of two digits, the highlight operation will be deselected (but clicking on equal button will trigger the operation correctly)
