  
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    console.log("Hello");
    console.log(email, username, password);
  
    if (email && username && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          email,
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/login");
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);