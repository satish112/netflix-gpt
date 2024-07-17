export const checkvalidatedata = (email, password, fullname, issigninform) =>{

    const isEmailvalid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordvalid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const isFullnamevalid = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/.test(fullname)

    if(!issigninform && !isFullnamevalid) return "Your Full Name is not valid ";
    if(!isEmailvalid) return "Email is not valid";
    if(!isPasswordvalid) return "Password is not valid";


    return null;
};