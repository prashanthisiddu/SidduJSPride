<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>International Telephone Input</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js"></script>
</head>
<body>
  <h2>International Telephone Input</h2>
  <form id="phoneForm">
    <input id="phone" type="tel" placeholder="Enter your phone number">
    <button type="submit">Submit</button>
  </form>

  <script>
    const phoneInputField = document.querySelector("#phone");
    const phoneInput = window.intlTelInput(phoneInputField, {
      initialCountry: "us",
      preferredCountries: ["us", "gb", "in"],
      separateDialCode: true,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });

    document.querySelector("#phoneForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const phoneNumber = phoneInput.getNumber();
      alert("Phone number: " + phoneNumber);
    });
  </script>
</body>
</html>
