// Error Showing 
// Errors in React can be caught in the catch block
// *** make function async await ***

// there is two way Showing Error
// 1. Direct Show at Catch Block but it used as normal condition
const LoginUser1 = async () => {                                                     // step 2 important
    try {
        const loginuser = await signInWithEmailAndPassword(auth, email, password);
        alert("User logged in successfully");
        console.log("User Login :: ", loginuser);
        setErrorMessage(""); // Clear any previous error messages                              //step-3
    } catch (error) {
        console.error("Error explain ::" error.message);
        toast(error.message)
    }
}

    // 2. Use State Show Error :
    // ( A.) create state
    const [error, setError] = useState("");  // step-1
    // ( B.) Make Async Await that function Important point
    // ( c.) setState at try and catch block   
    const LoginUser = async () => {                                                     // step 2 important
        try {
            const loginuser = await signInWithEmailAndPassword(auth, email, password);
            alert("User logged in successfully");
            console.log("User Login :: ", loginuser);
            setErrorMessage(""); // Clear any previous error messages                              //step-3
        } catch (error) {
            console.log("User login or password wrong error:", error.message);
            setErrorMessage(error.message); // Set the error message from Firebase                // step-3 important
            toast(error.message)
        }
    }
    // ( C.) show error where you want show as alert as toast 
    {
        errorShow && (
            <Alert variant="danger" dismissible>
                <p>{errorShow}</p>
            </Alert>)
    }
