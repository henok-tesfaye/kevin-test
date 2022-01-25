/**
 *  1. What is your favourite new javascript feature and why?
 *   
 * 
 *   Rest and spread operators
 *   
 *   It allows me to easily get out some/remaining fields fron an object.
 *   And it allows me to easily merge different objects.
 * 
 * 
 *  2. Explain an interesting way in which you have used this javascript feature.
 * 
 *  To add a member to an object conditionally,
 * 
 *   const obj = {...(isQuiz ? { quizTitle, isQuiz } : {})}
 *
 * 
 *  3. Is there any difference between regular function syntax and the shorter arrow function syntax? (Write the answer in your own words)
 * 
 *   Yes, we don't have to specify function keyword for arrow function.
 * 
 *   function foo () {}
 * 
 *   const foo = () => {}
 * 
 * 4. What is the difference between ‘myFunctionCall(++foo)’   and  ‘myFunctionCall(foo++)’
 * 
 *   In the first call myFunctionCall will be called with the current value of foo + 1
 *   In the second call myFunctionCall will be called with the current value of foo
 * 
 * 
 * 5. In your own words, explain what a javascript ‘class’ is and how it differs from a function.
 * 
 *  A javascript class is a function used as a template used to create objects.
 * 
 *  It differs from normal function in that it implements the prototype chain under the hood,
 *  and allows us to extend other classes easily. While in function to achive the same thing,
 *  we should add methods to the prototype chaing by themselves and that's also the way we 
 *  achieve inheritance.
 * 
 * 
 * 6. In your own words, explain css specificity.
 * 
 *  It's the way in which the browser decides which css should apply for elements.
 *  The specific it's, the more likely to be applied to the element.
 * 
 * 
 * 7. In your own words, explain, what is ‘!important’ in css.  Also how does it work?  Are there any special circumstances when using it, where it’s behaviour might not be what you expect?
 * 
 *  '!important' is a way we tell a browser to favor the style we add for the element.
 *  And it's primarily used to override third party css styles.
 *  If the style we want to override has !important, it won't behave the way we want.
 * 
 * 8. What is your prefered layout system: inline-block, floating + clearing, flex, grid, other?  And why?
 * 
 *  I like flex and grid.
 *  With flex we can align elements horizontally or vertically and also we can apply justify-content and
 *  align-items to control their position. And it allows me to make my page responsive.
 * 
 *  And also grid to show table like data with some gap between the elements.
 * 
 * 9. Are negative margins legal and what do they do (margin: -20px)?
 * 
 *  Yes, it's legal. They move the element outside of the box modal.
 *  If we give an element margin-top: -5px, it'll up below the top box modal 5px.
 * 
 * 
 * 10. If a <div/> has no margin or other styling and a <p/> tag inside of it has a margin top of some kind, the margin from the <p/> tag will show up on the div instead (the margin will show above the div not inside of it), why is this?  What are the different things that can be done to prevent it?
 * 
 * Looks like it's because of collapsing margins. (I've found the why from internet)
 * But I know some ways to prevent it, like making the div display: flex or inline-block.
 * 
 * 
 * 11. What technologies do you use to unit test your react components?
 * 
 *  I use Jest + Enzyme + react-testing-library
 * 
 *  And I mock third party components(like react-router-dom, axios and also local utilities)
 * 
 * 12. Are there any pitfalls associated with this technology that have caused you difficulty in the past?
 * 
 *  There're some utilities in react-testing-library which minimizes the time takes to test components
 *  Like getByText, queryByText, waitFor and others which they're missed from Enzyme and make
 *  the test time easier.
 * 
 * 13. How do you test in your unit tests to see if the correct properties are being passed to child components.
 * 
 * I create a mock props and mount the component with the specified props, and use 
 * 
 *  .props() method from the mounted component and assert if it's equal with the mock props
 *  passed to the component.
 * 
 *  But in react-testing-library, I don't think there's .props() so we should see the code where the props is used(finally rendered)
 *  and see if it's displaying somewhere in the DOM.
 * 
 * 14. React test step1:Create a react component that has a <div/> with a border.Inside this <div/> should be a <span/> that displays the ‘live’ width of the browser window at all times.  Keep in mind that the size of the window could easily be changed by the user and you should reflect this.
 * 

import { useState, useEffect } from "react";

export default function App() {
  const getWindowWidth = () => window.innerWidth

  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, []);


  return (
    <div style={{ border: "3px solid red" }}>
      <span>{windowWidth}</span>
    </div>
  );
}
 * 
 * 15. Step 2
 * 
 * import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const getWindowWidth = () => window.innerWidth;

  const [windowWidth, setWindowWidth] = useState(getWindowWidth());
  const [divHeight, setDivHeight] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleKeyPress = (event) => {
    const MIN_HEIGHT = 25;
    const { value } = event.target;

    const parsedValue = parseInt(value, 10);
    const shouldNotUpdateHeight = !parsedValue && parsedValue !== 0
    if (shouldNotUpdateHeight) return;

    setDivHeight(parsedValue <= MIN_HEIGHT ? MIN_HEIGHT : value);
  };

  return (
    <div
      style={{
        border: "3px solid red",
        padding: "10px",
        height: divHeight + "px",
        boxSizing: "border-box"
      }}
    >
      <span>Width: {windowWidth}</span>
      <input
        style={{ marginLeft: "50px" }}
        // Since the keypress event is fired when a key that produces a character value is pressed down.
        // that means it won't be triggered on back space, so I've added onKeyUp as well
        onKeyPress={handleKeyPress}
        onKeyUp={handleKeyPress}
      />
    </div>
  );
}


16. Step 3

import { useState, useEffect, useRef } from "react";
import "./styles.css";

const MIN_HEIGHT = 47;

let divHeight;
window.setDivHeight = (height) => (divHeight = height);

const Div = (props) => {
  const { height = MIN_HEIGHT, setDivHeight } = props;
  const getWindowWidth = () => window.innerWidth;

  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleKeyPressUp = (event) => {
    const value = event.target.value;

    const parsedValue = parseInt(value, 10);
    const shouldNotUpdateHeight = !parsedValue && parsedValue !== 0;
    if (shouldNotUpdateHeight) return;

    setDivHeight(parsedValue <= MIN_HEIGHT ? MIN_HEIGHT : parsedValue);
  };

  return (
    <div
      style={{
        border: "3px solid red",
        padding: "10px",
        height: height + "px",
        boxSizing: "border-box"
      }}
    >
      <span>Width: {windowWidth}, </span>
      <span>Div height: {height}</span>
      <input
        style={{ marginLeft: "50px" }}
        type="text"
        // I couldn't figure out why I can't change the input field value when value object is set(Looks like onChange should be implemented instead of onKeyPress)
        // value={height}

        // Since the keypress event is fired when a key that produces a character value is pressed down.
        // that means it won't be triggered on back space, so I've added onKeyUp as well
        onKeyPress={handleKeyPressUp}
        onKeyUp={handleKeyPressUp}
      />
    </div>
  );
};

const withHeight = (WrappedComponent) => {
  const WithHeight = (props) => {
    const [height, setDivHeight] = useState();
    const timeoutRef = useRef(null);

    useEffect(() => {
      listenGlobalDivHeight();
    }, []);

    const updateHeight = (height) => {
      window.setDivHeight(height);
      setDivHeight(height);
    };

    // I couldn't find other way to listen the global variable
    // from the component. Looks like polling is the solution.
    const listenGlobalDivHeight = () => {
      timeoutRef.current = setTimeout(() => {
        if (height !== divHeight) updateHeight(divHeight);

        clearTimeout(timeoutRef.current);
        listenGlobalDivHeight();
      }, 500);
    };

    return (
      <WrappedComponent
        {...props}
        height={height}
        setDivHeight={updateHeight}
      />
    );
  };

  return WithHeight;
};

export default withHeight(Div);

 * 
 * */




